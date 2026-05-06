import { HeroBackground } from "./components/HeroBackground";

export default function Home() {
  return (
    <div className="relative flex h-screen max-h-screen w-screen flex-col overflow-hidden bg-black text-white">
      <HeroBackground />
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/30" />
      <Grain />
      <Nav />

      <main className="relative z-10 flex flex-1 flex-col justify-end px-8 pb-12 sm:px-16">
        <h1 className="text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Kaizen AI
          <br />
          Intelligent Tools
        </h1>

        <p className="mt-6 max-w-xl text-sm leading-6 text-zinc-300 sm:text-base">
          Kaizen AI Intelligent Tools empowers users with smart automation,
          insights, and seamless productivity across digital workflows.
        </p>

        <div className="mt-10 flex items-center gap-3">
          <a
            href="#"
            className="rounded-md bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
          >
            To Try
          </a>
          <a
            href="#"
            className="rounded-md border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            Leave a request
          </a>
        </div>

        <p className="mt-6 text-xs text-zinc-400">
          No credit card needed. All data is secure.
        </p>
      </main>

      <LogoBar />
    </div>
  );
}

function Nav() {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10">
      <a
        href="#"
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-2 pl-3 pr-5 text-sm font-medium backdrop-blur-md"
      >
        <span className="grid h-5 w-5 place-items-center rounded-sm bg-white/15">
          <span className="block h-2 w-2 rounded-full bg-white" />
        </span>
        Kaizen.AI
      </a>

      <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 text-sm backdrop-blur-md md:flex">
        {["Features", "Pricing", "About", "Contact"].map((item) => (
          <a
            key={item}
            href="#"
            className="rounded-full px-4 py-1.5 text-zinc-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            {item}
          </a>
        ))}
      </nav>

      <a
        href="#"
        className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium backdrop-blur-md transition-colors hover:bg-white/10"
      >
        Get Started
      </a>
    </header>
  );
}

function LogoBar() {
  const logos = ["productboard", "Airtable", "Basecamp", "contentful", "Airwallex"];
  return (
    <div className="relative z-10 grid grid-cols-2 divide-x divide-white/10 border-t border-white/10 bg-black/40 backdrop-blur-md sm:grid-cols-5">
      {logos.map((name) => (
        <div
          key={name}
          className="flex items-center justify-center gap-2 px-4 py-6 text-base font-medium text-zinc-200 sm:text-lg"
        >
          <span className="h-3 w-3 rounded-sm bg-white/70" />
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
