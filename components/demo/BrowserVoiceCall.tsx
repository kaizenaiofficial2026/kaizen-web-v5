'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Mic, Phone, PhoneOff } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const BACKEND_WS = (process.env.NEXT_PUBLIC_BACKEND_URL ?? 'https://api.kaizenai.dev')
  .replace(/^http/, 'ws') + '/api/browser/stream';

const SAMPLE_RATE = 24000;
const WORKLET_PATH = '/pcm-processor.js';

type CallState = 'idle' | 'connecting' | 'active' | 'ended' | 'error';

export function BrowserVoiceCall() {
  const [state, setState] = useState<CallState>('idle');
  const [error, setError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<{ role: string; text: string }[]>([]);

  const wsRef            = useRef<WebSocket | null>(null);
  const audioCtxRef      = useRef<AudioContext | null>(null);
  const nextPlayRef      = useRef(0);
  const streamRef        = useRef<MediaStream | null>(null);
  const workletNodeRef   = useRef<AudioWorkletNode | null>(null);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);

  const cleanup = useCallback(() => {
    workletNodeRef.current?.disconnect();
    workletNodeRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    activeSourcesRef.current.forEach((s) => { try { s.stop(); } catch { /* ended */ } });
    activeSourcesRef.current = [];
    nextPlayRef.current = 0;
    audioCtxRef.current?.close();
    audioCtxRef.current = null;
  }, []);

  const stopAudioPlayback = useCallback(() => {
    activeSourcesRef.current.forEach((s) => { try { s.stop(); } catch { /* ended */ } });
    activeSourcesRef.current = [];
    nextPlayRef.current = 0;
  }, []);

  const stop = useCallback(() => {
    const ws = wsRef.current;
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'end' }));
      ws.close();
    }
    wsRef.current = null;
    cleanup();
    setIsSpeaking(false);
    setIsUserSpeaking(false);
    setState('ended');
  }, [cleanup]);

  const playPCM16 = useCallback((base64: string) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const binary = atob(base64);
    const bytes  = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const int16   = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 32768;
    const buffer = ctx.createBuffer(1, float32.length, SAMPLE_RATE);
    buffer.copyToChannel(float32, 0);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    activeSourcesRef.current.push(source);
    source.onended = () => {
      activeSourcesRef.current = activeSourcesRef.current.filter((s) => s !== source);
    };
    const startAt = Math.max(ctx.currentTime + 0.05, nextPlayRef.current);
    source.start(startAt);
    nextPlayRef.current = startAt + buffer.duration;
  }, []);

  const start = useCallback(async () => {
    setError('');
    setTranscript([]);
    setIsSpeaking(false);
    setIsUserSpeaking(false);
    setState('connecting');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;

      const ctx = new AudioContext({ sampleRate: SAMPLE_RATE });
      audioCtxRef.current = ctx;
      nextPlayRef.current = 0;

      await ctx.audioWorklet.addModule(WORKLET_PATH);

      const source    = ctx.createMediaStreamSource(stream);
      const processor = new AudioWorkletNode(ctx, 'pcm-processor');
      workletNodeRef.current = processor;

      processor.port.onmessage = (e: MessageEvent<ArrayBuffer>) => {
        if (wsRef.current?.readyState !== WebSocket.OPEN) return;
        const b64 = btoa(String.fromCharCode(...new Uint8Array(e.data)));
        wsRef.current.send(JSON.stringify({ type: 'audio', audio: b64 }));
      };

      source.connect(processor);
      processor.connect(ctx.destination);

      const ws = new WebSocket(BACKEND_WS);
      wsRef.current = ws;

      ws.onopen = () => setState('active');

      ws.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          switch (msg.type) {
            case 'response.output_audio.delta':
              if (msg.delta) { setIsSpeaking(true); setIsUserSpeaking(false); playPCM16(msg.delta); }
              break;
            case 'response.output_audio.done':
              setIsSpeaking(false);
              break;
            case 'input_audio_buffer.speech_started':
              setIsSpeaking(false); setIsUserSpeaking(true); stopAudioPlayback();
              break;
            case 'response.created':
              setIsUserSpeaking(false);
              break;
            case 'response.audio_transcript.delta':
              setTranscript((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === 'assistant') {
                  return [...prev.slice(0, -1), { role: 'assistant', text: last.text + (msg.delta ?? '') }];
                }
                return [...prev, { role: 'assistant', text: msg.delta ?? '' }];
              });
              break;
            case 'conversation.item.input_audio_transcription.completed':
              if (msg.transcript) setTranscript((prev) => [...prev, { role: 'user', text: msg.transcript }]);
              break;
            case 'session.ended':
              stop();
              break;
            case 'error':
              setError(msg.error?.message ?? 'Unknown error');
              stop();
              break;
          }
        } catch { /* ignore parse errors */ }
      };

      ws.onerror = () => { setError('Connection failed — is the backend running?'); setState('error'); };
      ws.onclose = () => {
        if (wsRef.current) {
          wsRef.current = null;
          cleanup();
          setIsSpeaking(false);
          setIsUserSpeaking(false);
          setState((s) => (s === 'active' || s === 'connecting' ? 'ended' : s));
        }
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start call');
      setState('error');
      streamRef.current?.getTracks().forEach((t) => t.stop());
    }
  }, [cleanup, playPCM16, stop, stopAudioPlayback]);

  useEffect(() => () => { stop(); }, [stop]);

  const barActive = isSpeaking || isUserSpeaking;

  const statusLabel = () => {
    if (state === 'connecting') return 'Connecting…';
    if (isUserSpeaking) return "You're speaking…";
    if (isSpeaking) return 'AI is speaking…';
    if (state === 'active') return 'Listening…';
    return null;
  };

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <div className="grid h-9 w-9 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
          <Phone className="h-4 w-4" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">Browser Call</p>
          <p className="text-xs text-muted-foreground">Talk directly from your browser — no phone needed</p>
        </div>
        {state === 'active' && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live
          </span>
        )}
      </div>

      <div className="space-y-4 p-5">
        {/* Controls */}
        {state === 'idle' || state === 'ended' || state === 'error' ? (
          <button
            onClick={start}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 active:scale-[0.99]"
          >
            <Mic className="h-4 w-4" aria-hidden />
            {state === 'ended' ? 'Call Again' : 'Start Browser Call'}
          </button>
        ) : state === 'connecting' ? (
          <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card/50 py-3 text-sm text-muted-foreground">
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Connecting…
          </div>
        ) : (
          <div className="space-y-3">
            {/* Activity bar */}
            <div className={cn(
              'flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors',
              isUserSpeaking ? 'border-blue-500/20 bg-blue-500/10' : barActive ? 'border-primary/25 bg-primary/10' : 'border-border bg-card/50'
            )}>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={cn('w-1 rounded-full transition-all duration-150', isUserSpeaking ? 'bg-blue-400' : barActive ? 'bg-primary' : 'bg-muted-foreground/40')}
                    style={{ height: barActive ? `${12 + Math.sin(i * 1.2) * 8}px` : '4px' }}
                  />
                ))}
              </div>
              <span className={cn('text-sm', isUserSpeaking ? 'text-blue-300' : 'text-muted-foreground')}>
                {statusLabel()}
              </span>
            </div>

            <button
              onClick={stop}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 py-3 text-sm font-medium text-destructive transition hover:bg-destructive/20"
            >
              <PhoneOff className="h-4 w-4" aria-hidden />
              End Call
            </button>
          </div>
        )}

        {error && <p className="px-1 text-xs text-destructive">{error}</p>}

        {/* Live transcript */}
        {transcript.length > 0 && (
          <div className="max-h-48 space-y-2 overflow-y-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">Transcript</p>
            {transcript.map((t, i) => (
              <div key={i} className={cn('rounded-lg px-3 py-2 text-xs', t.role === 'user' ? 'bg-card/60 text-foreground/70' : 'border border-primary/20 bg-primary/10 text-foreground/85')}>
                <span className="font-semibold opacity-60">{t.role === 'user' ? 'You' : 'AI'}: </span>
                {t.text}
              </div>
            ))}
          </div>
        )}

        {(state === 'idle' || state === 'ended') && (
          <p className="text-center text-xs text-muted-foreground/60">
            Requires microphone access · powered by OpenAI Realtime
          </p>
        )}
      </div>
    </Card>
  );
}
