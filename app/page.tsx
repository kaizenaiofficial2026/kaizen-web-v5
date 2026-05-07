import { HeroBackground } from "./components/HeroBackground";

export default function Home() {
  return (
    <div className="bg-primary-black text-off-white relative flex h-screen max-h-screen w-screen flex-col overflow-hidden">
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
    </div>
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
