import {
  Bot,
  CalendarCheck,
  Headphones,
  Languages,
  LayoutDashboard,
  MessageCircle,
  PhoneCall,
  PhoneIncoming,
  RotateCcw,
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
    icon: Bot,
    title: "AI Chatbots",
    description:
      "A trained agent for your website and messaging channels that answers enquiries, qualifies leads, and books appointments.",
    highlights: ["Website chat", "WhatsApp and social DMs", "FAQ and pricing knowledge"],
  },
  {
    icon: PhoneCall,
    title: "AI Voice Agents",
    description:
      "A human-sounding phone agent that picks up quickly, speaks naturally, and routes callers to the right next step.",
    highlights: ["Inbound calls", "Outbound follow-up", "Transfer to human"],
  },
  {
    icon: LayoutDashboard,
    title: "Command centre",
    description:
      "A live view of every call, chat, lead, and booking with alerts your team can act on fast.",
    highlights: ["Lead dashboard", "WhatsApp pings", "Monthly performance report"],
  },
];

export const workflowUseCases: WorkflowUseCase[] = [
  {
    icon: Headphones,
    title: "Dental and aesthetic clinics",
    team: "Appointments",
    description:
      "Answer common patient questions, offer available slots, and send bookings to the team without missing after-hours demand.",
  },
  {
    icon: PhoneIncoming,
    title: "Real estate teams",
    team: "Viewings",
    description:
      "Handle calls while agents are in the field, qualify property enquiries, and schedule viewings automatically.",
  },
  {
    icon: MessageCircle,
    title: "Retail and local services",
    team: "Enquiries",
    description:
      "Respond instantly across chat and social DMs with product details, availability, pricing, and next steps.",
  },
  {
    icon: CalendarCheck,
    title: "Law firms and consultants",
    team: "Consultations",
    description:
      "Capture urgent enquiries, collect basic context, and book consultations without leaving callers waiting.",
  },
];

export const solutionProof = [
  { value: "0", label: "missed leads" },
  { value: "30+", label: "languages supported" },
  { value: "-80%", label: "cost vs. hiring" },
];

export const solutionVisualSteps = [
  { icon: PhoneIncoming, label: "Answer every call" },
  { icon: MessageCircle, label: "Reply to every message" },
  { icon: Languages, label: "Serve any language" },
  { icon: RotateCcw, label: "Recover missed leads" },
];
