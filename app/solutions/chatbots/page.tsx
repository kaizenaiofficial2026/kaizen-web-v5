import type { Metadata } from "next";
import { ProductDetailPage } from "@/components/sections/products/ProductDetailPage";
import { chatbotProduct } from "@/lib/content/product-pages";

export const metadata: Metadata = {
  title: "AI Chatbots",
  description:
    "AI chatbots for website, WhatsApp, and social DMs that answer enquiries, qualify leads, and book appointments.",
};

export default function ChatbotsPage() {
  return <ProductDetailPage product={chatbotProduct} />;
}
