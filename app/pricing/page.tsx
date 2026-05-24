import type { Metadata } from "next";
import { Pricing, type PricingType } from "@/components/sections/Pricing";

function normalizePricingType(value: string | string[] | undefined): PricingType {
  const selectedValue = Array.isArray(value) ? value[0] : value;
  return selectedValue === "voice" ? "voice" : "chat";
}

type PricingPageProps = {
  searchParams: Promise<{ type?: string | string[] }>;
};

export async function generateMetadata({
  searchParams,
}: PricingPageProps): Promise<Metadata> {
  const initialType = normalizePricingType((await searchParams).type);

  if (initialType === "voice") {
    return {
      title: "Voice Agent Pricing | Kaizen AI",
      description:
        "Kaizen AI voice agent packages for inbound calls, appointment booking, WhatsApp follow-up, Google Calendar integration, and CRM logging.",
    };
  }

  return {
    title: "Chat Agent Pricing | Kaizen AI",
    description:
      "Kaizen AI chat agent packages for Instagram, Facebook Messenger, WhatsApp Business, and website enquiries.",
  };
}

export default async function PricingPage({ searchParams }: PricingPageProps) {
  const initialType = normalizePricingType((await searchParams).type);

  return (
    <main id="main" className="relative">
      <Pricing key={initialType} initialType={initialType} />
    </main>
  );
}
