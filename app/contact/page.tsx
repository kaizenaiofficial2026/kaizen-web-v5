import type { Metadata } from "next";
import { ArrowRight, Globe2, Mail, MessageCircle, Phone } from "lucide-react";
import { BrowserVoiceCall } from "@/components/demo/BrowserVoiceCall";
import { BookDemoForm } from "@/components/forms/BookDemoForm";
import { FacebookIcon, LinkedinIcon, MediumIcon, TwitterIcon } from "@/components/icons/social";
import { MarketingHero, MarketingSection } from "@/components/primitives/MarketingPage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FadeUp } from "@/components/motion/FadeUp";

export const metadata: Metadata = {
  title: "Contact — KaizenAI",
  description:
    "Try our AI agents live, reach us on WhatsApp or email, or book a free consultation to discover what KaizenAI can automate in your business.",
};

const whatsappDemoHref =
  "https://wa.me/94770299569?text=Hi%20KaizenAI%2C%20I%20want%20to%20try%20the%20chat%20agent%20demo.";

const contactItems = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+94 77 029 9569",
    button: "Message Us",
    href: "https://wa.me/94770299569",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@kaizenai.dev",
    button: "Send Email",
    href: "mailto:hello@kaizenai.dev",
  },
  {
    icon: Globe2,
    label: "Website",
    value: "kaizenai.dev",
    button: "Visit Site",
    href: "https://kaizenai.dev",
  },
];

const socials = [
  { label: "Twitter/X", href: "https://x.com/kaizen_ai_dev", icon: TwitterIcon },
  { label: "Medium", href: "https://medium.com/@kaizenaioffcial2026", icon: MediumIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/kaizenai-dev/about/",
    icon: LinkedinIcon,
  },
  {
    label: "Facebook",
    href: "https://web.facebook.com/profile.php?id=61574344472130",
    icon: FacebookIcon,
  },
];

export default function ContactPage() {
  return (
    <main id="main" className="relative overflow-hidden">
      <MarketingHero
        eyebrow="Contact"
        title="Let's Talk."
        subtitle="Try our AI agents live, reach us directly, or book a free consultation to see what KaizenAI can automate in your business."
        actions={[{ label: "Book Consultation", href: "/contact#book" }]}
      />

      <MarketingSection>
        <FadeUp>
          <SectionHeader
            eyebrow="Live Demo"
            title="Experience KaizenAI Before You Commit"
            subtitle="Talk to our AI Voice Agent or message the AI Chat Agent, the same technology we build for our clients."
          />
        </FadeUp>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <FadeUp>
            <Card className="h-full p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <Phone className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
                AI Voice Agent
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Call our live AI Voice Agent and experience how it answers
                questions, handles enquiries, and books appointments in a real
                conversation.
              </p>
              <div className="mt-6">
                <BrowserVoiceCall />
              </div>
            </Card>
          </FadeUp>

          <FadeUp delay={0.08}>
            <Card className="flex h-full flex-col p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <MessageCircle className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
                AI Chat Agent
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Use the chat widget on this page or message us on WhatsApp to
                experience how our AI handles customer conversations.
              </p>
              <p className="mt-5 rounded-2xl border border-primary/18 bg-primary/10 p-4 text-sm leading-6 text-foreground/80">
                The chat widget is live on this page. Open it from the
                bottom-right corner.
              </p>
              <Button asChild size="xl" className="mt-auto w-full sm:w-fit">
                <a href={whatsappDemoHref} target="_blank" rel="noreferrer">
                  Message Us on WhatsApp
                  <ArrowRight aria-hidden />
                </a>
              </Button>
            </Card>
          </FadeUp>
        </div>
      </MarketingSection>

      <MarketingSection>
        <FadeUp>
          <SectionHeader eyebrow="Reach Us" title="Get In Touch Directly" />
        </FadeUp>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {contactItems.map((item) => {
            const Icon = item.icon;

            return (
              <FadeUp key={item.label}>
                <Card className="h-full p-6 text-center transition-colors hover:border-primary/40">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h2 className="mt-5 text-lg font-semibold text-foreground">
                    {item.label}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.value}
                  </p>
                  <Button asChild variant="outline" size="lg" className="mt-6 rounded-xl">
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>
                      {item.button}
                    </a>
                  </Button>
                </Card>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp className="mt-10 flex flex-col items-center justify-center gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Follow Us
          </p>
          <nav aria-label="Social media" className="flex flex-wrap items-center justify-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              );
            })}
          </nav>
        </FadeUp>
      </MarketingSection>

      <MarketingSection id="book">
        <FadeUp>
          <SectionHeader
            eyebrow="Book a Consultation"
            title="Book Your Free Consultation"
            subtitle="Tell us about your business and we'll identify the highest-impact AI opportunities at no cost."
          />
        </FadeUp>
        <FadeUp className="mx-auto mt-10 max-w-4xl">
          <BookDemoForm />
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-6 text-muted-foreground">
            No pressure. We&apos;ll review your details and suggest the best AI
            setup for your business.
            <br />
            kaizenai.dev · hello@kaizenai.dev · +94 77 029 9569
          </p>
        </FadeUp>
      </MarketingSection>
    </main>
  );
}
