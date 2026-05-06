"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
// Low-octave fbm for big, smooth blobs
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.55;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  // Aspect-correct, low frequency so blobs span the screen
  vec2 p = vec2(uv.x * (u_resolution.x / u_resolution.y), uv.y) * 0.85;
  float t = u_time * 0.05;

  // Domain warping for sweeping organic curves
  vec2 q = vec2(fbm(p + vec2(t, 0.0)),
                fbm(p + vec2(0.0, t * 0.8) + 5.2));
  vec2 r = vec2(fbm(p + 1.5 * q + vec2(1.7 - t * 0.3, 9.2)),
                fbm(p + 1.5 * q + vec2(8.3, 2.8 + t * 0.4)));
  float n = fbm(p + 1.8 * r);

  // Secondary field for highlights
  float h = fbm(p * 1.4 + r * 1.2 + vec2(-t * 0.5, t * 0.4));

  // Brand palette
  vec3 cBlack    = vec3(0.024, 0.020, 0.016); // primary black
  vec3 cDark     = vec3(0.102, 0.078, 0.031); // dark surface
  vec3 cGoldDeep = vec3(0.604, 0.475, 0.149); // gold-deep
  vec3 cGoldMain = vec3(0.780, 0.604, 0.235); // gold-main
  vec3 cGoldLite = vec3(0.910, 0.824, 0.541); // gold-light
  vec3 cMuted    = vec3(0.592, 0.537, 0.416); // muted-gold

  // Build color from broad smoothstep ranges so most pixels carry color
  vec3 col = cBlack;
  col = mix(col, cDark,     smoothstep(0.10, 0.55, n));
  col = mix(col, cMuted,    smoothstep(0.30, 0.65, n) * 0.55);
  col = mix(col, cGoldDeep, smoothstep(0.40, 0.75, n) * 0.95);
  col = mix(col, cGoldMain, smoothstep(0.55, 0.85, n));
  col = mix(col, cGoldLite, smoothstep(0.70, 0.95, h * (0.5 + n)));

  // Subtle directional warmth bias (top-left lighter)
  float bias = smoothstep(1.2, 0.0, distance(uv, vec2(0.25, 0.35)));
  col += cGoldDeep * bias * 0.15;

  // Soft vignette toward edges (gentle)
  float d = distance(uv, vec2(0.5, 0.5));
  col *= mix(1.0, 0.55, smoothstep(0.4, 1.1, d));

  // Filmic grain
  float g = (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.04;
  col += g;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error(`Shader compile error: ${log}`);
  }
  return sh;
}

export function AuroraBackground({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const start = performance.now();
    let raf = 0;
    const loop = () => {
      resize();
      const t = (performance.now() - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
