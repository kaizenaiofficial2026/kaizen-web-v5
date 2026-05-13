import type { Metadata } from "next";
import { MarketingHero, MarketingSection } from "@/components/primitives/MarketingPage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { BookDemoForm } from "@/components/forms/BookDemoForm";

export const metadata: Metadata = {
  title: "Book Demo",
  description:
    "Request a Kaizen AI strategy call for chatbot, voice agent, and missed-lead recovery workflows.",
};

export default function BookDemoPage() {
  return (
    <main id="main" className="relative">
      <MarketingHero
        eyebrow="Book a strategy call"
        title={
          <>
            Tell us where leads are{" "}
            <span className="text-primary">slipping away</span>
          </>
        }
        subtitle="Share a few details about your business, channels, and timeline. We will use it to shape a focused first conversation."
      />

      <MarketingSection>
        <SectionHeader
          eyebrow="Lead form"
          title={
            <>
              Plan your first{" "}
              <span className="text-primary">Kaizen AI agent</span>
            </>
          }
          subtitle="This is a frontend-only form for now. It validates the request and shows the success state without sending data."
        />
        <div className="mx-auto mt-12 max-w-4xl">
          <BookDemoForm />
        </div>
      </MarketingSection>
    </main>
  );
}
