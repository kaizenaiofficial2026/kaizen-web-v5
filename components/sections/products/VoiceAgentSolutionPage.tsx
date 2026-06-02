"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  BrainCircuit,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  ContactRound,
  DatabaseZap,
  FileText,
  Headphones,
  Languages,
  LayoutDashboard,
  ListChecks,
  MapPin,
  Mic,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  PhoneOutgoing,
  Play,
  Radio,
  RefreshCcw,
  Route,
  Sparkles,
  TicketCheck,
  Users,
  Volume2,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { FadeUp } from "@/components/motion/FadeUp";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { Container } from "@/components/primitives/Container";
import { MarketingSection } from "@/components/primitives/MarketingPage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { cn } from "@/lib/utils";

type FeatureCard = {
  title: string;
  shortText: string;
  explanation: string;
  example: string;
  Icon: LucideIcon;
};

type VoicePrompt = {
  question: string;
  answer: string;
};

type OutcomeCard = {
  metric: string;
  title: string;
  text: string;
};

const trustChips = [
  "Human-like conversations",
  "Inbound + outbound calls",
  "Trained on your business",
  "Multi-language support",
];

const featureCards: FeatureCard[] = [
  {
    title: "Answer Incoming Calls",
    shortText: "Never leave callers waiting in silence.",
    explanation:
      "The AI answers inbound calls instantly, handles customer questions, understands the caller's intent, and guides them toward the right next step.",
    example:
      "A customer calls after hours asking about availability. The AI answers immediately and helps them instead of letting the call go missed.",
    Icon: PhoneIncoming,
  },
  {
    title: "Missed-Call Recovery",
    shortText: "Call or message missed leads back automatically.",
    explanation:
      "If a call is missed, the AI can follow up automatically through WhatsApp or callback workflows so warm leads do not go cold.",
    example:
      "A customer calls while your team is busy. The AI follows up and asks how it can help before the customer contacts a competitor.",
    Icon: PhoneForwarded,
  },
  {
    title: "Appointment Booking",
    shortText: "Book confirmed slots during the call.",
    explanation:
      "The AI checks live calendar availability, captures appointment details, secures the slot, and logs the booking without manual staff input.",
    example:
      "A caller asks for an appointment tomorrow. The AI checks available times and books the slot during the call.",
    Icon: CalendarCheck,
  },
  {
    title: "Google Calendar Sync",
    shortText: "Sync bookings in real time.",
    explanation:
      "Appointments booked by the AI are synced instantly into Google Calendar with customer name, contact number, service, date, time, and slot details.",
    example:
      "Your team opens the calendar and sees the new booking already added.",
    Icon: Clock3,
  },
  {
    title: "WhatsApp Confirmation",
    shortText: "Send booking details after the call.",
    explanation:
      "After a booking, the AI sends a WhatsApp confirmation with appointment date, time, service, price, and any important details.",
    example:
      "The customer receives a clear WhatsApp confirmation immediately after the call ends.",
    Icon: Bell,
  },
  {
    title: "Human Escalation",
    shortText: "Transfer complex calls with full context.",
    explanation:
      "When a caller needs human support, the AI can escalate with the call summary, caller intent, and conversation context already attached.",
    example:
      "A high-value caller asks a complex question. The AI routes the call to your team with context.",
    Icon: Users,
  },
  {
    title: "Call Transcript & Summary",
    shortText: "Every call logged with outcome.",
    explanation:
      "Each call is saved with a word-for-word transcript, plain English summary, caller details, duration, and outcome badge such as Booked, FAQ Answered, or Escalated.",
    example:
      "Your team can review what happened without listening to the entire call again.",
    Icon: FileText,
  },
  {
    title: "Caller Memory",
    shortText: "Recognise returning customers.",
    explanation:
      "The AI can use previous caller history, past bookings, and customer context so returning customers do not have to repeat themselves.",
    example:
      "A returning customer calls again and the AI understands their previous enquiry or booking history.",
    Icon: ContactRound,
  },
  {
    title: "Vibe Score",
    shortText: "Know if a caller is cold, warm, or hot.",
    explanation:
      "Each call receives a 0-100% intent indicator to help the business identify serious callers and prioritise follow-up.",
    example:
      "A hot caller can be flagged for immediate team attention.",
    Icon: BarChart3,
  },
  {
    title: "Call Outcome Badge",
    shortText: "See whether the call was booked, answered, or escalated.",
    explanation:
      "Every call gets a clear outcome badge such as Booked, FAQ Answered, or Escalated so your team knows what happened instantly.",
    example:
      "Instead of reading the full transcript, your team sees the call outcome immediately.",
    Icon: BadgeCheck,
  },
  {
    title: "Reschedule & Cancellation Handling",
    shortText: "Manage booking changes automatically.",
    explanation:
      "The AI can help callers reschedule or cancel appointments through voice or WhatsApp follow-up.",
    example:
      "A customer calls to move an appointment. The AI checks availability and updates the booking flow.",
    Icon: RefreshCcw,
  },
  {
    title: "Live Appointment Board",
    shortText: "Manage bookings by date and status.",
    explanation:
      "The dashboard shows every appointment with name, contact, service, slot, date, time, and booking status.",
    example:
      "Your team can see today's bookings without searching through call logs.",
    Icon: LayoutDashboard,
  },
  {
    title: "Customer Directory",
    shortText: "Store caller history in one place.",
    explanation:
      "Every caller profile includes contact details, call history, previous bookings, upcoming appointments, and follow-up activity.",
    example:
      "A receptionist can quickly see who called and what they needed.",
    Icon: ContactRound,
  },
  {
    title: "Repeat Caller Detection",
    shortText: "Flag returning callers automatically.",
    explanation:
      "The AI identifies repeat callers and connects their new call to previous history.",
    example:
      "A customer who called last week is recognised automatically.",
    Icon: PhoneIncoming,
  },
  {
    title: "Custom Voice Brain",
    shortText: "Trained on your services, pricing, FAQs, and policies.",
    explanation:
      "The AI learns your business knowledge so it can answer accurately, recommend services, explain pricing, and follow your rules.",
    example:
      "A caller asks about a service package and the AI explains it using your approved information.",
    Icon: BrainCircuit,
  },
  {
    title: "FAQ Handling",
    shortText: "Answer common questions instantly.",
    explanation:
      "The AI answers common questions about business hours, pricing, availability, location, services, and policies.",
    example:
      "A customer calls asking for your location and opening hours. The AI answers immediately.",
    Icon: Headphones,
  },
  {
    title: "Smart Service Recommendations",
    shortText: "Recommend services by need and budget.",
    explanation:
      "The AI can ask the right questions and guide callers toward the most relevant service.",
    example:
      "A caller explains their problem and the AI suggests the most suitable appointment type.",
    Icon: Sparkles,
  },
  {
    title: "Knowledge Base Updates",
    shortText: "Update business knowledge anytime.",
    explanation:
      "When services, pricing, or policies change, the AI knowledge base can be updated so future calls use the latest information.",
    example:
      "A new price or service is added and the AI can explain it correctly.",
    Icon: ListChecks,
  },
  {
    title: "Call Volume Analytics",
    shortText: "Track calls by day, week, and month.",
    explanation:
      "The dashboard tracks total calls answered today, this week, and this month so the business can understand demand.",
    example:
      "You can see whether call volume is increasing after a campaign.",
    Icon: BarChart3,
  },
  {
    title: "AI Usage Minute Tracking",
    shortText: "Monitor daily usage and limit alerts.",
    explanation:
      "Usage minutes are tracked daily with alerts such as Healthy, Approaching, or Near Limit.",
    example:
      "You can see when usage is close to the package limit.",
    Icon: Radio,
  },
  {
    title: "Peak Call Hour Heatmap",
    shortText: "Know when customers call most.",
    explanation:
      "The system shows peak call hours so businesses can understand demand patterns and staffing needs.",
    example:
      "A clinic sees most calls happen between 6 PM and 9 PM.",
    Icon: Clock3,
  },
  {
    title: "CRM Sync",
    shortText: "Push call data into your CRM.",
    explanation:
      "Call logs, appointment data, customer details, and outcomes can sync into Salesforce, HubSpot, Zoho, and other CRM systems.",
    example:
      "A new caller becomes a CRM lead without manual entry.",
    Icon: DatabaseZap,
  },
  {
    title: "Auto Support Ticket",
    shortText: "Flag unresolved calls for follow-up.",
    explanation:
      "If a call cannot be resolved, the system can create a support flag for human follow-up.",
    example:
      "A complaint is flagged so your team can respond quickly.",
    Icon: TicketCheck,
  },
  {
    title: "Multi-Location Support",
    shortText: "Separate calendars and scripts per branch.",
    explanation:
      "Businesses with multiple locations can use separate calendars, scripts, and workflows for each branch.",
    example:
      "A caller chooses the nearest branch and the AI books into that branch calendar.",
    Icon: MapPin,
  },
  {
    title: "Outbound Call Campaigns",
    shortText: "Let AI call your leads list.",
    explanation:
      "The AI can make outbound calls to leads for follow-up, reminders, or campaign workflows.",
    example:
      "The AI calls warm leads who requested a callback.",
    Icon: PhoneOutgoing,
  },
  {
    title: "Custom Voice Persona",
    shortText: "Choose tone, name, and language.",
    explanation:
      "The business can choose the tone, identity, and speaking style of the AI voice agent.",
    example:
      "A premium clinic may use a calm, professional voice while a retail brand may use a warmer tone.",
    Icon: Volume2,
  },
  {
    title: "Multi-Language Support",
    shortText: "Support callers in multiple languages.",
    explanation:
      "Multi-language support is available on request so callers can be helped in the language they are comfortable with.",
    example:
      "A caller asks in Sinhala or Tamil and receives support without waiting for a specific staff member.",
    Icon: Languages,
  },
];

const visibleFeatureCards = featureCards.slice(0, 8);
const expandableFeatureCards = featureCards.slice(8);
const featureGridClassName =
  "grid gap-3 min-[380px]:grid-cols-2 sm:gap-4 lg:grid-cols-4";

const voicePrompts: VoicePrompt[] = [
  {
    question: "Can you book me tomorrow?",
    answer:
      "Yes. I can check the available slots and reserve one for you now.",
  },
  {
    question: "Do you have pricing?",
    answer:
      "Yes. I can explain the pricing for the service you need and help choose the right option.",
  },
  {
    question: "Can I speak to someone?",
    answer:
      "Yes. I can send this to the team with your call summary and contact details.",
  },
  {
    question: "What services do you offer?",
    answer:
      "I can walk you through the services and recommend the best fit based on what you need.",
  },
  {
    question: "Can you call me back?",
    answer:
      "Yes. I can capture your callback reason, preferred time, and contact number.",
  },
  {
    question: "Do you support Sinhala?",
    answer:
      "Multi-language support can be configured for the languages your customers use most.",
  },
  {
    question: "Can you send the location?",
    answer:
      "Yes. I can send the location and any arrival instructions after the call.",
  },
  {
    question: "Is anyone available now?",
    answer:
      "I can check availability and either book a slot or escalate this to the team.",
  },
];

const flowSteps = [
  { label: "Customer calls", Icon: PhoneCall },
  { label: "AI answers instantly", Icon: Zap },
  { label: "Understands caller intent", Icon: Mic },
  { label: "Answers questions or recommends service", Icon: Headphones },
  { label: "Checks calendar availability", Icon: CalendarCheck },
  { label: "Books, qualifies, or escalates", Icon: Route },
  { label: "Sends WhatsApp confirmation", Icon: Bell },
  { label: "Logs transcript, summary, and outcome", Icon: FileText },
  { label: "Syncs to dashboard, calendar, and CRM", Icon: DatabaseZap },
];

const outcomeCards: OutcomeCard[] = [
  {
    metric: "Instant",
    title: "Inbound call answering",
    text: "Customers are answered before they move to a competitor.",
  },
  {
    metric: "24/7/365",
    title: "Always-on call coverage",
    text: "Handle calls after hours, weekends, and holidays.",
  },
  {
    metric: "~1,000",
    title: "Simultaneous calls supported",
    text: "Scale call volume without dropping quality.",
  },
  {
    metric: "0",
    title: "Hold-time experience",
    text: "No customer waits in silence for a busy team member.",
  },
  {
    metric: "Live",
    title: "Calendar booking",
    text: "Check availability and secure appointments during the call.",
  },
  {
    metric: "Auto",
    title: "WhatsApp confirmation",
    text: "Send appointment details after the call.",
  },
  {
    metric: "100%",
    title: "Call visibility",
    text: "Transcript, summary, caller details, and outcome logged.",
  },
  {
    metric: "Tracked",
    title: "Performance reporting",
    text: "Review calls, bookings, usage, outcomes, and peak hours.",
  },
];

const faqs = [
  {
    q: "Does the AI sound human?",
    a: "Yes. The voice agent is designed for natural, human-like conversations. It speaks clearly, listens to the caller, and responds based on your business knowledge.",
  },
  {
    q: "Can it answer inbound and make outbound calls?",
    a: "Yes. It can answer inbound calls and, where configured, run outbound call campaigns for follow-ups, reminders, or lead lists.",
  },
  {
    q: "Can it transfer calls to my team?",
    a: "Yes. When the AI detects a complex request, complaint, or high-value caller, it can escalate with the conversation context attached.",
  },
  {
    q: "Can it speak multiple languages?",
    a: "Multi-language support is available on request. The agent can be configured for the languages your customers use most.",
  },
  {
    q: "Can it book appointments?",
    a: "Yes. The AI can check live Google Calendar availability, secure the slot, log the booking, and send WhatsApp confirmation.",
  },
  {
    q: "What if the AI does not know the answer?",
    a: "It can escalate the call or create a support flag so your team can follow up with the caller.",
  },
  {
    q: "Where do call records go?",
    a: "Calls are logged in the dashboard with caller number, date, duration, transcript, summary, and outcome.",
  },
  {
    q: "Can it connect to our CRM?",
    a: "Yes. Call logs, appointments, customer details, and outcomes can sync into tools such as Salesforce, HubSpot, Zoho, and other CRM systems.",
  },
];

function PhoneCallMockup() {
  const [activePrompt, setActivePrompt] = useState(voicePrompts[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (speechTimer.current) {
        window.clearTimeout(speechTimer.current);
      }
    };
  }, []);

  function handlePromptClick(prompt: VoicePrompt) {
    if (speechTimer.current) {
      window.clearTimeout(speechTimer.current);
    }

    setActivePrompt(prompt);
    setIsSpeaking(true);
    speechTimer.current = window.setTimeout(() => {
      setIsSpeaking(false);
      speechTimer.current = null;
    }, 2600);
  }

  return (
    <div className="relative mx-auto w-full max-w-[330px]">
      <div
        aria-hidden
        className="absolute -inset-10 rounded-full bg-primary/18 blur-3xl"
      />
      <div className="relative rounded-[2.6rem] border border-white/12 bg-[#050504] p-2.5 shadow-[0_40px_120px_-54px_rgba(201,160,61,0.9),inset_0_1px_0_rgba(255,255,255,0.16)]">
        <div className="relative h-[610px] max-h-[calc(100dvh-7rem)] overflow-hidden rounded-[2.1rem] border border-white/10 bg-[linear-gradient(180deg,rgba(23,20,13,0.98),rgba(5,5,4,0.98))]">
          <div className="absolute left-1/2 top-2 z-20 h-7 w-24 -translate-x-1/2 rounded-full bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_8%,rgba(201,160,61,0.26),transparent_68%)]"
          />
          <div
            aria-hidden
            className="absolute inset-x-8 top-28 h-64 rounded-full bg-primary/8 blur-3xl"
          />

          <div className="relative z-10 flex h-10 items-end justify-between px-7 pb-1.5 text-[11px] font-semibold text-foreground/84">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-4 rounded-full bg-foreground/70" />
              <span className="h-2.5 w-4 rounded-sm border border-foreground/70" />
            </span>
          </div>

          <div className="relative z-10 flex h-[570px] flex-col px-4 pb-4 pt-4">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.055] px-3 py-2 text-left backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-primary/24 bg-primary/12 text-primary">
                  <Mic className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-none text-foreground">
                    Kaizen Voice Agent
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Tap a question
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                <Radio
                  className={cn("h-3 w-3", isSpeaking && "animate-pulse")}
                  aria-hidden
                />
                Live
              </span>
            </div>

            <div className="relative flex flex-1 flex-col items-center justify-center py-4">
              <div className="relative grid h-32 w-32 place-items-center">
                <span
                  aria-hidden
                  className={cn(
                    "absolute h-32 w-32 rounded-full border border-primary/20 bg-primary/10 blur-sm",
                    isSpeaking ? "voiceOrbRingSpeaking" : "voiceOrbRingIdle",
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "absolute h-24 w-24 rounded-full border border-white/10 bg-[radial-gradient(circle_at_34%_28%,rgba(255,255,255,0.62),rgba(201,160,61,0.72)_28%,rgba(104,79,25,0.92)_66%,rgba(12,10,6,0.98)_100%)] shadow-[0_0_70px_-18px_rgba(201,160,61,1),inset_0_1px_18px_rgba(255,255,255,0.28)]",
                    isSpeaking ? "voiceOrbSpeaking" : "voiceOrbIdle",
                  )}
                />
                <span className="relative grid h-12 w-12 place-items-center rounded-full border border-white/18 bg-black/24 text-primary backdrop-blur-md">
                  <Mic className="h-5 w-5" aria-hidden />
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {voicePrompts.map((prompt) => {
                const isActive = activePrompt.question === prompt.question;

                return (
                  <button
                    key={prompt.question}
                    type="button"
                    onClick={() => handlePromptClick(prompt)}
                    className={cn(
                      "min-h-10 rounded-full border px-2.5 py-2 text-left text-[11px] font-semibold leading-tight transition",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      isActive
                        ? "border-primary/42 bg-primary/16 text-foreground shadow-[0_0_26px_-18px_rgba(201,160,61,1)]"
                        : "border-white/10 bg-white/[0.055] text-foreground/74 hover:border-primary/30 hover:bg-primary/10 hover:text-foreground",
                    )}
                  >
                    {prompt.question}
                  </button>
                );
              })}
            </div>

            <div className="mt-3 rounded-2xl border border-primary/20 bg-black/34 p-3 text-left backdrop-blur-md">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                Live transcript
              </p>
              <p className="mt-2 text-xs leading-5 text-foreground/74">
                <span className="text-muted-foreground">Customer:</span>{" "}
                &quot;{activePrompt.question}&quot;
              </p>
              <p className="mt-2 text-sm leading-5 text-foreground">
                <span className="text-primary">AI:</span> &quot;
                {activePrompt.answer}&quot;
              </p>
              <div className="mt-3 rounded-2xl border border-primary/20 bg-primary/8 p-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                  Call outcome
                </p>
                <div className="mt-2 grid gap-1.5 text-[11px] text-foreground/78">
                  <span>Intent: Appointment booking</span>
                  <span>Status: Ready to book</span>
                  <span>Next step: Confirm slot</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/16 bg-black/28 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary/84">
          <Play className="h-3 w-3" aria-hidden />
          Replaceable with demo video
        </span>
      </div>
    </div>
  );
}

function FeaturePreviewPlaceholder({ title }: { title: string }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder demo visual for ${title}`}
      className="relative grid h-64 place-items-center overflow-hidden rounded-2xl border border-primary/18 bg-[linear-gradient(145deg,rgba(201,160,61,0.12),rgba(255,255,255,0.045))] sm:h-72"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(70%_70%_at_70%_10%,rgba(201,160,61,0.26),transparent_62%)]"
      />
      <div className="relative z-10 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-primary/24 bg-primary/12 text-primary">
          <Play className="h-6 w-6" aria-hidden />
        </span>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Demo visual will be added here
        </p>
      </div>
    </div>
  );
}

function VoiceFeatureCard({
  feature,
  onSelect,
}: {
  feature: FeatureCard;
  onSelect: (feature: FeatureCard) => void;
}) {
  const Icon = feature.Icon;

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onSelect(feature)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(feature);
        }
      }}
      className="group relative h-full min-h-[170px] cursor-pointer overflow-hidden p-3 transition-colors hover:border-primary/38 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background min-[380px]:p-4 sm:min-h-[220px] sm:p-5"
    >
      <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-primary/18 bg-primary/8 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-primary/80 opacity-80 transition-opacity group-hover:opacity-100 sm:right-4 sm:top-4 sm:px-2.5 sm:py-1 sm:text-[10px]">
        Preview
      </span>
      <span className="grid h-10 w-10 place-items-center rounded-xl border border-primary/24 bg-primary/10 text-primary transition-transform group-hover:scale-105 sm:h-12 sm:w-12 sm:rounded-2xl">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
      </span>
      <h2 className="mt-4 pr-8 text-sm font-semibold leading-tight text-foreground sm:mt-5 sm:pr-0 sm:text-lg">
        {feature.title}
      </h2>
      <p className="mt-2 text-xs leading-5 text-muted-foreground sm:mt-3 sm:text-sm sm:leading-6">
        {feature.shortText}
      </p>
    </Card>
  );
}

function FlowDiagram() {
  return (
    <div className="mt-12">
      <div className="grid gap-4 min-[380px]:grid-cols-2 lg:grid-cols-3">
        {flowSteps.map(({ label, Icon }, index) => (
          <div key={label} className="relative">
            {index < flowSteps.length - 1 && (
              <ArrowRight
                aria-hidden
                className="absolute right-4 top-4 hidden h-4 w-4 text-primary/70 lg:block"
              />
            )}
            <div className="relative z-10 flex h-full min-h-[132px] flex-col justify-between rounded-2xl border border-primary/18 bg-card/58 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/24 bg-primary/10 text-primary shadow-[0_0_28px_-16px_rgba(201,160,61,1)]">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="text-xs font-semibold text-primary/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <span className="mt-5 text-sm font-semibold leading-tight text-foreground">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-7 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/18 bg-primary/8 px-4 py-2 text-xs font-semibold text-foreground/78">
          <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden />
          Every call becomes a trackable business outcome.
        </span>
      </div>
    </div>
  );
}

export function VoiceAgentSolutionPage() {
  const [activeFeature, setActiveFeature] = useState<FeatureCard | null>(null);
  const [showMoreFeatures, setShowMoreFeatures] = useState(false);
  const featureSectionRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  const toggleMoreFeatures = () => {
    if (showMoreFeatures) {
      setShowMoreFeatures(false);
      window.setTimeout(() => {
        featureSectionRef.current?.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }, 80);
      return;
    }

    setShowMoreFeatures(true);
  };

  return (
    <main id="main" className="relative">
      <section className="relative w-full overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_58%_at_50%_0%,rgba(201,160,61,0.22),rgba(201,160,61,0.06)_38%,rgba(0,0,0,0)_72%)]"
        />
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.82fr)]">
          <FadeUp>
            <Badge>AI Voice Agent</Badge>
            <h1 className="mt-6 text-h1 font-medium text-foreground">
              Your Best Sales Rep Never Sleeps.
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-foreground/75">
              Custom-built AI voice agents that answer inbound calls, handle
              customer enquiries, book appointments, follow up with missed
              leads, and help your business close more sales 24/7.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="xl" className="w-full sm:w-auto">
                <Link href="/demo#voice-agent-demo">
                  Speak to Our AI Agent
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
                <Link href="/book-demo">Book Strategy Call</Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
                <Link href="/pricing?type=voice">View Pricing</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {trustChips.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-primary/18 bg-card/40 px-3 py-1 text-xs font-semibold text-foreground/76"
                >
                  {item}
                </span>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <PhoneCallMockup />
          </FadeUp>
        </Container>
      </section>

      <MarketingSection className="py-16 sm:py-20 lg:py-24">
        <div ref={featureSectionRef} />
        <FadeUp>
          <SectionHeader
            eyebrow="What It Handles"
            title="What your AI Voice Agent handles for you."
            subtitle="Tap any feature to preview how the voice agent works during real customer calls."
          />
        </FadeUp>
        <StaggerGrid className={cn("mt-12", featureGridClassName)}>
          {visibleFeatureCards.map((feature) => (
            <StaggerItem key={feature.title}>
              <VoiceFeatureCard feature={feature} onSelect={setActiveFeature} />
            </StaggerItem>
          ))}
        </StaggerGrid>
        <AnimatePresence initial={false}>
          {showMoreFeatures && (
            <motion.div
              id="voice-agent-extra-features"
              initial={reducedMotion ? false : { height: 0, opacity: 0 }}
              animate={reducedMotion ? undefined : { height: "auto", opacity: 1 }}
              exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <motion.div
                initial={reducedMotion ? false : { y: 12 }}
                animate={reducedMotion ? undefined : { y: 0 }}
                exit={reducedMotion ? undefined : { y: 8 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className={cn("pt-4", featureGridClassName)}
              >
                {expandableFeatureCards.map((feature) => (
                  <VoiceFeatureCard
                    key={feature.title}
                    feature={feature}
                    onSelect={setActiveFeature}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-9 flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="xl"
            aria-expanded={showMoreFeatures}
            aria-controls="voice-agent-extra-features"
            onClick={toggleMoreFeatures}
          >
            {showMoreFeatures ? "See less" : "View more features"}
            <ArrowDown
              className={cn(
                "transition-transform",
                showMoreFeatures && "rotate-180",
              )}
              aria-hidden
            />
          </Button>
        </div>
      </MarketingSection>

      <Dialog
        open={activeFeature !== null}
        onOpenChange={(open) => {
          if (!open) setActiveFeature(null);
        }}
      >
        {activeFeature && (
          <DialogContent className="max-h-[calc(100dvh-1.5rem)] w-[calc(100vw-1.5rem)] max-w-3xl overflow-y-auto rounded-[1.5rem] border-primary/24 bg-[linear-gradient(145deg,rgba(26,22,12,0.97),rgba(9,8,6,0.99))] p-5 shadow-[0_38px_140px_-62px_rgba(201,160,61,0.86)] sm:p-7 [&>button.absolute]:right-4 [&>button.absolute]:top-4 [&>button.absolute]:grid [&>button.absolute]:h-10 [&>button.absolute]:w-10 [&>button.absolute]:place-items-center [&>button.absolute]:rounded-full [&>button.absolute]:border [&>button.absolute]:border-primary/24 [&>button.absolute]:bg-black/40 [&>button.absolute]:text-foreground">
            <FeaturePreviewPlaceholder title={activeFeature.title} />
            <DialogTitle className="text-3xl font-semibold tracking-tight text-foreground">
              {activeFeature.title}
            </DialogTitle>
            <DialogDescription className="text-base leading-7 text-muted-foreground">
              {activeFeature.explanation}
            </DialogDescription>
            <div className="rounded-2xl border border-primary/18 bg-black/26 p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                Real-world example
              </p>
              <p className="mt-3 text-sm leading-6 text-foreground/84">
                {activeFeature.example}
              </p>
            </div>
          </DialogContent>
        )}
      </Dialog>

      <MarketingSection className="py-16 sm:py-20 lg:py-24">
        <FadeUp>
          <SectionHeader
            eyebrow="Call Flow"
            title="From first ring to booked customer."
            subtitle="Every call moves through a clear AI workflow, from answering to booking, follow-up, and dashboard visibility."
          />
        </FadeUp>
        <FadeUp delay={0.1}>
          <FlowDiagram />
        </FadeUp>
      </MarketingSection>

      <MarketingSection className="py-16 sm:py-20 lg:py-24">
        <FadeUp>
          <SectionHeader
            eyebrow="Business Impact"
            title="Built to improve the calls that drive revenue."
            subtitle="Answer faster. Book more appointments. Recover missed callers. See every call outcome in one dashboard."
          />
        </FadeUp>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {outcomeCards.map((outcome) => (
            <Card key={outcome.title} className="h-full p-6">
              <p className="text-4xl font-semibold tracking-tight text-primary">
                {outcome.metric}
              </p>
              <h2 className="mt-5 text-lg font-semibold leading-tight text-foreground">
                {outcome.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {outcome.text}
              </p>
            </Card>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection
        id="faq"
        className="py-16 sm:py-20 lg:py-24"
        containerClassName="max-w-5xl"
      >
        <FadeUp>
          <SectionHeader
            eyebrow="FAQ"
            title="Voice-agent questions."
            subtitle="Short answers for how Kaizen handles calls, handoffs, languages, and bookings."
          />
        </FadeUp>
        <FadeUp delay={0.1}>
          <Accordion
            type="single"
            collapsible
            className="mx-auto mt-12 max-w-4xl space-y-4"
          >
            {faqs.map((item, index) => (
              <AccordionItem
                key={item.q}
                value={`voice-faq-${index}`}
                className="overflow-hidden rounded-2xl border border-border bg-card/42 px-5 backdrop-blur-md transition-colors hover:border-primary/28 sm:px-7"
              >
                <AccordionTrigger className="py-6 text-base normal-case tracking-normal text-foreground sm:py-7 sm:text-lg lg:text-xl">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="grid-cols-1 gap-0 pb-6 sm:grid-cols-1 sm:pb-7">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>
      </MarketingSection>

      <MarketingSection className="py-16 sm:py-20 lg:py-24">
        <Card className="gold-card overflow-hidden p-8 text-center sm:p-10 lg:p-12">
          <Badge>Next step</Badge>
          <h2 className="mx-auto mt-5 max-w-3xl text-h2 font-medium text-foreground">
            Ready to stop missing calls?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lead text-muted-foreground">
            Book a strategy call and see how a custom AI voice agent can answer
            enquiries, book appointments, recover missed leads, and update your
            team automatically.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="xl" className="w-full sm:w-auto">
              <Link href="/book-demo">
                Book Strategy Call
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
              <Link href="/pricing?type=voice">View Pricing</Link>
            </Button>
          </div>
        </Card>
      </MarketingSection>

      <style>{`
        @keyframes voiceOrbIdle {
          0%, 100% {
            transform: translateY(0) scale(1);
            filter: saturate(1);
          }
          50% {
            transform: translateY(-7px) scale(1.025);
            filter: saturate(1.12);
          }
        }
        @keyframes voiceOrbSpeaking {
          0%, 100% {
            transform: translateY(-2px) scale(1.02) rotate(0deg);
            border-radius: 48% 52% 50% 50%;
            filter: saturate(1.15);
          }
          28% {
            transform: translateY(-9px) scale(1.075) rotate(1.5deg);
            border-radius: 54% 46% 49% 51%;
            filter: saturate(1.35);
          }
          58% {
            transform: translateY(1px) scale(0.98) rotate(-1.2deg);
            border-radius: 46% 54% 55% 45%;
            filter: saturate(1.2);
          }
        }
        @keyframes voiceOrbRingIdle {
          0%, 100% {
            transform: scale(0.94);
            opacity: 0.42;
          }
          50% {
            transform: scale(1.02);
            opacity: 0.68;
          }
        }
        @keyframes voiceOrbRingSpeaking {
          0% {
            transform: scale(0.86);
            opacity: 0.72;
          }
          70% {
            transform: scale(1.18);
            opacity: 0.12;
          }
          100% {
            transform: scale(1.24);
            opacity: 0;
          }
        }
        .voiceOrbIdle {
          animation: voiceOrbIdle 4.6s ease-in-out infinite;
        }
        .voiceOrbSpeaking {
          animation: voiceOrbSpeaking 0.9s ease-in-out infinite;
        }
        .voiceOrbRingIdle {
          animation: voiceOrbRingIdle 3.8s ease-in-out infinite;
        }
        .voiceOrbRingSpeaking {
          animation: voiceOrbRingSpeaking 1.05s ease-out infinite;
        }
      `}</style>
    </main>
  );
}
