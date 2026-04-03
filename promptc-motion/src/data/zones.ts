export interface Zone {
  id: string;
  label: string;
  sub: string;
  tier: number;
  color: string;
  desc: string;
}

export const ZONES: Zone[] = [
  { id: "activate", label: "⚡ ACTIVATE", sub: "Copy-paste to AI", tier: 1, color: "#4DFFFF", desc: "Ready-to-use prompts. Copy, paste, ship." },
  { id: "build", label: "🏗 BUILD", sub: "Reference library, Frameworks", tier: 2, color: "#FF6B00", desc: "Brand systems, templates, vocab, design tokens." },
  { id: "builder", label: "🔨 BUILDER", sub: "Interactive prompt composers", tier: 2, color: "#FF4FD8", desc: "Workflow Builder, 8-Layer Composer, Web App Gen." },
  { id: "playbook", label: "📋 PLAYBOOK", sub: "22 workflows. Step-by-step.", tier: 2, color: "#FFB000", desc: "Animal-chained workflows with checklists." },
  { id: "strategy", label: "📊 STRATEGY", sub: "Business intelligence, Monetize.", tier: 2, color: "#7C5CFF", desc: "Revenue streams, tech stacks, growth roadmap." },
  { id: "validate", label: "✅ VALIDATE", sub: "Score, lint, refine.", tier: 3, color: "#22c55e", desc: "Prompt scoring, word swaps, quality checks." },
  { id: "meta", label: "🔄 META", sub: "Optimize prompts. Self-improve.", tier: 3, color: "#38bdf8", desc: "Meta-prompt frameworks, custom generator." },
];
