import {
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  PhoneCall,
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
    title: "Find where leads slip",
    description:
      "We review your calls, chats, DMs, booking flow, and the moments customers usually wait too long.",
  },
  {
    icon: PlayCircle,
    title: "Walk through chatbot and voice flows",
    description:
      "You see how Kaizen answers, qualifies, books, alerts your team, and escalates when a human should step in.",
  },
  {
    icon: FileText,
    title: "Scope your first launch",
    description:
      "We define the first channel, knowledge base, integrations, timeline, and success metrics before you commit.",
  },
];

export const demoProofPoints = [
  {
    icon: Clock,
    title: "20 minute strategy call",
    description: "Short, practical, and focused on the revenue leaks in your current customer flow.",
  },
  {
    icon: ShieldCheck,
    title: "Done-for-you setup",
    description: "Kaizen handles design, training, integrations, testing, launch, and optimisation.",
  },
  {
    icon: CheckCircle2,
    title: "No technical team needed",
    description: "Your team approves the flow; we handle the build details and launch readiness.",
  },
];

export const demoOutcomes = [
  "Best first agent to launch",
  "Channels and integrations to connect",
  "Setup timeline and fixed scope",
  "How to measure calls, bookings, and ROI",
];

export const demoVisualSteps = [
  { icon: Sparkles, label: "Discover" },
  { icon: PhoneCall, label: "Hear it live" },
  { icon: CheckCircle2, label: "Plan launch" },
];
