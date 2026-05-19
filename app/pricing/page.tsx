import type { Metadata } from "next";
import { Pricing, type PricingType } from "@/components/sections/Pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Kaizen AI pricing for chatbot, voice agent, and custom automation rollouts.",
};

function normalizePricingType(value: string | string[] | undefined): PricingType {
  const selectedValue = Array.isArray(value) ? value[0] : value;
  return selectedValue === "voice" ? "voice" : "chat";
}

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string | string[] }>;
}) {
  const initialType = normalizePricingType((await searchParams).type);

  return (
    <main id="main" className="relative">
      <Pricing key={initialType} initialType={initialType} />
    </main>
  );
}
