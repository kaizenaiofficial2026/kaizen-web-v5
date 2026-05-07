import { HeroBackground } from "./components/HeroBackground";

export default function Home() {
  return (
    <div className="bg-primary-black text-off-white w-full">
      <HeroSection />
      <ComparisonSection />
      <PricingSection />
      <CTASection />
      <FAQSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative flex h-screen w-full flex-col overflow-hidden">
      <HeroBackground />
      <div className="bg-primary-black/30 pointer-events-none absolute inset-0 z-0" />
      <Grain />
      <Nav />

      <main className="relative z-10 flex flex-1 flex-col justify-end px-8 pb-12 sm:px-16">
        <h1 className="text-off-white text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Kaizen AI
          <br />
          <span className="text-gold-main">Intelligent Tools</span>
        </h1>

        <p className="text-muted-gold mt-6 max-w-xl text-sm leading-6 sm:text-base">
          Kaizen AI Intelligent Tools empowers users with smart automation,
          insights, and seamless productivity across digital workflows.
        </p>

        <div className="mt-10 flex items-center gap-3">
          <a
            href="#"
            className="bg-gold-main text-primary-black hover:bg-gold-light rounded-md px-6 py-3 text-sm font-medium transition-colors"
          >
            To Try
          </a>
          <a
            href="#"
            className="border-gold-main/25 bg-gold-main/5 text-off-white hover:bg-gold-main/10 hover:border-gold-main/50 rounded-md border px-6 py-3 text-sm font-medium backdrop-blur-sm transition-colors"
          >
            Leave a request
          </a>
        </div>

        <p className="text-muted-gold mt-6 text-xs">
          No credit card needed. All data is secure.
        </p>
      </main>

      <LogoBar />
    </section>
  );
}

function Nav() {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10">
      <a
        href="#"
        className="border-gold-main/20 bg-dark-surface/60 text-off-white flex items-center gap-2 rounded-full border py-2 pl-3 pr-5 text-sm font-medium backdrop-blur-md"
      >
        <span className="bg-gold-main/20 grid h-5 w-5 place-items-center rounded-sm">
          <span className="bg-gold-main block h-2 w-2 rounded-full" />
        </span>
        Kaizen.AI
      </a>

      <nav className="border-gold-main/20 bg-dark-surface/60 hidden items-center gap-1 rounded-full border px-2 py-1.5 text-sm backdrop-blur-md md:flex">
        {["Features", "Pricing", "About", "Contact"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-off-white/80 hover:bg-gold-main/10 hover:text-gold-main rounded-full px-4 py-1.5 transition-colors"
          >
            {item}
          </a>
        ))}
      </nav>

      <a
        href="#"
        className="border-gold-main/30 bg-gold-main/10 text-gold-light hover:bg-gold-main/20 hover:text-off-white rounded-full border px-5 py-2 text-sm font-medium backdrop-blur-md transition-colors"
      >
        Get Started
      </a>
    </header>
  );
}

function LogoBar() {
  const logos = ["productboard", "Airtable", "Basecamp", "contentful", "Airwallex"];
  return (
    <div className="divide-gold-main/10 border-gold-main/15 bg-dark-surface/60 relative z-10 grid grid-cols-2 divide-x border-t backdrop-blur-md sm:grid-cols-5">
      {logos.map((name) => (
        <div
          key={name}
          className="text-off-white/85 flex items-center justify-center gap-2 px-4 py-6 text-base font-medium sm:text-lg"
        >
          <span className="bg-gold-main/80 h-3 w-3 rounded-sm" />
          {name}
        </div>
      ))}
    </div>
  );
}

function Grain() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 z-1 h-full w-full opacity-[0.18] mix-blend-overlay"
    >
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="text-gold-main border-gold-main/30 bg-gold-main/5 inline-block rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.18em]">
        {eyebrow}
      </span>
      <h2 className="text-off-white mt-5 text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="text-muted-gold mt-5 text-base leading-7 sm:text-lg">
        {subtitle}
      </p>
    </div>
  );
}

function SectionShell({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden px-6 sm:px-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 0%, rgba(201,160,61,0.08) 0%, rgba(10,9,7,0) 70%), radial-gradient(80% 60% at 50% 100%, rgba(201,160,61,0.05) 0%, rgba(10,9,7,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="via-gold-main/30 pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl py-20">
        {children}
      </div>
    </section>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

function ComparisonSection() {
  const rows: { label: string; kaizen: boolean; others: boolean | string }[] = [
    { label: "Adaptive AI workflows", kaizen: true, others: false },
    { label: "Unified data layer across tools", kaizen: true, others: false },
    { label: "Realtime collaborative agents", kaizen: true, others: "Limited" },
    { label: "Enterprise-grade security & SSO", kaizen: true, others: true },
    { label: "Self-improving prompts", kaizen: true, others: false },
    { label: "Transparent, usage-based pricing", kaizen: true, others: false },
  ];

  return (
    <SectionShell id="comparison">
      <SectionHeader
        eyebrow="Comparison"
        title={
          <>
            Built different.
            <br />
            <span className="text-gold-main">Built better.</span>
          </>
        }
        subtitle="See how Kaizen AI stacks up against the tools you already use."
      />

      <div className="border-gold-main/15 bg-dark-surface/60 mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border backdrop-blur-md">
        <div className="text-muted-gold border-gold-main/10 grid grid-cols-[1.4fr_1fr_1fr] border-b px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] sm:px-8">
          <div>Feature</div>
          <div className="text-gold-light text-center">Kaizen AI</div>
          <div className="text-center">Others</div>
        </div>
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`grid grid-cols-[1.4fr_1fr_1fr] items-center px-6 py-4 sm:px-8 ${
              i !== rows.length - 1 ? "border-gold-main/5 border-b" : ""
            }`}
          >
            <div className="text-off-white text-sm sm:text-base">{row.label}</div>
            <div className="flex justify-center">
              <span className="bg-gold-main/15 text-gold-light inline-flex h-7 w-7 items-center justify-center rounded-full">
                <CheckIcon className="h-4 w-4" />
              </span>
            </div>
            <div className="flex justify-center">
              {typeof row.others === "string" ? (
                <span className="text-muted-gold text-sm">{row.others}</span>
              ) : row.others ? (
                <span className="text-muted-gold/80 inline-flex h-7 w-7 items-center justify-center">
                  <CheckIcon className="h-4 w-4" />
                </span>
              ) : (
                <span className="text-muted-gold/60 inline-flex h-7 w-7 items-center justify-center">
                  <CrossIcon className="h-4 w-4" />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function PricingSection() {
  const tiers = [
    {
      name: "Starter",
      price: "$0",
      cadence: "/month",
      description: "Try Kaizen AI on your everyday work.",
      features: ["Up to 3 projects", "Core AI tools", "Community support"],
      cta: "Start free",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$29",
      cadence: "/month",
      description: "For professionals who ship every day.",
      features: [
        "Unlimited projects",
        "Adaptive workflows",
        "Priority support",
        "Team collaboration",
      ],
      cta: "Upgrade to Pro",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      cadence: "",
      description: "Security, scale, and bespoke integrations.",
      features: [
        "SSO & SCIM",
        "Dedicated infrastructure",
        "Custom agents",
        "24/7 enterprise support",
      ],
      cta: "Contact sales",
      highlighted: false,
    },
  ];

  return (
    <SectionShell id="pricing">
      <SectionHeader
        eyebrow="Pricing"
        title={
          <>
            Simple plans.
            <br />
            <span className="text-gold-main">Powerful results.</span>
          </>
        }
        subtitle="Pick the tier that fits today. Upgrade the moment you outgrow it."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative flex flex-col rounded-2xl border p-7 backdrop-blur-md transition-colors ${
              tier.highlighted
                ? "border-gold-main/60 bg-gold-main/5"
                : "border-gold-main/15 bg-dark-surface/60 hover:border-gold-main/30"
            }`}
          >
            {tier.highlighted && (
              <span className="bg-gold-main text-primary-black absolute -top-3 left-7 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]">
                Most popular
              </span>
            )}
            <div className="text-muted-gold text-sm font-medium uppercase tracking-[0.18em]">
              {tier.name}
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-off-white text-4xl font-semibold tracking-tight">
                {tier.price}
              </span>
              <span className="text-muted-gold text-sm">{tier.cadence}</span>
            </div>
            <p className="text-muted-gold mt-3 text-sm leading-6">
              {tier.description}
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {tier.features.map((feature) => (
                <li key={feature} className="text-off-white/90 flex items-center gap-3">
                  <CheckIcon className="text-gold-main h-4 w-4 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className={`mt-8 inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-medium transition-colors ${
                tier.highlighted
                  ? "bg-gold-main text-primary-black hover:bg-gold-light"
                  : "border-gold-main/30 text-off-white hover:bg-gold-main/10 hover:border-gold-main/60 border"
              }`}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function CTASection() {
  return (
    <section
      id="cta"
      className="bg-primary-black relative flex h-screen w-full items-center justify-center overflow-hidden px-6 sm:px-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(70% 55% at 50% 30%, rgba(201,160,61,0.28) 0%, rgba(201,160,61,0.08) 35%, rgba(10,9,7,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 3px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h2 className="text-off-white text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Ready to <span className="text-gold-main">amplify</span>
          <br />
          your <span className="text-gold-main">output</span> this month?
        </h2>
        <p className="text-off-white/75 mx-auto mt-8 max-w-2xl text-base leading-7 sm:text-lg">
          To maintain our exceptional standards, we work with a carefully
          chosen group of teams. If you&apos;re committed to compounding your
          team&apos;s output, reach out.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#"
            className="bg-gold-main text-primary-black hover:bg-gold-light group inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] transition-colors"
          >
            Free Website Audit
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
          <a
            href="#"
            className="border-gold-main/40 text-off-white hover:bg-gold-main/10 hover:border-gold-main/70 inline-flex items-center rounded-md border px-7 py-3.5 text-sm font-medium transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "What is Kaizen AI?",
      a: "Kaizen AI is a unified intelligent toolkit that connects your data, automates repetitive work, and learns the way your team operates so every day gets a little better than the last.",
    },
    {
      q: "How is Kaizen different from other AI tools?",
      a: "Most tools sit on top of your work. Kaizen builds inside it — adaptive agents, a shared data layer, and prompts that improve themselves based on your actual outcomes.",
    },
    {
      q: "Is my data secure?",
      a: "Yes. All data is encrypted in transit and at rest. Enterprise customers get SSO, SCIM, audit logs, and the option of dedicated infrastructure.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Absolutely. Plans are billed monthly, you can downgrade or cancel at any time, and you keep access through the end of the current billing cycle.",
    },
    {
      q: "Do you offer a free plan?",
      a: "Yes — Starter is free forever and gives you access to the core AI tools. You can upgrade to Pro the moment you outgrow it.",
    },
  ];

  return (
    <SectionShell id="faq">
      <div className="border-gold-main/15 bg-dark-surface/60 rounded-2xl border px-6 py-10 backdrop-blur-md sm:px-12 sm:py-14">
        <div className="flex items-start justify-between gap-8 pb-10">
          <p className="text-muted-gold text-sm leading-6 sm:text-base">
            Got questions?
            <br />
            Say less, we&apos;ve got answers!
          </p>
          <h2 className="text-off-white flex items-start gap-3 font-serif text-5xl italic leading-none tracking-tight sm:text-6xl">
            FAQ&apos;s
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gold-main mt-1 h-7 w-7 sm:h-9 sm:w-9"
            >
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </h2>
        </div>

        <div className="border-gold-main/15 border-t">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group border-gold-main/15 border-b py-7"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-8">
                <span className="text-off-white text-base font-semibold uppercase tracking-[0.04em] sm:text-lg lg:text-xl">
                  {item.q}
                </span>
                <span className="text-gold-main relative grid h-6 w-6 shrink-0 place-items-center transition-transform group-open:rotate-45">
                  <span className="absolute h-0.5 w-full bg-current" />
                  <span className="absolute h-full w-0.5 bg-current" />
                </span>
              </summary>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="hidden sm:block" />
                <p className="text-muted-gold text-sm leading-7 sm:text-base">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
