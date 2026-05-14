import type { Metadata } from "next";
import { ProductDetailPage } from "@/components/sections/products/ProductDetailPage";
import { customAutomationProduct } from "@/lib/content/product-pages";

export const metadata: Metadata = {
  title: "Custom AI Automations",
  description:
    "Custom AI automations for lead routing, follow-ups, CRM updates, alerts, and repeatable operational workflows.",
};

export default function CustomAIAutomationsPage() {
  return <ProductDetailPage product={customAutomationProduct} />;
}
