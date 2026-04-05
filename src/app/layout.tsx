import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "promptc OS — AI Prompt Engineering Toolkit",
  description: "The complete AI prompt engineering operating system. 6 zones: Activate, Build, Validate, Playbook, Builder, Monetize.",
  keywords: ["prompt engineering", "AI prompts", "prompt OS", "AI toolkit"],
  authors: [{ name: "promptc" }],
  openGraph: {
    title: "promptc OS",
    description: "The complete AI prompt engineering operating system",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${bebasNeue.variable} ${dmMono.variable} ${dmSans.variable} antialiased`}
        style={{ background: "#0B0D10", color: "#FFFFFF", fontFamily: "'DM Sans', sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
