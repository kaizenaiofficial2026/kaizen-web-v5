import type { Metadata } from "next";
import { LegalContentPage } from "@/components/legal/LegalContentPage";
import { termsOfService } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Terms of Service | KaizenAI",
  description:
    "Read the terms that govern use of KaizenAI's website, consultations, AI automation projects, agentic AI systems, dashboards, integrations, and related services.",
};

export default function TermsOfServicePage() {
  return <LegalContentPage page={termsOfService} />;
}
