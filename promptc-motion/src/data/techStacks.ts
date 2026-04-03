export interface TechStackItem {
  l: string;
  v: string;
}

export interface TechStack {
  stack: string;
  tier: string;
  color: string;
  items: TechStackItem[];
}

export const TECH_STACKS: TechStack[] = [
  { stack: "Next.js Full-Stack", tier: "Production", color: "#22c55e", items: [
    { l: "Framework", v: "Next.js 15 (App Router)" }, { l: "Language", v: "TypeScript 5.x" }, { l: "Styling", v: "Tailwind CSS 4" },
    { l: "UI Kit", v: "shadcn/ui" }, { l: "Animation", v: "Framer Motion" }, { l: "ORM", v: "Prisma / Drizzle" },
    { l: "Auth", v: "NextAuth.js / Clerk" }, { l: "Deploy", v: "Vercel / Docker" }
  ]},
  { stack: "AI + LLM App", tier: "Advanced", color: "#FFB000", items: [
    { l: "Core", v: "Next.js + FastAPI" }, { l: "LLM SDK", v: "OpenAI / Anthropic" }, { l: "Vector DB", v: "Pinecone / pgvector" },
    { l: "Embeddings", v: "text-embedding-3" }, { l: "Streaming", v: "SSE / WebSocket" }, { l: "UI", v: "React + Tailwind" },
    { l: "Caching", v: "Redis / Upstash" }, { l: "Deploy", v: "Vercel + Railway" }
  ]},
  { stack: "SaaS MVP", tier: "Production", color: "#22c55e", items: [
    { l: "Frontend", v: "Next.js 15 + Tailwind" }, { l: "Backend", v: "Supabase" }, { l: "Payments", v: "Stripe" },
    { l: "Email", v: "Resend / SendGrid" }, { l: "Analytics", v: "PostHog" }, { l: "Errors", v: "Sentry" },
    { l: "CI/CD", v: "GitHub Actions" }, { l: "Deploy", v: "Vercel" }
  ]},
  { stack: "Mobile App", tier: "Production", color: "#22c55e", items: [
    { l: "Framework", v: "React Native / Expo" }, { l: "Language", v: "TypeScript" }, { l: "Navigation", v: "Expo Router" },
    { l: "State", v: "Zustand + React Query" }, { l: "Backend", v: "Supabase" }, { l: "Push", v: "Expo Notifications" },
    { l: "Payments", v: "RevenueCat" }, { l: "Deploy", v: "EAS / TestFlight" }
  ]},
  { stack: "Content / Blog", tier: "Simple", color: "#a1a1aa", items: [
    { l: "Framework", v: "Next.js 15 (SSG)" }, { l: "CMS", v: "MDX / Sanity" }, { l: "Styling", v: "Tailwind CSS" },
    { l: "SEO", v: "Metadata API" }, { l: "Analytics", v: "Plausible" }, { l: "Comments", v: "Giscus" },
    { l: "Newsletter", v: "Resend" }, { l: "Deploy", v: "Vercel" }
  ]},
  { stack: "Dashboard / Admin", tier: "Production", color: "#22c55e", items: [
    { l: "Framework", v: "Next.js + React" }, { l: "Charts", v: "Recharts / Tremor" }, { l: "Tables", v: "TanStack Table" },
    { l: "State", v: "React Query + Zustand" }, { l: "Backend", v: "Supabase / tRPC" }, { l: "Auth", v: "Clerk / NextAuth" },
    { l: "Export", v: "PapaParse / xlsx" }, { l: "Deploy", v: "Vercel" }
  ]},
];
