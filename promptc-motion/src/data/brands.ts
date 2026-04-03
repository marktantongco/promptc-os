export interface BrandSystem {
  id: string;
  name: string;
  industry: string;
  primary: string;
  secondary: string;
  accent: string;
  fonts: string;
  tone: string;
}

export const BRANDS: BrandSystem[] = [
  { id: "void", name: "Void Aesthetic", industry: "Developer Tools", primary: "#0B0D10", secondary: "#14161A", accent: "#4DFFFF", fonts: "Bebas Neue, DM Sans, DM Mono", tone: "Technical, minimal, dark" },
  { id: "neon", name: "Neon Futurism", industry: "AI / Tech", primary: "#0a0a0f", secondary: "#1a1a2e", accent: "#00f0ff", fonts: "Orbitron, Space Grotesk, JetBrains Mono", tone: "Futuristic, electric, bold" },
  { id: "sunset", name: "Sunset Gradient", industry: "Creative / Design", primary: "#1a0a2e", secondary: "#2d1b69", accent: "#ff6b6b", fonts: "Sora, Inter, Fira Code", tone: "Warm, creative, expressive" },
  { id: "forest", name: "Forest Calm", industry: "Wellness / Health", primary: "#0a1a0a", secondary: "#1a2e1a", accent: "#4ade80", fonts: "Playfair Display, Lato, Source Code Pro", tone: "Natural, calming, organic" },
  { id: "ember", name: "Ember Fire", industry: "Gaming / Entertainment", primary: "#1a0a0a", secondary: "#2e1a1a", accent: "#ff4500", fonts: "Russo One, Montserrat, Roboto Mono", tone: "Intense, powerful, dynamic" },
  { id: "arctic", name: "Arctic Frost", industry: "Finance / Enterprise", primary: "#f8fafc", secondary: "#e2e8f0", accent: "#0ea5e9", fonts: "Inter, Inter Tight, IBM Plex Mono", tone: "Clean, professional, trustworthy" },
];
