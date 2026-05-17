"use client";

import Link from "next/link";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/content/site";
import { cn } from "@/lib/utils";

type LoginModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const fieldClass =
  "h-12 rounded-xl border border-primary/18 bg-black/35 px-4 text-sm font-normal text-foreground shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] outline-none transition placeholder:text-muted-foreground/65 focus:border-primary/60 focus:ring-2 focus:ring-primary/25";

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-[30rem] overflow-y-auto rounded-[1.5rem] border-primary/28 bg-[linear-gradient(145deg,rgba(26,22,12,0.98),rgba(8,7,5,0.98))] p-0 shadow-[0_44px_150px_-68px_rgba(201,160,61,0.95)] sm:rounded-[1.75rem] [&>button.absolute]:right-4 [&>button.absolute]:top-4 [&>button.absolute]:grid [&>button.absolute]:h-10 [&>button.absolute]:w-10 [&>button.absolute]:place-items-center [&>button.absolute]:rounded-full [&>button.absolute]:border [&>button.absolute]:border-primary/24 [&>button.absolute]:bg-black/45 [&>button.absolute]:text-foreground/80 [&>button.absolute]:backdrop-blur-md [&>button.absolute]:hover:text-primary">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-80"
          style={{
            backgroundImage:
              "radial-gradient(75% 55% at 85% 0%, rgba(201,160,61,0.2) 0%, rgba(201,160,61,0) 70%)",
          }}
        />

        <div className="relative p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/28 bg-primary/15 text-primary shadow-[0_20px_55px_-28px_rgba(201,160,61,0.9)]">
              <LockKeyhole className="h-5 w-5" aria-hidden />
            </span>
            <span className="rounded-full border border-primary/24 bg-primary/10 px-3 py-1 text-xs font-bold tracking-[0.08em] text-primary">
              Client Portal
            </span>
          </div>

          <DialogTitle className="max-w-sm text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
            Sign in to your Kaizen AI workspace.
          </DialogTitle>
          <DialogDescription className="mt-4 text-sm leading-6 text-foreground/68 sm:text-base sm:leading-7">
            Access your conversations, leads, bookings, and AI agent performance.
          </DialogDescription>

          <form
            className="mt-7 grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <label className="grid gap-2 text-sm font-semibold text-foreground">
              Work Email / Username
              <input
                type="text"
                autoComplete="username"
                className={fieldClass}
                placeholder="you@company.com"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-foreground">
              Password
              <input
                type="password"
                autoComplete="current-password"
                className={fieldClass}
                placeholder="Password"
              />
            </label>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="inline-flex items-center gap-2 text-foreground/74">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-primary/35 bg-black/40 accent-primary focus-visible:ring-2 focus-visible:ring-ring"
                />
                Remember me
              </label>
              <Link
                href={`mailto:${siteConfig.salesEmail}?subject=Kaizen%20AI%20portal%20password%20reset`}
                className="font-semibold text-primary transition-colors hover:text-accent"
              >
                Forgot password
              </Link>
            </div>

            <Button type="submit" size="xl" className="mt-1 w-full rounded-xl">
              Sign In
            </Button>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-5 text-sm">
            <span className="text-muted-foreground">Need access?</span>
            <Link
              href={`mailto:${siteConfig.salesEmail}?subject=Kaizen%20AI%20client%20portal%20access`}
              className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Contact Kaizen AI
            </Link>
          </div>

          <div
            className={cn(
              "mt-5 flex items-start gap-3 rounded-2xl border border-primary/18 bg-primary/[0.07] px-4 py-3 text-sm leading-6 text-foreground/70",
            )}
          >
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            Secure client access for approved Kaizen AI customers.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
