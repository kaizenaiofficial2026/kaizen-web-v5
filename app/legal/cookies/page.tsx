import type { Metadata } from "next";
import { LegalContentPage } from "@/components/legal/LegalContentPage";
import { cookiePolicy } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: "Cookie Policy | KaizenAI",
  description:
    "Learn how KaizenAI uses cookies, analytics, preference tools, marketing pixels, and similar technologies on kaizenai.dev.",
};

export default function CookiePolicyPage() {
  return <LegalContentPage page={cookiePolicy} />;
}
