export interface SkillItem {
  name: string;
  category: string;
  description: string;
  files: number;
  icon: string;
}

export const SKILL_CATEGORIES = [
  "AI / LLM Core",
  "Web Search & Content",
  "Document Generation",
  "Prompt Engineering",
  "Skill Management",
  "Web Development",
  "Animation & Visual",
  "Content & Marketing",
  "Business & Research",
  "Agent Frameworks",
  "Analysis & Thinking",
  "Data Visualization",
  "Utilities",
];

export const CATEGORY_ICONS: Record<string, string> = {
  "AI / LLM Core": "\ud83e\udde0",
  "Web Search & Content": "\ud83d\udd0d",
  "Document Generation": "\ud83d\udcc4",
  "Prompt Engineering": "\ud83d\udca1",
  "Skill Management": "\u2699\ufe0f",
  "Web Development": "\ud83d\udcbb",
  "Animation & Visual": "\u2728",
  "Content & Marketing": "\ud83d\udce2",
  "Business & Research": "\ud83d\udcca",
  "Agent Frameworks": "\ud83e\udd16",
  "Analysis & Thinking": "\ud83e\udde9",
  "Data Visualization": "\ud83d\udcc8",
  "Utilities": "\ud83d\udd27",
};

export const CATEGORY_COLORS: Record<string, string> = {
  "AI / LLM Core": "#a78bfa",
  "Web Search & Content": "#38bdf8",
  "Document Generation": "#f97316",
  "Prompt Engineering": "#eab308",
  "Skill Management": "#6B7280",
  "Web Development": "#22c55e",
  "Animation & Visual": "#ec4899",
  "Content & Marketing": "#f43f5e",
  "Business & Research": "#3b82f6",
  "Agent Frameworks": "#06b6d4",
  "Analysis & Thinking": "#d946ef",
  "Data Visualization": "#10b981",
  "Utilities": "#78716c",
};

export const SKILLS_CATALOG: SkillItem[] = [
  // AI / LLM Core
  { name: "LLM", category: "AI / LLM Core", description: "LLM chat completions via z-ai-web-dev-sdk", files: 3, icon: "\ud83e\udde0" },
  { name: "VLM", category: "AI / LLM Core", description: "Vision-based AI chat \u2014 image understanding", files: 3, icon: "\ud83e\udde0" },
  { name: "ASR", category: "AI / LLM Core", description: "Speech-to-text transcription", files: 3, icon: "\ud83e\udde0" },
  { name: "TTS", category: "AI / LLM Core", description: "Text-to-speech \u2014 multiple voices, adjustable speed", files: 3, icon: "\ud83e\udde0" },
  { name: "image-generation", category: "AI / LLM Core", description: "AI image creation from text descriptions", files: 3, icon: "\ud83e\udde0" },
  { name: "image-edit", category: "AI / LLM Core", description: "AI image modification and editing", files: 3, icon: "\ud83e\udde0" },
  { name: "image-understand", category: "AI / LLM Core", description: "Image analysis, OCR, object detection", files: 3, icon: "\ud83e\udde0" },
  { name: "video-generation", category: "AI / LLM Core", description: "AI video generation from text/images", files: 3, icon: "\ud83e\udde0" },
  { name: "video-understand", category: "AI / LLM Core", description: "Video content analysis and scene description", files: 3, icon: "\ud83e\udde0" },

  // Web Search & Content
  { name: "web-search", category: "Web Search & Content", description: "Web search via z-ai-web-dev-sdk", files: 3, icon: "\ud83d\udd0d" },
  { name: "web-reader", category: "Web Search & Content", description: "Web page content extraction", files: 3, icon: "\ud83d\udd0d" },
  { name: "agent-browser", category: "Web Search & Content", description: "Headless browser automation", files: 1, icon: "\ud83d\udd0d" },
  { name: "multi-search-engine", category: "Web Search & Content", description: "8 CN search engines with advanced operators", files: 7, icon: "\ud83d\udd0d" },
  { name: "contentanalysis", category: "Web Search & Content", description: "Content extraction from videos, podcasts, articles", files: 3, icon: "\ud83d\udd0d" },
  { name: "ai-news-collectors", category: "Web Search & Content", description: "AI news aggregation and trending", files: 3, icon: "\ud83d\udd0d" },
  { name: "qingyan-research", category: "Web Search & Content", description: "Deep web research + HTML report generation", files: 2, icon: "\ud83d\udd0d" },
  { name: "finance", category: "Web Search & Content", description: "Financial data \u2014 stocks, market analysis", files: 2, icon: "\ud83d\udd0d" },

  // Document Generation
  { name: "docx", category: "Document Generation", description: "Word document creation and editing", files: 85, icon: "\ud83d\udcc4" },
  { name: "pdf", category: "Document Generation", description: "PDF generation \u2014 cover, TOC, charts, forms", files: 44, icon: "\ud83d\udcc4" },
  { name: "xlsx", category: "Document Generation", description: "Excel spreadsheets \u2014 charts, formulas, VBA", files: 22, icon: "\ud83d\udcc4" },
  { name: "ppt", category: "Document Generation", description: "PowerPoint presentations \u2014 Beamer, LaTeX", files: 75, icon: "\ud83d\udcc4" },
  { name: "pptx", category: "Document Generation", description: "PPTX creation/editing with tracked changes", files: 57, icon: "\ud83d\udcc4" },

  // Prompt Engineering
  { name: "promptc", category: "Prompt Engineering", description: "AI Prompt Engineering Operating System", files: 1, icon: "\ud83d\udca1" },
  { name: "chain-of-thought", category: "Prompt Engineering", description: "Chain-of-thought reasoning", files: 1, icon: "\ud83d\udca1" },
  { name: "socratic-method", category: "Prompt Engineering", description: "Socratic questioning for deep analysis", files: 1, icon: "\ud83d\udca1" },
  { name: "explained-code", category: "Prompt Engineering", description: "Beginner-friendly code explanations", files: 1, icon: "\ud83d\udca1" },

  // Skill Management
  { name: "skill-creator", category: "Skill Management", description: "Create, modify, eval, benchmark skills", files: 18, icon: "\u2699\ufe0f" },
  { name: "skill-finder", category: "Skill Management", description: "AI agent skills discovery and evaluation", files: 1, icon: "\u2699\ufe0f" },
  { name: "skill-finder-cn", category: "Skill Management", description: "Chinese skill finder \u2014 ClawHub discovery", files: 4, icon: "\u2699\ufe0f" },
  { name: "skill-assessor", category: "Skill Management", description: "Evaluate prompt engineering skills", files: 1, icon: "\u2699\ufe0f" },
  { name: "skill-vetter", category: "Skill Management", description: "Security-first skill vetting", files: 1, icon: "\u2699\ufe0f" },

  // Web Development
  { name: "fullstack-dev", category: "Web Development", description: "Next.js 16 + TypeScript + Tailwind CSS 4", files: 1, icon: "\ud83d\udcbb" },
  { name: "coding-agent", category: "Web Development", description: "Full-stack dev agent \u2014 plan, execute, verify", files: 8, icon: "\ud83d\udcbb" },
  { name: "ui-ux-pro-max", category: "Web Development", description: "UI/UX design intelligence and implementation", files: 56, icon: "\ud83d\udcbb" },
  { name: "visual-design-foundations", category: "Web Development", description: "Typography, color, spacing, iconography", files: 4, icon: "\ud83d\udcbb" },
  { name: "web-artifacts-builder", category: "Web Development", description: "Build standalone web artifacts and widgets", files: 1, icon: "\ud83d\udcbb" },

  // Animation & Visual
  { name: "gsap-animations", category: "Animation & Visual", description: "GSAP with React, ScrollTrigger, timelines", files: 1, icon: "\u2728" },
  { name: "ai-visual-synthesis", category: "Animation & Visual", description: "Visual engineering with 8-layer architecture", files: 1, icon: "\u2728" },
  { name: "photography-ai", category: "Animation & Visual", description: "Professional visual creation framework", files: 1, icon: "\u2728" },

  // Content & Marketing
  { name: "blog-writer", category: "Content & Marketing", description: "Blog posts in distinctive writing style", files: 12, icon: "\ud83d\udce2" },
  { name: "seo-content-writer", category: "Content & Marketing", description: "SEO-optimized content creation", files: 4, icon: "\ud83d\udce2" },
  { name: "content-strategy", category: "Content & Marketing", description: "Content marketing strategy", files: 2, icon: "\ud83d\udce2" },
  { name: "marketing-mode", category: "Content & Marketing", description: "23 marketing skills combined", files: 5, icon: "\ud83d\udce2" },
  { name: "social-content-pillars", category: "Content & Marketing", description: "Social media content pillar strategy", files: 1, icon: "\ud83d\udce2" },
  { name: "podcast-generate", category: "Content & Marketing", description: "Podcast generation from content or web", files: 7, icon: "\ud83d\udce2" },

  // Business & Research
  { name: "market-research-reports", category: "Business & Research", description: "McKinsey-style market research reports", files: 8, icon: "\ud83d\udcca" },
  { name: "jtbd-research", category: "Business & Research", description: "Jobs to be Done product research", files: 1, icon: "\ud83d\udcca" },
  { name: "interview-designer", category: "Business & Research", description: "Resume analysis + interview design", files: 5, icon: "\ud83d\udcca" },
  { name: "storyboard-manager", category: "Business & Research", description: "Story planning, character dev, timeline", files: 7, icon: "\ud83d\udcca" },
  { name: "stock-analysis-skill", category: "Business & Research", description: "Stock analysis \u2014 technical/fundamental", files: 10, icon: "\ud83d\udcca" },
  { name: "gumroad-pipeline", category: "Business & Research", description: "Gumroad product pipeline management", files: 1, icon: "\ud83d\udcca" },
  { name: "get-fortune-analysis", category: "Business & Research", description: "Fortune/astrology report generation", files: 2, icon: "\ud83d\udcca" },

  // Agent Frameworks
  { name: "mcp-builder", category: "Agent Frameworks", description: "MCP server builder for Claude Desktop", files: 1, icon: "\ud83e\udd16" },
  { name: "deployment-manager", category: "Agent Frameworks", description: "Deployment pipeline management", files: 1, icon: "\ud83e\udd16" },
  { name: "simulation-sandbox", category: "Agent Frameworks", description: "Code simulation and testing", files: 1, icon: "\ud83e\udd16" },
  { name: "output-formatter", category: "Agent Frameworks", description: "Output format standardization", files: 1, icon: "\ud83e\udd16" },

  // Analysis & Thinking
  { name: "context-compressor", category: "Analysis & Thinking", description: "Context compression for long conversations", files: 1, icon: "\ud83e\udde9" },
  { name: "devils-advocate", category: "Analysis & Thinking", description: "Adversarial analysis \u2014 stress-test ideas", files: 1, icon: "\ud83e\udde9" },
  { name: "auto-target-tracker", category: "Analysis & Thinking", description: "Goal progress tracking with VLM", files: 1, icon: "\ud83e\udde9" },
  { name: "gift-evaluator", category: "Analysis & Thinking", description: "Gift analysis \u2014 value, authenticity, social", files: 2, icon: "\ud83e\udde9" },
  { name: "dream-interpreter", category: "Analysis & Thinking", description: "Dream interpretation \u2014 3 perspectives", files: 9, icon: "\ud83e\udde9" },

  // Data Visualization
  { name: "charts", category: "Data Visualization", description: "Charts \u2014 matplotlib, ECharts, D3, Mermaid", files: 12, icon: "\ud83d\udcc8" },

  // Utilities
  { name: "writing-plans", category: "Utilities", description: "Multi-step task planning before coding", files: 2, icon: "\ud83d\udd27" },
  { name: "mindfulness-meditation", category: "Utilities", description: "Guided meditation, streaks, reminders", files: 2, icon: "\ud83d\udd27" },
  { name: "aminer-open-academic", category: "Utilities", description: "Academic data search and paper analysis", files: 5, icon: "\ud83d\udd27" },
  { name: "web-shader-extractor", category: "Utilities", description: "Extract and port web shaders", files: 12, icon: "\ud83d\udd27" },
];

// Derived stats
export const TOTAL_SKILLS = SKILLS_CATALOG.length;
export const TOTAL_CATEGORIES = SKILL_CATEGORIES.length;
export const TOTAL_FILES = SKILLS_CATALOG.reduce((sum, s) => sum + s.files, 0);

// Category counts
export const CATEGORY_COUNTS = SKILL_CATEGORIES.map((cat) => ({
  category: cat,
  count: SKILLS_CATALOG.filter((s) => s.category === cat).length,
  icon: CATEGORY_ICONS[cat] || "\ud83d\udccc",
  color: CATEGORY_COLORS[cat] || "#6B7280",
}));
