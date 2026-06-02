"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Quote, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Container } from "@/components/primitives/Container";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/ui/card";
import { FadeUp } from "@/components/motion/FadeUp";

type Testimonial = {
  id: string;
  company: string;
  person: string;
  position: string;
  businessType: string;
  quote: string;
  result: string;
  initials: string;
};

// Placeholder testimonials for layout. Replace with approved client stories
// when real client quotes are ready to publish.
const testimonials: Testimonial[] = [
  {
    id: "brightsmile",
    company: "BrightSmile Dental",
    person: "Dr. Ayesha Fernando",
    position: "Clinic Owner",
    businessType: "Dental Clinic",
    quote:
      "Kaizen helped us respond to patient enquiries faster and reduce the number of missed booking opportunities during busy hours.",
    result: "Faster patient response and smoother appointment handling.",
    initials: "AF",
  },
  {
    id: "metro-properties",
    company: "MetroNest Properties",
    person: "Ruwan Jayasinghe",
    position: "Managing Partner",
    businessType: "Real Estate",
    quote:
      "The agent gives prospects a quick first response while our team is at viewings, so fewer enquiries sit unanswered.",
    result: "Cleaner enquiry capture and faster viewing coordination.",
    initials: "RJ",
  },
  {
    id: "cinnamon-table",
    company: "Cinnamon Table",
    person: "Maya Perera",
    position: "Operations Lead",
    businessType: "Hospitality",
    quote:
      "During peak hours, the AI can handle common menu and booking questions so staff can stay focused on guests.",
    result: "Quicker guest replies during busy service windows.",
    initials: "MP",
  },
  {
    id: "luxe-retail",
    company: "LuxeLane Retail",
    person: "Nadun Silva",
    position: "Founder",
    businessType: "Retail",
    quote:
      "We wanted a better way to answer product questions across WhatsApp and Instagram without adding more admin work.",
    result: "More consistent product replies across chat channels.",
    initials: "NS",
  },
  {
    id: "clearpath",
    company: "ClearPath Legal",
    person: "Shalini De Alwis",
    position: "Practice Manager",
    businessType: "Professional Services",
    quote:
      "Kaizen gives new enquiries a professional first touch and helps us route urgent conversations to the right person.",
    result: "More organized intake and handoff for new enquiries.",
    initials: "SD",
  },
];

function TestimonialCard({
  testimonial,
  onOpen,
}: {
  testimonial: Testimonial;
  onOpen: (testimonial: Testimonial) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(testimonial)}
      className="shrink-0 text-left"
    >
      <Card className="relative h-[210px] w-[300px] overflow-hidden p-5 shadow-[0_24px_80px_-56px_rgba(201,160,61,0.72)] transition-colors hover:border-primary/34 sm:w-[340px]">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_0%,rgba(201,160,61,0.14),transparent_70%)]"
        />
        <div className="relative flex h-full flex-col">
          <span className="flex items-center justify-between gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-primary/22 bg-primary/10 text-sm font-bold text-primary">
              {testimonial.initials}
            </span>
            <Quote className="h-5 w-5 text-primary/70" />
          </span>

          <p className="mt-5 line-clamp-3 text-base font-medium leading-6 text-foreground">
            “{testimonial.quote}”
          </p>

          <div className="mt-auto border-t border-primary/14 pt-4">
            <p className="text-sm font-semibold text-foreground">
              {testimonial.company}
            </p>
            <p className="mt-1 text-sm text-primary">{testimonial.result}</p>
          </div>
        </div>
      </Card>
    </button>
  );
}

export function Testimonials() {
  const reduced = useReducedMotion();
  const [activeTestimonial, setActiveTestimonial] =
    useState<Testimonial | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const dragged = useRef(false);
  const repeatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 0%, rgba(201,160,61,0.08) 0%, rgba(0,0,0,0) 70%)",
        }}
      />
      <Container size="wide">
        <FadeUp>
          <SectionHeader
            eyebrow="Testimonials"
            title={
              <>
                Compact proof from{" "}
                <span className="text-primary">real-world workflows</span>
              </>
            }
            subtitle="Short, believable examples of how AI agents improve response speed, intake, and booking flow."
          />
        </FadeUp>

        <Dialog
          open={activeTestimonial !== null}
          onOpenChange={(open) => {
            if (!open) setActiveTestimonial(null);
          }}
        >
          <div
            ref={railRef}
            className="mask-fade-x -mx-6 mt-10 cursor-grab overflow-x-auto px-6 py-2 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onPointerDown={(event) => {
              setIsDragging(true);
              dragged.current = false;
              dragStartX.current = event.clientX;
              dragStartScroll.current = railRef.current?.scrollLeft ?? 0;
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (!isDragging || !railRef.current) return;
              const delta = event.clientX - dragStartX.current;
              if (Math.abs(delta) > 6) dragged.current = true;
              railRef.current.scrollLeft = dragStartScroll.current - delta;
            }}
            onPointerUp={(event) => {
              setIsDragging(false);
              event.currentTarget.releasePointerCapture(event.pointerId);
              window.setTimeout(() => {
                dragged.current = false;
              }, 80);
            }}
            onPointerCancel={() => setIsDragging(false)}
          >
            <motion.div
              className="flex w-max gap-4 pr-6"
              animate={
                reduced || isDragging ? undefined : { x: ["0%", "-50%"] }
              }
              transition={
                reduced || isDragging
                  ? undefined
                  : { duration: 86, repeat: Infinity, ease: "linear" }
              }
            >
              {repeatedTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={`${testimonial.id}-${index}`}
                  testimonial={testimonial}
                  onOpen={(item) => {
                    if (!dragged.current) setActiveTestimonial(item);
                  }}
                />
              ))}
            </motion.div>
          </div>

          {activeTestimonial && (
            <DialogContent className="max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-2xl overflow-y-auto rounded-[1.5rem] border-primary/24 bg-[linear-gradient(145deg,rgba(26,22,12,0.96),rgba(9,8,6,0.98))] p-6 shadow-[0_36px_130px_-60px_rgba(201,160,61,0.86)] sm:p-8 [&>button.absolute]:right-4 [&>button.absolute]:top-4 [&>button.absolute]:grid [&>button.absolute]:h-10 [&>button.absolute]:w-10 [&>button.absolute]:place-items-center [&>button.absolute]:rounded-full [&>button.absolute]:border [&>button.absolute]:border-primary/24 [&>button.absolute]:bg-black/40 [&>button.absolute]:text-foreground">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_0%,rgba(201,160,61,0.16),transparent_70%)]"
              />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/18 bg-primary/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  {activeTestimonial.businessType}
                </span>

                <DialogTitle className="mt-5 text-3xl font-semibold tracking-tight text-foreground">
                  {activeTestimonial.company}
                </DialogTitle>
                <DialogDescription className="mt-2 text-sm text-muted-foreground">
                  {activeTestimonial.person}, {activeTestimonial.position}
                </DialogDescription>

                <blockquote className="mt-7 border-l border-primary/40 pl-5 text-lg leading-8 text-foreground">
                  “{activeTestimonial.quote}”
                </blockquote>

                <div className="mt-7 rounded-2xl border border-primary/18 bg-black/22 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                    Result-style statement
                  </p>
                  <p className="mt-2 text-base leading-7 text-foreground/82">
                    {activeTestimonial.result}
                  </p>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </Container>
    </section>
  );
}
