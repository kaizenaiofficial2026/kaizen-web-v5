import type { Metadata } from "next";
import { LegalContentPage } from "@/components/legal/LegalContentPage";
import { privacyPolicy } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | KaizenAI",
  description:
    "Learn how KaizenAI collects, uses, protects, and manages personal, business, operational, website, and AI automation service data.",
};

export default function PrivacyPolicyPage() {
  return <LegalContentPage page={privacyPolicy} />;
}
