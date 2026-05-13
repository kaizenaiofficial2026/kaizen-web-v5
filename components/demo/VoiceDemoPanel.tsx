"use client";

import { useEffect, useState } from "react";
import { Phone, Radio, Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const transcript = [
  {
    role: "Caller",
    text: "Hi, do you have appointments this week?",
  },
  {
    role: "Kaizen",
    text: "I do. Thursday at 10am or Friday at 2pm are available. Which suits you?",
  },
  {
    role: "Caller",
    text: "Thursday. Can I book under Maya Fernando?",
  },
  {
    role: "Kaizen",
    text: "Booked. You will get a confirmation on WhatsApp in a moment.",
  },
];

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function VoiceDemoPanel() {
  const [seconds, setSeconds] = useState(42);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSeconds((current) => (current >= 95 ? 42 : current + 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <Card className="relative overflow-hidden p-6 shadow-card">
      <div
        aria-hidden
        className="absolute inset-x-8 top-8 h-24 rounded-full bg-primary/15 blur-3xl"
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <Badge variant="popular">AI Voice Agent · Live Demo</Badge>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-background/50 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Incoming call
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                Maya · new caller
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                +94 · English to Sinhala support
              </p>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <Phone className="h-6 w-6" aria-hidden />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
              <Radio className="h-4 w-4 text-primary" aria-hidden />
              CH 04
            </div>
            <div className="font-mono text-sm text-primary">
              {formatTime(seconds)}
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {transcript.map((line) => (
            <div
              key={`${line.role}-${line.text}`}
              className="rounded-xl border border-border bg-card/60 p-4"
            >
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {line.role}
              </div>
              <p className="text-sm leading-6 text-foreground/82">
                {line.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { value: "< 5s", label: "pickup" },
            { value: "30+", label: "languages" },
            { value: "24/7", label: "on duty" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border bg-background/45 p-4 text-center"
            >
              <div className="text-lg font-semibold text-primary">
                {item.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {["Chat", "Voice", "Book"].map((label) => (
            <div
              key={label}
              className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-2"
            >
              {label}
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
          <Volume2 className="h-4 w-4 text-primary" aria-hidden />
          Simulated transcript based on a real appointment-booking flow.
        </div>
      </div>
    </Card>
  );
}
