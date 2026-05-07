import {
  Bot,
  CalendarCheck,
  Languages,
  LayoutDashboard,
  PhoneCall,
  RotateCcw,
} from "lucide-react";
import type { FeatureCard } from "@/lib/types";

export const features: FeatureCard[] = [
  {
    icon: Bot,
    title: "AI Chatbots",
    description:
      "Website, WhatsApp, Instagram, and Messenger conversations that answer questions, qualify leads, and guide visitors toward booking.",
    span: "wide",
  },
  {
    icon: PhoneCall,
    title: "AI Voice Agents",
    description:
      "Natural phone agents that pick up fast, handle enquiries, book appointments, and transfer urgent calls when a human is needed.",
  },
  {
    icon: RotateCcw,
    title: "Missed-call recovery",
    description:
      "If a call slips through, your agent follows up automatically so warm leads do not disappear after hours.",
  },
  {
    icon: LayoutDashboard,
    title: "Command centre",
    description:
      "Track calls, chats, bookings, and lead alerts from a live dashboard built for operators on the move.",
  },
  {
    icon: Languages,
    title: "30+ languages",
    description:
      "Serve customers in the language they prefer across text and voice, without staffing every language manually.",
  },
  {
    icon: CalendarCheck,
    title: "Appointment booking",
    description:
      "Connect calendars and CRMs so qualified enquiries become scheduled calls, viewings, consultations, or appointments.",
  },
];
