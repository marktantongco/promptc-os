export interface WorkflowStep {
  a: string;
  t: string;
  items: string[];
}

export interface Workflow {
  id: number;
  cat: string;
  title: string;
  purpose: string;
  best: string;
  chain: string[];
  out: string;
  steps: WorkflowStep[];
}

export const WORKFLOWS: Workflow[] = [
  { id: 1, cat: "🎨 Design", title: "Design System Creation", purpose: "Build complete design system", best: "New products, rebrands", chain: ["Eagle","Beaver","Ant","Owl"], out: "Complete design system with tokens", steps: [
    { a: "Eagle", t: "Define long-term design vision", items: ["Brand positioning","Target audience","Competitive landscape","Design principles"] },
    { a: "Beaver", t: "Build foundational components", items: ["Color palette","Typography scale","Spacing system","Border radius scales"] },
    { a: "Ant", t: "Create component library", items: ["Buttons","Form elements","Cards","Navigation patterns"] },
    { a: "Owl", t: "Validate consistency", items: ["Component system check","Accessibility contrast","Responsive behavior"] },
  ]},
  { id: 2, cat: "🎨 Design", title: "Landing Page Design", purpose: "Create high-conversion landing page", best: "Marketing, startups", chain: ["Rabbit","Eagle","Beaver","Ant"], out: "Complete landing page", steps: [
    { a: "Rabbit", t: "Generate 10+ headline variations", items: ["Problem-aware","Solution-focused","Benefit-driven","Social proof"] },
    { a: "Eagle", t: "Structure the page", items: ["Hero section","Problem/Agitation","Solution/features","Social proof"] },
    { a: "Beaver", t: "Design each section", items: ["Hero: Hook + CTA","Features: bento grid","Testimonials","CTA: Contrast"] },
    { a: "Ant", t: "Optimize for conversion", items: ["Button placement","Form minimization","Loading states","Mobile targets"] },
  ]},
  { id: 3, cat: "🎨 Design", title: "Dashboard Design", purpose: "Build data visualization dashboard", best: "Analytics, SaaS products", chain: ["Eagle","Beaver","Dolphin","Ant"], out: "Interactive dashboard", steps: [
    { a: "Eagle", t: "Define data requirements", items: ["Key metrics and KPIs","User roles","Data refresh frequency","Export requirements"] },
    { a: "Beaver", t: "Layout the grid", items: ["12-column responsive","Widget sizing","Gutter system","Breakpoints"] },
    { a: "Dolphin", t: "Choose visualization types", items: ["KPI cards","Line charts","Bar charts","Data tables"] },
    { a: "Ant", t: "Implement interactions", items: ["Filter mechanisms","Date range selectors","Drill-down","Export functions"] },
  ]},
  { id: 4, cat: "💻 Dev", title: "Full-Stack App Development", purpose: "Build complete web application", best: "Product builds", chain: ["Eagle","Beaver","Ant","Owl"], out: "Production-ready app", steps: [
    { a: "Eagle", t: "Define product architecture", items: ["Core features","User flows","Data models","API boundaries"] },
    { a: "Beaver", t: "Set up project structure", items: ["Repository init","Dependencies","Environment setup","Linting rules"] },
    { a: "Ant", t: "Implement feature by feature", items: ["Database schema","API endpoints","Frontend components","Integration testing"] },
    { a: "Owl", t: "Review and optimize", items: ["Code quality audit","Performance profiling","Security check","Documentation"] },
  ]},
  { id: 5, cat: "💻 Dev", title: "API Design", purpose: "Design RESTful or GraphQL API", best: "Backend development", chain: ["Owl","Beaver","Ant","Dolphin"], out: "Complete API specification", steps: [
    { a: "Owl", t: "Analyze requirements", items: ["Resource identification","Relationship mapping","Authentication needs","Rate limiting"] },
    { a: "Beaver", t: "Define endpoints", items: ["HTTP methods","URL structure","Request/response schemas","Error handling"] },
    { a: "Ant", t: "Document comprehensively", items: ["OpenAPI specification","Example requests","Authentication docs","Rate limit docs"] },
    { a: "Dolphin", t: "Add advanced features", items: ["Pagination strategies","Filtering and sorting","Caching headers","Webhook support"] },
  ]},
];
