import type { Metadata } from "next";
import { CustomAIAutomationsPage as CustomAIAutomationsIndustryPage } from "@/components/sections/industries/CustomAIAutomationsPage";

export const metadata: Metadata = {
  title: "Custom AI Automations",
  description:
    "Custom AI systems that connect your tools, reduce manual work, support reporting, handle workflow updates, and give your team a custom operations dashboard.",
};

export default function CustomAIAutomationsPage() {
  return <CustomAIAutomationsIndustryPage />;
}
