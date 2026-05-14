"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { HeroBackgroundFallback } from "@/components/backgrounds/HeroBackgroundFallback";

type ShaderScene = {
  camera: THREE.Camera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  uniforms: {
    time: { value: number };
    extraWaveOpacity: { value: number };
    resolution: { value: THREE.Vector2 };
  };
  animationId: number;
};

export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<ShaderScene | null>(null);
  const [renderFallback, setRenderFallback] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || renderFallback) return;

    const vertexShader = /* glsl */ `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = /* glsl */ `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float extraWaveOpacity;

      vec3 waveContribution(vec2 uv, float phase, float lineWidth, float weight) {
        vec3 color = vec3(0.0);

        for (int i = 0; i < 5; i++) {
          float fi = float(i);
          float diagonalGrid = mod(uv.x + uv.y, 0.2);
          color.r += weight * lineWidth * fi * fi / abs(fract(phase + fi * 0.01) * 5.0 - length(uv) + diagonalGrid);
          color.g += weight * lineWidth * fi * fi / abs(fract(phase - 0.01 + fi * 0.01) * 5.0 - length(uv) + diagonalGrid);
          color.b += weight * lineWidth * fi * fi / abs(fract(phase - 0.02 + fi * 0.01) * 5.0 - length(uv) + diagonalGrid);
        }

        return color;
      }

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.05;
        float lineWidth = 0.0026;
        vec3 color = waveContribution(uv, t, lineWidth, 1.0);
        color += waveContribution(uv, t + 0.45, lineWidth, 0.5 * extraWaveOpacity);

        vec3 brandTint = vec3(
          color.r * 1.05 + color.g * 0.42,
          color.r * 0.74 + color.g * 0.58 + color.b * 0.16,
          color.b * 0.95 + color.g * 0.22
        );
        brandTint = 1.0 - exp(-brandTint * 0.52);

        vec3 base = vec3(0.039, 0.035, 0.027);
        gl_FragColor = vec4(base + brandTint * 0.82, 1.0);
      }
    `;

    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      time: { value: 1 },
      extraWaveOpacity: { value: 0 },
      resolution: { value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    scene.add(new THREE.Mesh(geometry, material));

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      });
    } catch (error) {
      console.warn("Falling back to the CSS hero background.", error);
      queueMicrotask(() => setRenderFallback(true));
      return;
    }
    renderer.setClearColor("#0a0907");
    const desktopMotionQuery = window.matchMedia("(min-width: 1024px)");
    const getPixelRatioCap = () => (desktopMotionQuery.matches ? 1.5 : 2);

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, getPixelRatioCap()),
    );
    renderer.domElement.style.display = "block";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.width = "100%";
    container.appendChild(renderer.domElement);

    const onContextLost = (event: Event) => {
      event.preventDefault();
      setRenderFallback(true);
    };

    uniforms.extraWaveOpacity.value = desktopMotionQuery.matches ? 1 : 0;

    const onMotionQueryChange = (event: MediaQueryListEvent) => {
      uniforms.extraWaveOpacity.value = event.matches ? 1 : 0;
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, getPixelRatioCap()),
      );
      onWindowResize();
    };

    const onWindowResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height, false);
      uniforms.resolution.value.set(
        renderer.domElement.width,
        renderer.domElement.height,
      );
    };

    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      uniforms.time.value += 0.038;
      renderer.render(scene, camera);

      if (sceneRef.current) {
        sceneRef.current.animationId = animationId;
      }
    };

    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    };

    onWindowResize();
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    window.addEventListener("resize", onWindowResize);
    desktopMotionQuery.addEventListener("change", onMotionQueryChange);
    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      desktopMotionQuery.removeEventListener("change", onMotionQueryChange);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      cancelAnimationFrame(sceneRef.current?.animationId ?? 0);

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      geometry.dispose();
      material.dispose();
      sceneRef.current = null;
    };
  }, [renderFallback]);

  if (renderFallback) {
    return <HeroBackgroundFallback />;
  }

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-background"
    />
  );
}
