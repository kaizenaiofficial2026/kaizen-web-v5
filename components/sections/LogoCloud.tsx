"use client";

import { Container } from "@/components/primitives/Container";

type Tool = {
  name: string;
  src: string;
};

const rowOneTools: Tool[] = [
  {
    name: "WhatsApp",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/whatsapp.svg",
  },
  {
    name: "Instagram",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg",
  },
  {
    name: "Facebook",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/facebook.svg",
  },
  {
    name: "Messenger",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/messenger.svg",
  },
  {
    name: "Gmail",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gmail.svg",
  },
  {
    name: "Salesforce",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/salesforce.svg",
  },
  {
    name: "HubSpot",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/hubspot.svg",
  },
  {
    name: "Zoho",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zoho.svg",
  },
  {
    name: "Google Calendar",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlecalendar.svg",
  },
  {
    name: "Calendly",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/calendly.svg",
  },
];

const rowTwoTools: Tool[] = [
  {
    name: "Shopify",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/shopify.svg",
  },
  {
    name: "Slack",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/slack.svg",
  },
  {
    name: "Stripe",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/stripe.svg",
  },
  {
    name: "Google Workspace",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg",
  },
  {
    name: "OpenAI",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg",
  },
  {
    name: "Anthropic",
    src: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/anthropic.svg",
  },
];

function LogoItem({ tool }: { tool: Tool }) {
  return (
    <div className="group/tool flex w-28 shrink-0 flex-col items-center gap-2 px-1 py-2 text-[rgba(163,163,163,0.48)] transition-colors duration-300 hover:text-primary sm:w-32 lg:w-[140px]">
      <span
        aria-hidden
        className="block h-9 w-9 bg-current transition-colors duration-300 sm:h-10 sm:w-10"
        style={{
          WebkitMaskImage: `url(${tool.src})`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          WebkitMaskSize: "contain",
          maskImage: `url(${tool.src})`,
          maskRepeat: "no-repeat",
          maskPosition: "center",
          maskSize: "contain",
        }}
      />
      <span className="whitespace-nowrap text-center text-[11px] font-normal text-[rgba(163,163,163,0.45)] transition-colors duration-300 group-hover/tool:text-primary">
        {tool.name}
      </span>
    </div>
  );
}

function MarqueeRow({
  tools,
  direction,
}: {
  tools: Tool[];
  direction: "left" | "right";
}) {
  const duplicatedTools = [...tools, ...tools, ...tools];

  return (
    <div
      className="kaizen-tools-marquee-outer relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className={`kaizen-tools-marquee-track flex w-max flex-row flex-nowrap items-center gap-10 sm:gap-14 ${
          direction === "right" ? "kaizen-tools-marquee-right" : "kaizen-tools-marquee-left"
        }`}
      >
        {duplicatedTools.map((tool, index) => (
          <LogoItem key={`${tool.name}-${index}`} tool={tool} />
        ))}
      </div>
    </div>
  );
}

export function LogoCloud() {
  return (
    <section
      aria-labelledby="logos-heading"
      className="relative w-full overflow-hidden border-t border-border/25 bg-black py-12"
    >
      <Container>
        <p
          id="logos-heading"
          className="mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-[rgba(163,163,163,0.4)]"
        >
          BUILT TO INTEGRATE WITH THE TOOLS YOUR BUSINESS ALREADY USES
        </p>
      </Container>
      <div className="flex w-full flex-col gap-6">
        <MarqueeRow tools={rowOneTools} direction="left" />
        <MarqueeRow tools={rowTwoTools} direction="right" />
      </div>
      <style jsx global>{`
        .kaizen-tools-marquee-track {
          will-change: transform;
        }

        .kaizen-tools-marquee-left {
          animation: kaizen-tools-marquee-left 38s linear infinite;
        }

        .kaizen-tools-marquee-right {
          animation: kaizen-tools-marquee-right 44s linear infinite;
        }

        @keyframes kaizen-tools-marquee-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }

        @keyframes kaizen-tools-marquee-right {
          from {
            transform: translateX(-33.333%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
