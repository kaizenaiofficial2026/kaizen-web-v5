import type { Metadata } from "next";
import { ContactDemoHub } from "@/components/contact/ContactDemoHub";

export const metadata: Metadata = {
  title: "Contact — KaizenAI",
  description:
    "Talk to KaizenAI, try our live AI representative, or book a free consultation to discover where AI automation can create the most impact.",
};

export default function ContactPage() {
  return <ContactDemoHub />;
}
