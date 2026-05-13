import type { Metadata } from "next";
import { Pricing } from "@/components/sections/Pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Kaizen AI pricing for chatbot, voice agent, and custom automation rollouts.",
};

export default function PricingPage() {
  return (
    <main id="main" className="relative">
      <h1 className="sr-only">Pricing</h1>
      <Pricing />
    </main>
  );
}
