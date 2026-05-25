import type { Metadata } from "next";
import { InteractiveDemoPage } from "@/components/demo/InteractiveDemoPage";

export const metadata: Metadata = {
  title: "Try KaizenAI Live",
  description:
    "Try the KaizenAI voice agent live, then test the website chat agent or WhatsApp chat experience from the demo page.",
};

export default function DemoPage() {
  return <InteractiveDemoPage />;
}
