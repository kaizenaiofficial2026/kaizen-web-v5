import type { Metadata, Viewport } from "next";
import {
  DM_Sans,
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Syne,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { siteConfig } from "@/lib/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name + " — " + siteConfig.tagline,
    template: "%s — " + siteConfig.name,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "AI chatbots",
    "AI voice agents",
    "missed call recovery",
    "appointment booking automation",
    "WhatsApp chatbot",
    "Kaizen AI",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name + " — " + siteConfig.tagline,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteConfig.name + " — " + siteConfig.tagline,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name + " — " + siteConfig.tagline,
    description: siteConfig.description,
    creator: siteConfig.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0907",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        geistSans.variable,
        geistMono.variable,
        instrumentSerif.variable,
        syne.variable,
        dmSans.variable,
        "dark h-full antialiased",
      )}
    >
      <body className="bg-background text-foreground min-h-dvh font-sans">
        <ThemeProvider>
          <MotionProvider>
            <SkipLink />
            <Header />
            {children}
            <Footer />
            <ChatWidget />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
