import type { Metadata } from "next";
import { VoiceAgentSolutionPage } from "@/components/sections/products/VoiceAgentSolutionPage";

export const metadata: Metadata = {
  title: "AI Voice Agents",
  description:
    "AI voice agents that answer calls, handle enquiries, recover missed calls, and book appointments around the clock.",
};

export default function VoiceAgentsPage() {
  return <VoiceAgentSolutionPage />;
}
