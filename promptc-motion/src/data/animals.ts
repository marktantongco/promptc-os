export interface Animal {
  name: string;
  emoji: string;
  mode: string;
  color: string;
}

export const ANIMALS: Animal[] = [
  { name: "Eagle", emoji: "🦅", mode: "Big Picture Strategy", color: "#FFB000" },
  { name: "Beaver", emoji: "🦫", mode: "Build Systems", color: "#FF6B00" },
  { name: "Ant", emoji: "🐜", mode: "Break Into Steps", color: "#FF4FD8" },
  { name: "Owl", emoji: "🦉", mode: "Deep Analysis", color: "#4DFFFF" },
  { name: "Rabbit", emoji: "🐇", mode: "Multiply Ideas", color: "#22c55e" },
  { name: "Dolphin", emoji: "🐬", mode: "Creative Solutions", color: "#38bdf8" },
  { name: "Elephant", emoji: "🐘", mode: "Cross-Field Connections", color: "#f97316" },
];
