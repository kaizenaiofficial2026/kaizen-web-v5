import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroSubtext =
  "We help your company identify the AI opportunities that will actually transform your business, then we build, deploy, and train your team to use the system.";

function HeroActions({
  className,
  buttonClassName = "",
}: {
  className?: string;
  buttonClassName?: string;
}) {
  return (
    <div className={className}>
      <Button
        asChild
        size="xl"
        className={`w-full rounded-lg border border-[#d0a235]/65 bg-[linear-gradient(135deg,#d8a928,#b98918)] px-7 font-semibold text-black shadow-[0_0_36px_-12px_rgba(216,169,40,0.95),0_16px_42px_-28px_rgba(216,169,40,0.95),inset_0_1px_0_rgba(255,255,255,0.28)] hover:bg-[linear-gradient(135deg,#e5b83d,#c99824)] md:w-auto ${buttonClassName}`}
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
        className={`w-full rounded-lg border-[#b88b25]/75 bg-black/8 px-7 text-[#f1ece0] shadow-[0_0_24px_-18px_rgba(216,169,40,0.9)] hover:border-[#d0a235] hover:bg-[#c49a30]/10 hover:text-[#f1ece0] md:w-auto ${buttonClassName}`}
      >
        <Link href="/industries">
          Explore Industries
          <ArrowRight aria-hidden />
        </Link>
      </Button>
    </div>
  );
}

export function Hero() {
  return (
    <>
      <section
        id="home-hero"
        className="relative h-[100svh] min-h-[780px] w-full overflow-hidden bg-black bg-cover bg-[position:82%_center] md:h-screen md:min-h-0 md:bg-[position:65%_center]"
        style={{ backgroundImage: "url('/herobg2.png')" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.34)_38%,rgba(0,0,0,0.10)_100%)] md:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.70)_0%,rgba(0,0,0,0.28)_28%,rgba(0,0,0,0.12)_50%,rgba(0,0,0,0.58)_76%,rgba(0,0,0,0.94)_100%)] md:hidden"
        />

        <div className="relative z-10 flex h-full flex-col px-6 pb-0 pt-20 md:grid md:grid-cols-[minmax(0,560px)_minmax(0,1fr)] md:items-center md:p-0 md:pl-20">
          <div className="max-w-[350px] text-left md:max-w-[560px]">
            <h1 className="[font-family:var(--font-syne)] text-[clamp(34px,9.7vw,40px)] font-bold leading-[1.01] text-[#f1ece0] [text-shadow:0_0_34px_rgba(0,0,0,0.9)] md:text-[clamp(44px,5vw,72px)] md:leading-[1.04] md:[text-shadow:none]">
              <span className="block">The Future of</span>
              <span className="block py-1 font-serif text-[1.04em] font-normal italic leading-[0.96] tracking-[0.01em] text-[#C49A30] [font-kerning:normal]">
                Agentic AI,
              </span>
              <span className="block whitespace-nowrap text-[0.9em] md:text-[1em]">
                Delivered Today.
              </span>
            </h1>

            <p className="mt-6 hidden max-w-[460px] text-[15px] leading-7 text-[#A3A3A3] md:block">
              {heroSubtext}
            </p>

            <HeroActions className="mt-9 hidden flex-col gap-3 md:flex md:flex-row" />
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.93),rgba(0,0,0,0.66)_68%,rgba(0,0,0,0))] px-6 pb-20 pt-28 md:hidden">
            <p className="mx-auto max-w-[340px] text-center text-[14px] leading-6 text-[#A3A3A3] [text-shadow:0_1px_18px_rgba(0,0,0,0.85)]">
              {heroSubtext}
            </p>
          </div>

          <div className="hidden md:block" aria-hidden />
        </div>
      </section>

      <div className="border-t border-[#C49A30]/20 bg-black px-6 pb-8 pt-5 md:hidden">
        <HeroActions
          className="mx-auto flex max-w-[390px] flex-col gap-3"
          buttonClassName="h-12 text-sm"
        />
      </div>
    </>
  );
}
