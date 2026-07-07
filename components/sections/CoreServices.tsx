import {
  AppWindow,
  BookOpenCheck,
  ContactRound,
  MessageSquareText,
  Network,
  PhoneCall,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { MarketingSection } from "@/components/primitives/MarketingPage";
import { Card } from "@/components/ui/card";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { services, type ServiceIconKey } from "@/lib/content/services";

const serviceIcons: Record<ServiceIconKey, LucideIcon> = {
  voice: PhoneCall,
  chat: MessageSquareText,
  workflow: Workflow,
  knowledge: BookOpenCheck,
  web: AppWindow,
  mobile: Smartphone,
  erp: Network,
  crm: ContactRound,
};

function GlowText({ children }: { children: string }) {
  return (
    <span className="text-[#FFF7DA] [text-shadow:0_0_1px_rgba(255,255,255,0.98),0_0_4px_rgba(255,244,198,0.58),0_0_8px_rgba(201,160,61,0.32)]">
      {children}
    </span>
  );
}

function ServiceCardTitle({ title, icon }: { title: string; icon: ServiceIconKey }) {
  if (icon === "web") {
    return (
      <>
        Custom <GlowText>Web Apps</GlowText>
        <br />+ <GlowText>AI</GlowText> Integrations
      </>
    );
  }

  if (icon === "mobile") {
    return (
      <>
        Custom <GlowText>Mobile Apps</GlowText>
        <br />+ <GlowText>AI</GlowText> Integrations
      </>
    );
  }

  if (icon === "erp") {
    return (
      <>
        Custom <GlowText>ERP</GlowText> Systems
        <br />+ <GlowText>AI</GlowText> Integrations
      </>
    );
  }

  if (icon === "crm") {
    return (
      <>
        Custom <GlowText>CRM</GlowText> Systems
        <br />+ <GlowText>AI</GlowText> Integrations
      </>
    );
  }

  return title;
}

export function CoreServices() {
  return (
    <MarketingSection
      id="core-services"
      ambient={false}
      containerClassName="max-w-7xl"
    >
      <FadeUp>
        <SectionHeader
          title="Our Core Services"
          subtitle="Every software solution is custom-built for your needs, with AI integrations designed to solve real business problems."
          className="[&_h2]:mt-0"
        />
      </FadeUp>

      <StaggerGrid className="mt-10 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {services.map(({ title, href, icon, cardImage }) => {
          const Icon = serviceIcons[icon];

          return (
            <StaggerItem key={title} className="h-full">
              <Link
                href={href}
                aria-label={`Explore ${title}`}
                className="block h-full"
              >
                <Card className="group relative grid h-full min-h-[190px] place-items-center overflow-hidden border-primary/18 bg-black p-5 text-center shadow-[0_24px_74px_-64px_rgba(196,154,48,0.9)] transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/42 hover:shadow-[0_28px_90px_-58px_rgba(196,154,48,0.95)] sm:min-h-[204px] sm:p-6">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-cover bg-center opacity-45 saturate-[0.8] transition-[opacity,transform,filter] duration-500 group-hover:scale-105 group-hover:opacity-58"
                    style={{ backgroundImage: `url(${cardImage})` }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5),rgba(0,0,0,0.74)),radial-gradient(circle_at_50%_48%,rgba(201,160,61,0.12),rgba(0,0,0,0.46)_66%)]"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-8 top-0 h-20 rounded-full bg-primary/14 blur-2xl transition-opacity duration-300 group-hover:opacity-90"
                  />
                  <div className="relative z-10 flex max-w-[15rem] flex-col items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/28 bg-black/45 text-primary shadow-[0_0_34px_-18px_rgba(196,154,48,0.9)] backdrop-blur-md">
                      <Icon aria-hidden className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-balance text-lg font-semibold leading-tight tracking-tight text-foreground drop-shadow-[0_2px_18px_rgba(0,0,0,0.95)] sm:text-xl lg:text-lg xl:text-xl">
                      <ServiceCardTitle title={title} icon={icon} />
                    </h3>
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerGrid>
    </MarketingSection>
  );
}
