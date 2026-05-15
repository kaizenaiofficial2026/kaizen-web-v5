import type { Metadata } from "next";
import { ChatbotSolutionPage } from "@/components/sections/products/ChatbotSolutionPage";

export const metadata: Metadata = {
  title: "AI Chatbots",
  description:
    "AI chatbots for website, WhatsApp, and social DMs that answer enquiries, qualify leads, and book appointments.",
};

export default function ChatbotsPage() {
  return <ChatbotSolutionPage />;
}
