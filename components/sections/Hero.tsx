import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-black bg-cover bg-center"
      style={{ backgroundImage: "url('/images/herobg.png')" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.34)_38%,rgba(0,0,0,0.10)_100%)] md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-black/45 md:hidden"
      />

      <div className="relative z-10 grid h-full grid-cols-1 items-center px-6 md:grid-cols-[minmax(0,560px)_minmax(0,1fr)] md:pl-20 md:pr-0">
        <div className="max-w-[560px] text-left">
          <h1 className="[font-family:var(--font-syne)] text-[clamp(44px,5vw,72px)] font-bold leading-[1.04] text-[#f1ece0]">
            <span className="block">The Future of</span>
            <span className="block py-1 font-serif text-[1.04em] font-normal italic leading-[0.96] tracking-[0.01em] text-[#C49A30] [font-kerning:normal]">
              Agentic AI,
            </span>
            <span className="block">Delivered Today.</span>
          </h1>

          <p className="mt-6 max-w-[460px] text-[15px] leading-7 text-[#A3A3A3]">
            We identify where your business is losing time, leads, or
            efficiency, then design and deliver AI automation systems that work
            across your tools 24/7.
          </p>

          <div className="mt-9 flex flex-col gap-3 md:flex-row">
            <Button
              asChild
              size="xl"
              className="w-full rounded-lg border border-[#d0a235]/65 bg-[linear-gradient(135deg,#d8a928,#b98918)] px-7 font-semibold text-black shadow-[0_0_36px_-12px_rgba(216,169,40,0.95),0_16px_42px_-28px_rgba(216,169,40,0.95),inset_0_1px_0_rgba(255,255,255,0.28)] hover:bg-[linear-gradient(135deg,#e5b83d,#c99824)] md:w-auto"
            >
              <Link href="/contact#book">
                Book Consultation
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="w-full rounded-lg border-[#b88b25]/75 bg-black/8 px-7 text-[#f1ece0] shadow-[0_0_24px_-18px_rgba(216,169,40,0.9)] hover:border-[#d0a235] hover:bg-[#c49a30]/10 hover:text-[#f1ece0] md:w-auto"
            >
              <Link href="/industries">
                Explore Industries
                <ArrowRight aria-hidden />
              </Link>
            </Button>
          </div>
        </div>

        <div aria-hidden />
      </div>
    </section>
  );
}
