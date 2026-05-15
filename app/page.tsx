import { Hero } from "@/components/sections/Hero";
import { LogoCloud } from "@/components/sections/LogoCloud";
import { Features } from "@/components/sections/Features";
import { Comparison } from "@/components/sections/Comparison";
import { SimpleProcess } from "@/components/sections/SimpleProcess";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <main id="main" className="relative">
      <Hero />
      <LogoCloud />
      <Features />
      <Comparison />
      <SimpleProcess />
      <CTA />
      <Testimonials />
      <FAQ />
    </main>
  );
}
