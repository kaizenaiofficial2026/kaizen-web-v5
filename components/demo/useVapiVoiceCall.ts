"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

export type VapiCallState =
  | "idle"
  | "connecting"
  | "active"
  | "ended"
  | "error";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
const ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

/**
 * Browser voice call powered by the Vapi Web SDK.
 *
 * The SDK owns the WebRTC connection, mic capture, and audio playback, so this
 * hook only mirrors call lifecycle into React state. `volume` is the assistant's
 * live output level (0–1) from the `volume-level` event — feed it to the sphere
 * to make it react to the voice in real time.
 */
export function useVapiVoiceCall() {
  const [state, setState] = useState<VapiCallState>("idle");
  const [error, setError] = useState(() =>
    PUBLIC_KEY ? "" : "Voice service is not configured.",
  );
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0);

  const vapiRef = useRef<Vapi | null>(null);

  useEffect(() => {
    if (!PUBLIC_KEY) return;

    const vapi = new Vapi(PUBLIC_KEY);
    vapiRef.current = vapi;

    vapi.on("call-start", () => setState("active"));
    vapi.on("call-end", () => {
      setIsSpeaking(false);
      setVolume(0);
      setState((s) => (s === "active" || s === "connecting" ? "ended" : s));
    });
    vapi.on("speech-start", () => setIsSpeaking(true));
    vapi.on("speech-end", () => setIsSpeaking(false));
    vapi.on("volume-level", (v) => setVolume(v));
    vapi.on("error", (e) => {
      const message =
        e?.error?.message ?? e?.errorMsg ?? e?.message ?? "The call ran into a problem.";
      setError(message);
      setIsSpeaking(false);
      setVolume(0);
      setState("error");
    });

    return () => {
      vapi.stop();
      vapi.removeAllListeners();
      vapiRef.current = null;
    };
  }, []);

  const start = useCallback(async () => {
    if (!vapiRef.current || !ASSISTANT_ID) {
      setError("Voice service is not configured.");
      setState("error");
      return;
    }
    setError("");
    setState("connecting");
    try {
      await vapiRef.current.start(ASSISTANT_ID);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start the call.");
      setState("error");
    }
  }, []);

  const stop = useCallback(() => {
    vapiRef.current?.stop();
    setIsSpeaking(false);
    setVolume(0);
    setState("ended");
  }, []);

  const statusLabel = (() => {
    if (state === "connecting") return "Connecting…";
    if (isSpeaking) return "AI is speaking…";
    if (state === "active") return "Listening…";
    return null;
  })();

  return { state, error, isSpeaking, volume, start, stop, statusLabel };
}
