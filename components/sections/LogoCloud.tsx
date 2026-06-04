"use client";

import { motion } from "motion/react";
import {
  Blocks,
  CreditCard,
  Mail,
  MessageCircle,
  MessagesSquare,
  PlugZap,
  ShoppingBag,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/primitives/Container";

type ToolItem = {
  name: string;
  mark?: string;
  Icon?: LucideIcon;
};

const toolRows: ToolItem[][] = [
  [
    { name: "WhatsApp", mark: "/brand-logos/whatsapp.svg" },
    { name: "Instagram", mark: "/brand-logos/instagram.svg" },
    { name: "Facebook", Icon: MessagesSquare },
    { name: "Messenger", mark: "/brand-logos/messenger.svg" },
    { name: "Gmail", Icon: Mail },
    { name: "Salesforce", mark: "/brand-logos/salesforce.svg" },
    { name: "HubSpot", mark: "/brand-logos/hubspot.svg" },
    { name: "Zoho", mark: "/brand-logos/zoho.svg" },
    { name: "Google Calendar", mark: "/brand-logos/googlecalendar.svg" },
    { name: "Calendly", mark: "/brand-logos/calendly.svg" },
  ],
  [
    { name: "Shopify", Icon: ShoppingBag },
    { name: "Slack", Icon: MessageCircle },
    { name: "Zapier", Icon: PlugZap },
    { name: "Make", mark: "/brand-logos/make.svg" },
    { name: "Stripe", Icon: CreditCard },
    { name: "Twilio", mark: "/brand-logos/twilio.svg" },
    { name: "Google Workspace", Icon: Blocks },
    { name: "OpenAI", mark: "/brand-logos/openai.svg" },
    { name: "Anthropic", mark: "/brand-logos/anthropic.svg" },
    { name: "n8n", mark: "/brand-logos/n8n.svg" },
  ],
];

const ToolMark = ({ item }: { item: ToolItem }) => {
  if (item.mark) {
    return (
      <span
        aria-hidden
        className="h-10 w-10 shrink-0 bg-current opacity-70 transition-opacity group-hover/tool:opacity-100 sm:h-12 sm:w-12"
        style={{
          WebkitMaskImage: `url(${item.mark})`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          WebkitMaskSize: "contain",
          maskImage: `url(${item.mark})`,
          maskRepeat: "no-repeat",
          maskPosition: "center",
          maskSize: "contain",
        }}
      />
    );
  }

  const Icon = item.Icon ?? Workflow;

  return (
    <Icon
      aria-hidden
      className="h-10 w-10 shrink-0 opacity-70 transition-opacity group-hover/tool:opacity-100 sm:h-12 sm:w-12"
      strokeWidth={1.45}
    />
  );
};

const Row = ({
  items,
  reverse = false,
  duration = 96,
}: {
  items: ToolItem[];
  reverse?: boolean;
  duration?: number;
}) => {
  const doubled = [...items, ...items];

  return (
    <div className="mask-fade-x group relative overflow-hidden">
      <motion.div
        className="flex w-max items-center gap-9 whitespace-nowrap py-3 group-hover:[animation-play-state:paused] sm:gap-12 sm:py-4"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item.name}-${i}`}
            className="group/tool inline-flex w-24 shrink-0 flex-col items-center justify-start gap-3 text-center text-foreground/55 transition-colors hover:text-primary sm:w-28"
          >
            <ToolMark item={item} />
            <span className="text-[11px] font-semibold leading-tight text-current opacity-80 transition-opacity group-hover/tool:opacity-100 sm:text-xs">
              {item.name}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export function LogoCloud() {
  return (
    <section
      aria-labelledby="logos-heading"
      className="relative w-full overflow-hidden border-t border-border/25 bg-black py-12 sm:py-16"
    >
      <Container>
        <p
          id="logos-heading"
          className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.24em] text-foreground/62 sm:mb-8"
        >
          BUILT TO CONNECT WITH THE TOOLS YOUR BUSINESS ALREADY USES
        </p>
        <div className="relative flex flex-col gap-4 sm:gap-5">
          <Row items={toolRows[0]} duration={96} />
          <Row items={toolRows[1]} reverse duration={108} />
        </div>
      </Container>
    </section>
  );
}
