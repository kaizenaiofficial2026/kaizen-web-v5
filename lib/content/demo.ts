import {
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type DemoAgendaItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const demoAgenda: DemoAgendaItem[] = [
  {
    icon: Calendar,
    title: "Map your current workflow",
    description:
      "We identify the repetitive handoffs, approvals, and reporting loops that slow your team today.",
  },
  {
    icon: PlayCircle,
    title: "Walk through a live Kaizen flow",
    description:
      "You will see how context enters Kaizen, how work is routed, and where humans stay in control.",
  },
  {
    icon: FileText,
    title: "Leave with a rollout plan",
    description:
      "We outline the first workflow to launch, the systems to connect, and the success metrics to track.",
  },
];

export const demoProofPoints = [
  {
    icon: Clock,
    title: "30 minute session",
    description: "Focused on the workflows and systems your team already uses.",
  },
  {
    icon: ShieldCheck,
    title: "Security-ready",
    description: "Bring access, audit, and data boundary questions into the first conversation.",
  },
  {
    icon: CheckCircle2,
    title: "No prep burden",
    description: "A short workflow example is enough for us to tailor the walkthrough.",
  },
];

export const demoOutcomes = [
  "Priority workflow candidates",
  "Integration and security fit",
  "Recommended launch path",
  "Success metrics for month one",
];

export const demoVisualSteps = [
  { icon: Sparkles, label: "Discover" },
  { icon: PlayCircle, label: "Preview" },
  { icon: CheckCircle2, label: "Plan" },
];
