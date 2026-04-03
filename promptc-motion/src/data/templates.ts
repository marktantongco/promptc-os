export interface PromptTemplate {
  id: string;
  zone: string;
  title: string;
  prompt: string;
  tags: string[];
}

export const TEMPLATES: PromptTemplate[] = [
  { id: "act-1", zone: "activate", title: "Universal System Prompt", prompt: `You are an expert AI assistant. Follow these rules strictly:

1. Be precise and concise in your responses
2. Use structured output (markdown, code blocks, lists)
3. Ask clarifying questions when requirements are ambiguous
4. Provide working code examples when relevant
5. Explain your reasoning step-by-step for complex problems

Context: [USER CONTEXT]

Task: [USER TASK]

Output format: [DESIRED FORMAT]`, tags: ["system", "general", "starter"] },
  { id: "act-2", zone: "activate", title: "Code Review Prompt", prompt: `Review the following code for:
- Bugs and edge cases
- Performance issues
- Code style and best practices
- Security vulnerabilities
- Suggest improvements with examples

\`\`\`[LANGUAGE]
[CODE HERE]
\`\`\`

Provide feedback as a numbered list with severity levels (Critical/Warning/Info).`, tags: ["code", "review", "quality"] },
  { id: "bld-1", zone: "build", title: "Design Token Generator", prompt: `Generate a complete design token system for a [INDUSTRY] product.

Include:
- Colors: primary, secondary, accent, neutral (with shades)
- Typography: heading scale, body, caption, mono
- Spacing: 4px base grid with scale
- Border radius: sm, md, lg, xl, full
- Shadows: sm, md, lg
- Transitions: fast, normal, slow

Output as CSS custom properties and a Tailwind config snippet.`, tags: ["design", "tokens", "system"] },
  { id: "bld-2", zone: "build", title: "Component Library Prompt", prompt: `Create a React component library specification:

Project: [PROJECT NAME]
Framework: [REACT/NEXT/VUE]
Styling: [TAILWIND/CSS-IN-JS]

Components needed:
- Button (primary, secondary, ghost, sizes)
- Input (text, email, password, search)
- Card (basic, interactive, media)
- Modal/Dialog
- Toast/Notification
- Dropdown/Select
- Table (sortable, filterable)

For each component, provide:
1. Props interface (TypeScript)
2. Variants and states
3. Accessibility requirements
4. Usage example`, tags: ["components", "react", "ui-kit"] },
  { id: "pb-1", zone: "playbook", title: "Feature Planning Workflow", prompt: `Using the Animal Chain method, plan a new feature:

🦅 EAGLE — Big Picture:
- What problem does this solve?
- How does it fit the product vision?
- What are the success metrics?

🦫 BEAVER — Build Plan:
- Technical architecture
- Dependencies and integrations
- Component breakdown

🐜 ANT — Execution Steps:
1. [ ] Phase 1: Foundation
2. [ ] Phase 2: Core feature
3. [ ] Phase 3: Polish
4. [ ] Phase 4: Testing & deploy

🦉 OWL — Validation:
- Edge cases to handle
- Performance considerations
- Accessibility checklist`, tags: ["planning", "workflow", "feature"] },
  { id: "val-1", zone: "validate", title: "Prompt Quality Scorer", prompt: `Score this prompt on a 1-10 scale for each dimension:

Prompt to evaluate: [PASTE PROMPT]

Scoring criteria:
1. CLARITY (1-10): Is the intent unambiguous?
2. SPECIFICITY (1-10): Are constraints and requirements clear?
3. CONTEXT (1-10): Is sufficient background provided?
4. STRUCTURE (1-10): Is the output format defined?
5. ACTIONABILITY (1-10): Can the AI execute without guessing?

Total: /50
Grade: [A/B/C/D/F]

Improvement suggestions:
- [List specific improvements]`, tags: ["quality", "scoring", "improve"] },
  { id: "meta-1", zone: "meta", title: "Meta-Prompt Generator", prompt: `Generate an optimized prompt for the following task:

Original request: [USER REQUEST]

Create a prompt that:
1. Uses role-based framing
2. Includes clear constraints
3. Defines output format
4. Provides examples where helpful
5. Handles edge cases

Output the optimized prompt in a code block, ready to copy-paste.

Then explain:
- Why each section was added
- What improvements were made
- How the prompt could be further customized`, tags: ["meta", "generator", "optimize"] },
  { id: "str-1", zone: "strategy", title: "Product Roadmap Generator", prompt: `Create a product roadmap for:

Product: [PRODUCT NAME]
Stage: [IDEA/MVP/GROWTH/SCALE]
Timeline: [3/6/12 months]

Generate:
1. Vision statement (1 sentence)
2. Target user personas (2-3)
3. Key features by quarter
4. Technical milestones
5. Growth metrics and KPIs
6. Risk assessment
7. Resource requirements

Format as a structured markdown document with tables.`, tags: ["roadmap", "strategy", "product"] },
];
