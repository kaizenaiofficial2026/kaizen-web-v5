export type ServiceIconKey =
  | "voice"
  | "chat"
  | "workflow"
  | "knowledge"
  | "web"
  | "mobile"
  | "erp"
  | "crm";

export type ServicePageContent = {
  slug: string;
  title: string;
  navLabel?: string;
  href: string;
  icon: ServiceIconKey;
  cardImage: string;
  summary: string;
  outcomes: string[];
  buildFocus: string[];
};

export const services: ServicePageContent[] = [
  {
    slug: "ai-receptionists",
    title: "AI Receptionists",
    href: "/services/ai-receptionists",
    icon: "voice",
    cardImage: "/images/services/ai-receptionists.svg",
    summary:
      "Custom AI receptionists that answer, qualify, book, remind, follow up, and transfer conversations when a human should step in.",
    outcomes: [
      "Recover missed calls and after-hours enquiries",
      "Book appointments directly into your calendar",
      "Qualify leads before they reach your team",
      "Route urgent or complex calls to the right person",
    ],
    buildFocus: [
      "Inbound call answering",
      "Outbound follow-up campaigns",
      "Safe human handoff rules",
      "CRM and calendar integration",
    ],
  },
  {
    slug: "ai-chat-agents",
    title: "AI Chat Agents",
    href: "/services/ai-chat-agents",
    icon: "chat",
    cardImage: "/images/services/ai-chat-agents.svg",
    summary:
      "AI chat agents for WhatsApp, Instagram, Messenger, and web chat, built around your customer journey and support workflow.",
    outcomes: [
      "Reply instantly across your highest-value channels",
      "Convert website and social traffic into qualified leads",
      "Answer FAQs using your business knowledge",
      "Escalate conversations with full customer context",
    ],
    buildFocus: [
      "Website chat",
      "WhatsApp and social inboxes",
      "Lead capture and qualification",
      "Support and sales handoff",
    ],
  },
  {
    slug: "agentic-ai-workflow-automation",
    title: "Agentic AI Workflow Automation",
    href: "/services/agentic-ai-workflow-automation",
    icon: "workflow",
    cardImage: "/images/services/workflow-automation.svg",
    summary:
      "Agentic automations that coordinate multi-step work across tools, teams, approvals, data, and customer communication.",
    outcomes: [
      "Remove repetitive back-office bottlenecks",
      "Reduce manual data entry and routing errors",
      "Trigger follow-ups without waiting on staff",
      "Keep teams aligned across disconnected systems",
    ],
    buildFocus: [
      "Data entry and enrichment",
      "Follow-up sequences",
      "Task routing and approvals",
      "Reconciliation and reporting workflows",
    ],
  },
  {
    slug: "ai-knowledge-assistant",
    title: "AI Knowledge Assistant",
    href: "/services/ai-knowledge-assistant",
    icon: "knowledge",
    cardImage: "/images/services/knowledge-assistant.svg",
    summary:
      "A private AI assistant trained on your documents, SOPs, policies, tools, and internal knowledge so your team can find answers fast.",
    outcomes: [
      "Turn scattered knowledge into instant answers",
      "Help staff follow SOPs consistently",
      "Reduce repetitive internal questions",
      "Support faster onboarding and decision-making",
    ],
    buildFocus: [
      "Document and SOP retrieval",
      "Private knowledge bases",
      "Role-aware answer flows",
      "Tool-connected internal assistants",
    ],
  },
  {
    slug: "custom-web-apps-ai-integrations",
    title: "Custom Web Apps + AI Integrations",
    navLabel: "Custom Web Apps + AI",
    href: "/services/custom-web-apps-ai-integrations",
    icon: "web",
    cardImage: "/images/services/web-apps.svg",
    summary:
      "Custom web applications designed around your operations, with AI integrations built into the workflows that matter.",
    outcomes: [
      "Replace spreadsheets and disconnected tools",
      "Create role-based dashboards for daily work",
      "Embed AI assistance into core user actions",
      "Connect forms, CRMs, calendars, and notifications",
    ],
    buildFocus: [
      "Internal portals",
      "Customer-facing platforms",
      "Admin dashboards",
      "AI-assisted workflows",
    ],
  },
  {
    slug: "custom-mobile-apps-ai-integrations",
    title: "Custom Mobile Apps + AI Integrations",
    navLabel: "Custom Mobile Apps + AI",
    href: "/services/custom-mobile-apps-ai-integrations",
    icon: "mobile",
    cardImage: "/images/services/mobile-apps.svg",
    summary:
      "iOS and Android applications built for real business workflows, with AI features integrated where they create measurable value.",
    outcomes: [
      "Give customers or teams a focused mobile experience",
      "Automate mobile-first service and support flows",
      "Add AI-powered search, guidance, and capture",
      "Connect mobile actions to your existing systems",
    ],
    buildFocus: [
      "Customer apps",
      "Team operations apps",
      "Booking and service apps",
      "AI-powered mobile features",
    ],
  },
  {
    slug: "custom-erp-systems-ai-integrations",
    title: "Custom ERP Systems + AI Integrations",
    navLabel: "Custom ERP Systems + AI",
    href: "/services/custom-erp-systems-ai-integrations",
    icon: "erp",
    cardImage: "/images/services/erp-systems.svg",
    summary:
      "ERP systems tailored to your workflow, with AI integrations that improve visibility, reduce manual work, and support better decisions.",
    outcomes: [
      "Unify operations around one workflow",
      "Automate approvals, alerts, and task movement",
      "Improve reporting across departments",
      "Reduce manual reconciliation and admin pressure",
    ],
    buildFocus: [
      "Operations management",
      "Inventory and finance workflows",
      "Role-based dashboards",
      "AI-supported reporting",
    ],
  },
  {
    slug: "custom-crm-systems-ai-integrations",
    title: "Custom CRM Systems + AI Integrations",
    navLabel: "Custom CRM Systems + AI",
    href: "/services/custom-crm-systems-ai-integrations",
    icon: "crm",
    cardImage: "/images/services/crm-systems.svg",
    summary:
      "CRM systems built around your sales process, with AI integrations for lead scoring, follow-up, routing, and pipeline visibility.",
    outcomes: [
      "Track every lead from first touch to close",
      "Score and prioritize opportunities with AI",
      "Automate follow-up across channels",
      "Give sales teams cleaner pipeline visibility",
    ],
    buildFocus: [
      "Lead intake and enrichment",
      "Pipeline automation",
      "AI lead scoring",
      "Sales follow-up workflows",
    ],
  },
];

export const serviceNavItems = services.map((service) => ({
  label: service.navLabel ?? service.title,
  href: service.href,
}));

export const serviceSlugs = services.map((service) => service.slug);

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
