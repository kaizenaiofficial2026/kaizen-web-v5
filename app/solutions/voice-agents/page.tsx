import type { Metadata } from "next";
import { ProductDetailPage } from "@/components/sections/products/ProductDetailPage";
import { voiceAgentProduct } from "@/lib/content/product-pages";

export const metadata: Metadata = {
  title: "AI Voice Agents",
  description:
    "AI voice agents that answer calls, handle enquiries, recover missed calls, and book appointments around the clock.",
};

export default function VoiceAgentsPage() {
  return <ProductDetailPage product={voiceAgentProduct} />;
}
