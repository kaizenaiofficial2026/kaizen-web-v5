"use client";

import type { ReactNode } from "react";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ConsultationModal } from "@/components/contact/ConsultationModal";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ConsultationModal />
      <ChatWidget />
    </>
  );
}
