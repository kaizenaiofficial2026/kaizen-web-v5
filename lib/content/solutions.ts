import {
  Database,
  LineChart,
  Lock,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type SolutionPillar = {
  icon: LucideIcon;
  title: string;
  description: string;
  highlights: string[];
};

export type WorkflowUseCase = {
  icon: LucideIcon;
  title: string;
  team: string;
  description: string;
};

export const solutionPillars: SolutionPillar[] = [
  {
    icon: Workflow,
    title: "Adaptive workflow orchestration",
    description:
      "Map the work your team already does, then let Kaizen route, enrich, and complete the repetitive steps.",
    highlights: ["Cross-tool handoffs", "Automated follow-ups", "Human approval gates"],
  },
  {
    icon: Sparkles,
    title: "Self-improving AI execution",
    description:
      "Every accepted outcome becomes feedback, so prompts and playbooks get sharper without weekly rewrites.",
    highlights: ["Outcome memory", "Prompt experiments", "Quality scoring"],
  },
  {
    icon: ShieldCheck,
    title: "Secure operating layer",
    description:
      "Bring AI into high-trust workflows with audit trails, SSO-ready controls, and clear workspace boundaries.",
    highlights: ["Audit history", "Role controls", "Private context"],
  },
];

export const workflowUseCases: WorkflowUseCase[] = [
  {
    icon: MessageSquare,
    title: "Customer response loops",
    team: "Support and success",
    description:
      "Summarize requests, draft replies, flag risk, and keep every customer handoff visible.",
  },
  {
    icon: Database,
    title: "Revenue operations cleanup",
    team: "Sales and RevOps",
    description:
      "Enrich accounts, catch missing CRM data, and trigger follow-ups from live pipeline changes.",
  },
  {
    icon: LineChart,
    title: "Executive operating rhythm",
    team: "Leadership",
    description:
      "Turn scattered project signals into weekly briefs, blockers, and outcome trends.",
  },
  {
    icon: Users,
    title: "Product delivery coordination",
    team: "Product and engineering",
    description:
      "Connect specs, issues, releases, and customer feedback into one reliable delivery trail.",
  },
];

export const solutionProof = [
  { value: "60+", label: "tool integrations" },
  { value: "9 days", label: "average first workflow launch" },
  { value: "SOC 2", label: "enterprise-ready controls" },
];

export const solutionVisualSteps = [
  { icon: Database, label: "Connect context" },
  { icon: Workflow, label: "Route the work" },
  { icon: Zap, label: "Execute safely" },
  { icon: Lock, label: "Track outcomes" },
];
