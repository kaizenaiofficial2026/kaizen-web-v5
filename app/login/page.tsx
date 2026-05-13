import type { Metadata } from "next";
import Link from "next/link";
import { LockKeyhole, Mail } from "lucide-react";
import { MarketingHero, MarketingSection } from "@/components/primitives/MarketingPage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Client Portal",
  description: "Client portal login placeholder for active Kaizen AI clients.",
};

export default function LoginPage() {
  return (
    <main id="main" className="relative">
      <MarketingHero
        eyebrow="Client portal"
        title={
          <>
            Access your Kaizen{" "}
            <span className="text-primary">client workspace</span>
          </>
        }
        subtitle="Portal access is reserved for active clients. This login screen is a visual placeholder until authentication is connected."
      />

      <MarketingSection>
        <Card className="mx-auto max-w-md p-6 sm:p-8">
          <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <LockKeyhole className="h-6 w-6" aria-hidden />
          </div>
          <form className="space-y-4">
            <label className="grid gap-2 text-sm font-semibold text-foreground">
              Email
              <input
                type="email"
                className="h-11 rounded-xl border border-border bg-background/75 px-4 text-sm font-normal text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
                placeholder="you@company.com"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-foreground">
              Password
              <input
                type="password"
                className="h-11 rounded-xl border border-border bg-background/75 px-4 text-sm font-normal text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
              />
            </label>
            <Button type="button" size="lg" className="w-full">
              Sign in
            </Button>
          </form>
          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            Need access? Ask your Kaizen project lead or{" "}
            <Link href="/book-demo" className="text-primary hover:underline">
              contact the team
            </Link>
            .
          </p>
          <div className="mt-5 flex items-center gap-2 rounded-xl border border-border bg-card/55 px-4 py-3 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 text-primary" aria-hidden />
            Active-client login will be connected later.
          </div>
        </Card>
      </MarketingSection>
    </main>
  );
}
