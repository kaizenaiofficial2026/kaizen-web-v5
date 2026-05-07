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
      <div className="bg-primary-black/55 pointer-events-none absolute inset-0 z-0" />
      <Grain />
      <Nav />

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center sm:px-12">
        <span className="border-gold-main/25 bg-dark-surface/60 text-off-white/85 inline-block rounded-md border px-4 py-1.5 text-xs backdrop-blur-md sm:text-sm">
          A platform for intelligent tools
        </span>

        <h1 className="text-off-white mt-6 max-w-4xl text-4xl font-medium leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
          Kaizen AI Intelligent Tools
          <br />
          <span className="text-gold-main">for every workflow</span>
        </h1>

        <p className="text-off-white/75 mt-6 max-w-xl text-sm leading-7 sm:text-base">
          Turn ambition into progress. Adaptive automation, smart insights, and
          seamless productivity that compound your team&apos;s output every day.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#"
            className="bg-off-white text-primary-black hover:bg-gold-light shadow-gold-main/30 group inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium shadow-[0_0_40px] transition-colors"
          >
            Begin your Journey
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a
            href="#"
            className="border-gold-main/30 bg-primary-black/30 text-off-white hover:bg-gold-main/10 hover:border-gold-main/60 inline-flex items-center rounded-md border px-6 py-3 text-sm font-medium backdrop-blur-sm transition-colors"
          >
            Explore Programs
          </a>
        </div>
      </main>
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
  const challenges = [
    "Prone to errors and data loss",
    "High switching costs, low efficiency",
    "Delays, missed follow-ups",
    "Lack of visibility & accountability",
    "Increased overhead & inefficiency",
    "Time-consuming and unreliable",
  ];

  const solutions = [
    "Centralized, secure dashboard",
    "All-in-one platform with seamless integrations",
    "Adaptive workflows that learn your team",
    "Realtime collaborative agents",
    "Self-improving prompts and outcomes",
    "Zero maintenance, effortless updates",
  ];

  return (
    <SectionShell id="comparison">
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-gold-main text-sm font-semibold tracking-wide">
          Comparison
        </span>
        <h2 className="text-off-white mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          From Chaos to Clarity:
          <br />
          Simplify Your Workflow
        </h2>
        <p className="text-muted-gold mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg">
          Manage everything in one place — no more scattered apps or manual work.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        <div className="space-y-4">
          <div className="border-gold-main/10 bg-dark-surface/40 rounded-2xl border px-6 py-5 text-center">
            <span className="text-off-white/80 text-base font-semibold">
              Traditional Approach
            </span>
          </div>
          <div className="border-gold-main/10 bg-dark-surface/40 rounded-2xl border px-6 py-8 sm:px-8">
            <h3 className="text-off-white text-lg font-semibold">Challenges</h3>
            <ul className="mt-6 space-y-4 text-sm sm:text-base">
              {challenges.map((item) => (
                <li
                  key={item}
                  className="text-off-white/70 flex items-center gap-3"
                >
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-red-400/50 text-red-400/80">
                    <CrossIcon className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gold-main rounded-2xl px-6 py-5 text-center">
            <span className="text-primary-black inline-flex items-center gap-2 text-base font-semibold">
              <span className="bg-primary-black/15 grid h-5 w-5 place-items-center rounded-full">
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  className="h-3 w-3"
                >
                  <path d="M8 3v10M3 8h10" />
                </svg>
              </span>
              Kaizen AI
            </span>
          </div>
          <div
            className="border-gold-main/40 rounded-2xl border px-6 py-8 sm:px-8"
            style={{
              backgroundImage:
                "linear-gradient(160deg, rgba(201,160,61,0.18) 0%, rgba(141,111,36,0.22) 40%, rgba(26,22,12,0.7) 100%)",
            }}
          >
            <h3 className="text-off-white text-lg font-semibold">
              Our Solution
            </h3>
            <ul className="mt-6 space-y-4 text-sm sm:text-base">
              {solutions.map((item) => (
                <li
                  key={item}
                  className="text-off-white flex items-center gap-3"
                >
                  <span className="bg-gold-main text-primary-black grid h-5 w-5 shrink-0 place-items-center rounded-full">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

type Feature = string | { label: string; badge: string };

type Tier = {
  name: string;
  description: string;
  price: string;
  cadence?: string;
  cta: string;
  ctaIcon?: "mail";
  seats: string;
  storage: string;
  inheritsLabel?: string;
  features: Feature[];
  highlighted?: boolean;
  popular?: boolean;
};

function SeatIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="10" cy="7" r="3" />
      <path d="M3.5 17c1.2-3 3.7-4.5 6.5-4.5s5.3 1.5 6.5 4.5" />
    </svg>
  );
}

function CloudIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 15h9a3 3 0 0 0 0.4-5.97A5 5 0 0 0 5.5 10.5 3 3 0 0 0 6 15z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="M3 6l7 5 7-5" />
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10 2l1.6 4.4L16 8l-4.4 1.6L10 14l-1.6-4.4L4 8l4.4-1.6L10 2z" />
    </svg>
  );
}

function PlanGlyph({ tone }: { tone: "muted" | "gold" | "deep" }) {
  const fillId = `pg-${tone}`;
  const stops =
    tone === "gold"
      ? ["#ecd479", "#c9a03d"]
      : tone === "deep"
      ? ["#8d6f24", "#3a2d10"]
      : ["#3a3528", "#171206"];
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10">
      <defs>
        <radialGradient id={fillId} cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor={stops[0]} />
          <stop offset="100%" stopColor={stops[1]} />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="18" fill={`url(#${fillId})`} />
      <path
        d="M11 23c4-1 6-7 10-7s5 6 9 5"
        stroke="rgba(10,9,7,0.45)"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CornerArt({ highlighted }: { highlighted?: boolean }) {
  const stroke = highlighted ? "rgba(10,9,7,0.35)" : "rgba(201,160,61,0.18)";
  return (
    <svg
      aria-hidden
      viewBox="0 0 220 220"
      className="pointer-events-none absolute -right-6 -top-6 h-44 w-44"
    >
      <path
        d="M10 130 Q70 60 120 110 T210 80"
        stroke={stroke}
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M30 170 Q90 110 140 150 T220 120"
        stroke={stroke}
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

function PricingSection() {
  const tiers: Tier[] = [
    {
      name: "Starter",
      description: "Core AI tools for everyday work. Single workspace.",
      price: "$0",
      cadence: "/month",
      cta: "Choose this plan",
      seats: "2 free",
      storage: "250MB",
      features: [
        "Core AI tools",
        "Community support",
        "Single workspace",
      ],
    },
    {
      name: "Pro",
      description:
        "Adaptive workflows, realtime agents, and team collaboration.",
      price: "$29",
      cadence: "/month",
      cta: "Choose this plan",
      seats: "5 free",
      storage: "10GB",
      inheritsLabel: "Starter +",
      features: [
        { label: "Adaptive workflows", badge: "AI-based" },
        "Realtime collaboration",
        "Priority support",
      ],
      highlighted: true,
      popular: true,
    },
    {
      name: "Enterprise",
      description: "SSO, dedicated infrastructure, and custom agents.",
      price: "Contact us",
      cta: "Contact us",
      ctaIcon: "mail",
      seats: "Unlimited",
      storage: "1TB+",
      inheritsLabel: "Starter & Pro +",
      features: ["SSO & SCIM", "Dedicated infra", "24/7 support"],
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

      <div className="mt-16 grid items-start gap-6 sm:grid-cols-3">
        {tiers.map((tier, i) => (
          <PricingCard key={tier.name} tier={tier} indexTone={i} />
        ))}
      </div>
    </SectionShell>
  );
}

function PricingCard({ tier, indexTone }: { tier: Tier; indexTone: number }) {
  const isHighlighted = !!tier.highlighted;
  const glyphTone =
    indexTone === 0 ? "muted" : indexTone === 1 ? "gold" : "deep";

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-2xl border p-7 backdrop-blur-md ${
        isHighlighted
          ? "border-gold-main/50 sm:-mt-6 sm:pb-9"
          : "border-gold-main/15 bg-dark-surface/60"
      }`}
      style={
        isHighlighted
          ? {
              backgroundImage:
                "linear-gradient(160deg, rgba(236,212,121,0.25) 0%, rgba(201,160,61,0.18) 35%, rgba(60,45,16,0.55) 100%)",
            }
          : undefined
      }
    >
      <CornerArt highlighted={isHighlighted} />

      {tier.popular && (
        <span className="bg-primary-black/60 text-off-white border-gold-main/30 absolute right-5 top-5 rounded-full border px-3 py-1 text-[11px] font-medium">
          Most popular
        </span>
      )}

      <div className="relative">
        <PlanGlyph tone={glyphTone as "muted" | "gold" | "deep"} />
      </div>

      <h3 className="text-off-white relative mt-6 text-2xl font-semibold tracking-tight">
        {tier.name}
      </h3>
      <p
        className={`relative mt-2 text-sm leading-6 ${
          isHighlighted ? "text-off-white/85" : "text-muted-gold"
        }`}
      >
        {tier.description}
      </p>

      <div className="relative mt-6 flex items-baseline gap-1.5">
        <span className="text-off-white text-4xl font-semibold tracking-tight">
          {tier.price}
        </span>
        {tier.cadence && (
          <span
            className={`text-sm ${
              isHighlighted ? "text-off-white/70" : "text-muted-gold"
            }`}
          >
            {tier.cadence}
          </span>
        )}
      </div>

      <a
        href="#"
        className={`relative mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3.5 text-sm font-medium transition-colors ${
          isHighlighted
            ? "bg-gold-main text-primary-black hover:bg-gold-light"
            : "bg-primary-black/60 border-gold-main/20 text-off-white hover:bg-gold-main/10 hover:border-gold-main/40 border"
        }`}
      >
        {tier.ctaIcon === "mail" && <MailIcon className="h-4 w-4" />}
        {tier.cta}
      </a>

      <div className="relative mt-6 space-y-2.5 text-sm">
        <div className="text-off-white/85 flex items-center gap-3">
          <SeatIcon
            className={`h-4 w-4 ${
              isHighlighted ? "text-off-white/80" : "text-muted-gold"
            }`}
          />
          <span>
            <span className="font-medium">{tier.seats}</span>{" "}
            <span
              className={isHighlighted ? "text-off-white/70" : "text-muted-gold"}
            >
              seats available
            </span>
          </span>
        </div>
        <div className="text-off-white/85 flex items-center gap-3">
          <CloudIcon
            className={`h-4 w-4 ${
              isHighlighted ? "text-off-white/80" : "text-muted-gold"
            }`}
          />
          <span>
            <span className="font-medium">{tier.storage}</span>{" "}
            <span
              className={isHighlighted ? "text-off-white/70" : "text-muted-gold"}
            >
              of cloud storage
            </span>
          </span>
        </div>
      </div>

      <div className="relative mt-6">
        <div
          className={`flex items-center gap-3 ${
            tier.inheritsLabel ? "" : "opacity-0"
          }`}
        >
          <span
            className={`h-px flex-1 ${
              isHighlighted ? "bg-off-white/15" : "bg-gold-main/15"
            }`}
          />
          <span
            className={`text-[11px] font-medium uppercase tracking-[0.18em] ${
              isHighlighted ? "text-off-white/70" : "text-muted-gold"
            }`}
          >
            {tier.inheritsLabel ?? "—"}
          </span>
          <span
            className={`h-px flex-1 ${
              isHighlighted ? "bg-off-white/15" : "bg-gold-main/15"
            }`}
          />
        </div>
      </div>

      <ul className="relative mt-5 space-y-3 text-sm">
        {tier.features.map((feature) => {
          const label = typeof feature === "string" ? feature : feature.label;
          const badge = typeof feature === "string" ? null : feature.badge;
          return (
            <li
              key={label}
              className="text-off-white/90 flex items-center gap-3"
            >
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                  isHighlighted
                    ? "bg-off-white/15 text-off-white"
                    : "bg-gold-main/15 text-gold-main"
                }`}
              >
                <CheckIcon className="h-3 w-3" />
              </span>
              <span className="font-medium">{label}</span>
              {badge && (
                <span
                  className={`ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    isHighlighted
                      ? "bg-primary-black/40 text-off-white"
                      : "bg-gold-main/10 text-gold-light"
                  }`}
                >
                  <SparkleIcon className="h-3 w-3" />
                  {badge}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
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
