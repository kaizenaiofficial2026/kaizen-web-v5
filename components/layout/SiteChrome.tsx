"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isBookingPage = pathname === "/book-demo";

  return (
    <>
      {!isBookingPage && <Header />}
      {children}
      {!isBookingPage && <Footer />}
      {!isBookingPage && <ChatWidget />}
    </>
  );
}
