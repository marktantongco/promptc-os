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
  title: "Meta Prompt Builder — AI-Powered Prompt Engineering",
  description:
    "Analyze, critique, and refine your prompts with three expert AI methodologies. Transform average prompts into precision-engineered instructions.",
  keywords: [
    "prompt engineering",
    "AI prompts",
    "meta prompt",
    "prompt builder",
    "prompt refinement",
    "LLM",
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
          background: "#0a0a0f",
          color: "#e2e8f0",
          minHeight: "100vh",
        }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
