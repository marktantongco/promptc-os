"use client";

import { useState } from "react";
import { WEB_VARS, DOLPHIN_C, AESTHETIC_KEYWORDS } from "@/lib/data";
import { ZoneCard } from "@/components/shared/ZoneCard";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { CodeBlock } from "@/components/shared/CodeBlock";
import { Pill } from "@/components/shared/Pill";

const AESTHETICS = [
  "glassmorphism", "neo-brutalism", "kinetic typography", "bento grid",
  "dark-mode native", "neon accent", "liquid gradient", "editorial layout",
  "claymorphism", "aurora gradient", "minimal + high-contrast",
];

const FRAMEWORKS = ["Next.js + Tailwind", "React + Vite", "SvelteKit", "Astro + Tailwind", "Vue + Nuxt"];

export function WebAppGenerator() {
  const [projectDesc, setProjectDesc] = useState("");
  const [audience, setAudience] = useState("");
  const [framework, setFramework] = useState(FRAMEWORKS[0]);
  const [persona, setPersona] = useState("");
  const [selectedAesthetics, setSelectedAesthetics] = useState<string[]>([]);
  const [concept, setConcept] = useState("");

  const toggleAesthetic = (a: string) => {
    setSelectedAesthetics((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };

  const generatedPrompt = `You are a senior full-stack developer and product designer.

ROLE: Senior full-stack developer + product designer
GOAL: ${projectDesc || "[Describe your app in one sentence]"}
AUDIENCE: ${audience || "[Define your target audience]"}
PERSONA: ${persona ? `${WEB_VARS.find((v) => v.id === persona)?.label || persona} — ${WEB_VARS.find((v) => v.id === persona)?.desc}` : "[Choose a developer persona]"}
CREATIVE CONCEPT: ${concept || "[Optional: creative interaction concept]"}

FUNCTIONAL REQUIREMENTS
- Dynamic UI components
- Mobile-first responsive layout
- Interactive sections with user feedback
- Modular, reusable component architecture

UI/UX DESIGN LANGUAGE
${selectedAesthetics.length > 0
    ? selectedAesthetics.map((a) => `- ${a}`).join("\n")
    : "- [Select aesthetic keywords below]"
  }

TECHNICAL STACK
- Framework: ${framework}
- Styling: Tailwind CSS
- Animation: Framer Motion or GSAP
- Components: shadcn/ui
- Accessible semantic HTML

OUTPUT FORMAT
Generate:
1. Project folder structure
2. Full source code (all files)
3. Instructions to run locally
4. Key component explanations

CONSTRAINTS
- Mobile-first always
- WCAG AA accessibility minimum
- 60fps animation budget
- No placeholder lorem ipsum content
- Avoid SaaS clichés

AESTHETIC LOCK
dark-mode native | ${selectedAesthetics.join(" | ") || "[select aesthetics]"} | typography-first | hierarchy clear`;

  return (
    <div className="space-y-4">
      <SectionLabel color="#FF4FD8">WEB APP PROMPT GENERATOR</SectionLabel>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ZoneCard accent="#FF4FD8">
          <label className="text-xs font-semibold block mb-1.5" style={{ color: "#FF4FD8" }}>Project Description</label>
          <textarea
            value={projectDesc}
            onChange={(e) => setProjectDesc(e.target.value)}
            placeholder="Describe your app in one sentence..."
            rows={2}
            className="w-full px-3 py-2 rounded text-sm outline-none resize-y"
            style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)", color: "#d4d4d8", fontFamily: "'DM Sans', sans-serif" }}
          />
        </ZoneCard>

        <ZoneCard accent="#FF4FD8">
          <label className="text-xs font-semibold block mb-1.5" style={{ color: "#FF4FD8" }}>Target Audience</label>
          <input
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g. Freelance designers, SaaS founders..."
            className="w-full px-3 py-2 rounded text-sm outline-none"
            style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)", color: "#d4d4d8", fontFamily: "'DM Sans', sans-serif" }}
          />
        </ZoneCard>

        <ZoneCard accent="#FF4FD8">
          <label className="text-xs font-semibold block mb-1.5" style={{ color: "#FF4FD8" }}>Framework</label>
          <div className="flex flex-wrap gap-1.5">
            {FRAMEWORKS.map((f) => (
              <Pill key={f} active={framework === f} color="#FF4FD8" onClick={() => setFramework(f)} className="text-[10px]">
                {f}
              </Pill>
            ))}
          </div>
        </ZoneCard>

        <ZoneCard accent="#FF4FD8">
          <label className="text-xs font-semibold block mb-1.5" style={{ color: "#FF4FD8" }}>Developer Persona</label>
          <div className="flex flex-wrap gap-1.5">
            {WEB_VARS.map((v) => (
              <Pill key={v.id} active={persona === v.id} color="#FF4FD8" onClick={() => setPersona(v.id)} className="text-[10px]">
                {v.label}
              </Pill>
            ))}
          </div>
        </ZoneCard>
      </div>

      <ZoneCard accent="#FF4FD8">
        <label className="text-xs font-semibold block mb-2" style={{ color: "#FF4FD8" }}>Aesthetic Keywords</label>
        <div className="flex flex-wrap gap-1.5">
          {AESTHETICS.map((a) => (
            <Pill key={a} active={selectedAesthetics.includes(a)} color="#FF4FD8" onClick={() => toggleAesthetic(a)} className="text-[10px]">
              {a}
            </Pill>
          ))}
        </div>
      </ZoneCard>

      <ZoneCard accent="#FF4FD8">
        <label className="text-xs font-semibold block mb-1.5" style={{ color: "#FF4FD8" }}>Creative Concept (optional)</label>
        <input
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          placeholder="e.g. AI search panel, scroll-as-navigation, skill map interface..."
          className="w-full px-3 py-2 rounded text-sm outline-none"
          style={{ background: "#0B0D10", border: "1px solid rgba(255,255,255,0.07)", color: "#d4d4d8", fontFamily: "'DM Sans', sans-serif" }}
        />
        <div className="flex flex-wrap gap-1.5 mt-2">
          {DOLPHIN_C.map((c, i) => (
            <button
              key={i}
              onClick={() => setConcept(c)}
              className="text-[10px] px-2 py-0.5 rounded"
              style={{ background: "rgba(255,255,255,0.04)", color: "#a1a1aa", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              {c}
            </button>
          ))}
        </div>
      </ZoneCard>

      <SectionLabel color="#FF4FD8">GENERATED PROMPT</SectionLabel>
      <CodeBlock code={generatedPrompt} id="webapp-gen" zone="builder" label="Web App Prompt" />
    </div>
  );
}
