import { Sparkles, Workflow, ShieldCheck, Zap, Users, LineChart } from "lucide-react";
import type { FeatureCard } from "@/lib/types";

export const features: FeatureCard[] = [
  {
    icon: Workflow,
    title: "Adaptive workflows",
    description:
      "Agents that learn how your team operates and quietly optimize the steps that slow you down — no rule-writing required.",
    span: "wide",
  },
  {
    icon: Sparkles,
    title: "Self-improving prompts",
    description: "Outcomes feed back into the system, so quality compounds every week.",
  },
  {
    icon: Zap,
    title: "Instant integrations",
    description: "Connect Slack, GitHub, Linear, Notion, and 60+ tools in seconds.",
  },
  {
    icon: Users,
    title: "Realtime collaboration",
    description: "Multiple agents and humans can work on the same task without stepping on each other.",
  },
  {
    icon: LineChart,
    title: "Outcome insights",
    description: "Dashboards that show what shipped, what stalled, and where to invest next.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-grade security",
    description: "SOC 2, GDPR, SSO, SCIM, audit logs, and dedicated infra on Enterprise.",
  },
];
