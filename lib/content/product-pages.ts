import {
  Bot,
  CalendarCheck,
  CheckCircle2,
  Cog,
  Languages,
  MessageCircle,
  PhoneCall,
  PhoneForwarded,
  PlugZap,
  RotateCcw,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type ProductPageContent = {
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  badge: string;
  primaryCta: string;
  secondaryCta: string;
  heroSteps: { icon: LucideIcon; label: string; value: string }[];
  features: { icon: LucideIcon; title: string; description: string }[];
  outcomes: string[];
  proof: { value: string; label: string }[];
};

export const chatbotProduct: ProductPageContent = {
  eyebrow: "AI Chatbots",
  title: "Website and messaging chat that",
  accent: "books customers",
  subtitle:
    "A trained AI agent for your website, WhatsApp, Instagram, and Messenger that answers enquiries, qualifies leads, and guides customers toward appointments.",
  badge: "Website · WhatsApp · Instagram · Messenger",
  primaryCta: "Book a chatbot demo",
  secondaryCta: "See pricing",
  heroSteps: [
    { icon: MessageCircle, label: "Reply", value: "< 5s" },
    { icon: CheckCircle2, label: "Qualify", value: "24/7" },
    { icon: CalendarCheck, label: "Book", value: "More appointments" },
  ],
  features: [
    {
      icon: Bot,
      title: "Trained on your business",
      description:
        "Your chatbot learns your services, pricing, availability, policies, FAQs, and handoff rules before launch.",
    },
    {
      icon: MessageCircle,
      title: "Answers every channel",
      description:
        "Handle website chat, WhatsApp, social DMs, and routine enquiries without leaving customers waiting.",
    },
    {
      icon: CalendarCheck,
      title: "Turns intent into bookings",
      description:
        "Qualify the lead, capture the details, guide the next step, and alert your team when a customer is ready.",
    },
  ],
  outcomes: [
    "Answer product, service, pricing, and availability questions instantly",
    "Capture qualified leads after hours and on weekends",
    "Route appointment-ready conversations to your team",
    "Escalate with context when a human should step in",
  ],
  proof: [
    { value: "3-5", label: "day typical chatbot launch" },
    { value: "30+", label: "languages supported" },
    { value: "$109", label: "starter monthly retainer" },
  ],
};

export const voiceAgentProduct: ProductPageContent = {
  eyebrow: "AI Voice Agents",
  title: "Phone agents that sound natural and",
  accent: "pick up fast",
  subtitle:
    "A human-sounding AI phone agent that answers calls, handles enquiries, books appointments, and transfers urgent conversations in the caller's preferred language.",
  badge: "Inbound · Outbound · Transfer to human",
  primaryCta: "Book a voice demo",
  secondaryCta: "Hear live demo",
  heroSteps: [
    { icon: PhoneCall, label: "Pick up", value: "< 5s" },
    { icon: Languages, label: "Speak", value: "30+ langs" },
    { icon: PhoneForwarded, label: "Escalate", value: "With context" },
  ],
  features: [
    {
      icon: PhoneCall,
      title: "Answers like a trained rep",
      description:
        "Natural call flows help customers ask questions, confirm details, and move toward the next step.",
    },
    {
      icon: RotateCcw,
      title: "Recovers missed calls",
      description:
        "If a call slips through, the agent can follow up quickly so warm leads do not drift to competitors.",
    },
    {
      icon: ShieldCheck,
      title: "Hands off safely",
      description:
        "Escalate urgent or complex conversations to your team with caller details and conversation context.",
    },
  ],
  outcomes: [
    "Answer calls overnight, on weekends, and during peak hours",
    "Book appointments and collect caller details",
    "Summarize calls for your team",
    "Scale phone coverage without hiring another receptionist",
  ],
  proof: [
    { value: "7-14", label: "day typical voice launch" },
    { value: "< 5s", label: "average pickup target" },
    { value: "24/7", label: "always-on coverage" },
  ],
};

export const customAutomationProduct: ProductPageContent = {
  eyebrow: "Custom AI Automations",
  title: "AI workflows that connect your tools and",
  accent: "remove manual work",
  subtitle:
    "Custom automations for lead routing, follow-ups, CRM updates, internal alerts, and repeatable back-office tasks across the systems your team already uses.",
  badge: "CRM · Forms · Scheduling · Notifications",
  primaryCta: "Book an automation call",
  secondaryCta: "See pricing",
  heroSteps: [
    { icon: Workflow, label: "Map", value: "Your workflow" },
    { icon: PlugZap, label: "Connect", value: "Your tools" },
    { icon: Cog, label: "Automate", value: "Repeat tasks" },
  ],
  features: [
    {
      icon: Workflow,
      title: "Built around your process",
      description:
        "We map the steps your team repeats every day, then design an AI-assisted workflow that fits your handoff rules.",
    },
    {
      icon: PlugZap,
      title: "Connects your stack",
      description:
        "Automate CRM updates, form intake, appointment reminders, internal notifications, and lead follow-up across your existing tools.",
    },
    {
      icon: ShieldCheck,
      title: "Keeps humans in control",
      description:
        "Add approval points, escalation rules, and activity summaries so your team can trust what the automation is doing.",
    },
  ],
  outcomes: [
    "Reduce copy-paste work between forms, inboxes, CRMs, and calendars",
    "Trigger follow-ups when leads, bookings, or support requests come in",
    "Keep teams updated with summaries, alerts, and next-step prompts",
    "Document the workflow so it can scale without becoming fragile",
  ],
  proof: [
    { value: "1-2", label: "priority workflows to start" },
    { value: "24/7", label: "automation coverage" },
    { value: "Human", label: "approval where needed" },
  ],
};
