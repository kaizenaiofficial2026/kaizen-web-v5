"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/content/site";

type LoginModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const fieldClass =
  "h-12 rounded-lg border border-primary/20 bg-[rgba(5,4,2,0.74)] px-4 text-sm font-normal text-foreground shadow-[inset_0_1px_0_rgba(240,234,216,0.05)] outline-none transition placeholder:text-muted-foreground/58 focus:border-primary/70 focus:ring-2 focus:ring-primary/25";

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-[27rem] overflow-y-auto rounded-xl border-primary/30 bg-[linear-gradient(145deg,rgba(36,29,13,0.94),rgba(12,10,6,0.97)_46%,rgba(0,0,0,0.98))] p-0 shadow-[0_34px_110px_-58px_rgba(201,160,61,0.96),inset_0_1px_0_rgba(240,234,216,0.09),inset_0_0_64px_rgba(196,154,48,0.055)] sm:rounded-[1.1rem] [&>button.absolute]:right-4 [&>button.absolute]:top-4 [&>button.absolute]:grid [&>button.absolute]:h-10 [&>button.absolute]:w-10 [&>button.absolute]:place-items-center [&>button.absolute]:rounded-lg [&>button.absolute]:border [&>button.absolute]:border-primary/24 [&>button.absolute]:bg-black/45 [&>button.absolute]:text-foreground/80 [&>button.absolute]:backdrop-blur-md [&>button.absolute]:hover:text-primary">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-80"
          style={{
            backgroundImage:
              "radial-gradient(80% 58% at 85% 0%, rgba(212,168,83,0.24) 0%, rgba(196,154,48,0.08) 42%, rgba(201,160,61,0) 72%), radial-gradient(75% 55% at 10% 100%, rgba(240,234,216,0.08) 0%, rgba(201,160,61,0) 62%)",
          }}
        />

        <div className="relative p-6 sm:p-7">
          <div className="mb-7 flex justify-center px-12 pt-2 sm:px-14">
            <Image
              src="/logo.png"
              alt="KaizenAI"
              width={248}
              height={60}
              priority
              className="h-auto w-[218px] object-contain sm:w-[248px]"
            />
          </div>

          <DialogTitle className="sr-only">
            Client portal login
          </DialogTitle>

          <form
            className="grid gap-4"
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

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-primary/14 pt-5 text-sm">
            <span className="text-muted-foreground">Need access?</span>
            <Link
              href={`mailto:${siteConfig.salesEmail}?subject=Kaizen%20AI%20client%20portal%20access`}
              className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Contact Kaizen AI
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
