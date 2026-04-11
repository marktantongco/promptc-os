import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "promptc OS — AI Prompt Engineering Operating System",
  description:
    "The complete prompt engineering operating system. 5 zones: Activate, Build, Validate, Playbook, Monetize. Copy-paste ready prompts, AI-powered analysis, and production frameworks.",
  keywords: [
    "prompt engineering",
    "AI prompts",
    "promptc os",
    "prompt builder",
    "AI assistant",
    "LLM",
    "prompt system",
  ],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
        style={{
          background: "#0B0D10",
          color: "#FFFFFF",
          minHeight: "100vh",
        }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
