import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Globe2, Mail, MapPin } from "lucide-react";
import { BookDemoForm } from "@/components/forms/BookDemoForm";
import { Grain } from "@/components/primitives/Grain";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/content/site";

const contactItems = [
  {
    icon: MapPin,
    label: "Based in",
    text: "Wyoming, USA",
  },
  {
    icon: Mail,
    label: "Email",
    text: siteConfig.salesEmail,
  },
  {
    icon: Globe2,
    label: "Working globally",
    text: "Serving clients worldwide",
  },
];

export const metadata: Metadata = {
  title: "Book a Strategy Call",
  description:
    "Request a focused Kaizen AI strategy call for chat agents, voice agents, missed-call recovery, and booking automation.",
};

export default function BookDemoPage() {
  return (
    <main id="main" className="relative min-h-dvh overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(75% 60% at 18% 8%, rgba(201,160,61,0.18) 0%, rgba(201,160,61,0.05) 38%, rgba(10,9,7,0) 72%), radial-gradient(65% 52% at 92% 16%, rgba(236,212,121,0.13) 0%, rgba(10,9,7,0) 72%)",
        }}
      />
      <Grain />

      <section className="mx-auto grid min-h-dvh w-full max-w-7xl items-start gap-12 px-6 py-10 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-14">
        <div className="relative z-10">
          <h1 className="max-w-3xl text-h1 font-medium text-foreground">
            Ready to build your{" "}
            <span className="text-primary">AI sales team?</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-foreground/72">
            Tell us a few details about your business and we&apos;ll show you how
            Kaizen AI can help you answer calls, reply to messages, follow up
            with leads, and book more appointments.
          </p>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="mt-9 rounded-xl border-primary/35 bg-black/20"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to Home
            </Link>
          </Button>

          <div className="mt-8 grid max-w-xl gap-3">
            {contactItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-2xl border border-primary/16 bg-card/45 px-4 py-4 backdrop-blur-md"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-primary/24 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-foreground">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">
                      {item.text}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 w-full">
          <BookDemoForm />
        </div>
      </section>
    </main>
  );
}
