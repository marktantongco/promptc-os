# promptc — AI Prompt Engineering Operating System

## Context
promptc OS is a comprehensive prompt engineering toolkit that transforms how users create, refine, validate, and monetize AI prompts. It operates through 5 zones (Activate, Build, Validate, Playbook, Monetize) with 47+ modifiers, 17 templates, 6 brand systems, 7 animal thinking modes, 22 workflows, and a meta prompt builder powered by AI.

Use this skill when:
- Building or extending the promptc OS web application
- Adding new prompt modifiers, templates, or workflows
- Integrating AI-powered prompt analysis features
- Creating brand identity systems or meta-prompt methodologies
- Designing monetization content or SaaS prompt templates

## Instructions

### Zone Architecture
1. **Activate** — User's primary workspace. Contains:
   - 8 task prompts (YouTube, Coding, Business, Research, UI/UX, Image AI, Copy, Email)
   - 47 modifier prompts across 9 categories (Role, Output, Reasoning, Speed, Strategy, Hack, Data, Agent, Productivity)
   - 17 templates organized by type
   - Secret Sauce collection (CopyReadyBox for composed prompts)
   - Animal thinking mode selector
   - 8-layer prompt composer

2. **Build** — Reference library:
   - Master system prompt (10 core rules + advocacy mode)
   - Enhancement protocols (Self-Refinement Loop, Chain-of-Thought, Self-Consistency, Tweak Protocol)
   - Meta Prompt Builder with 3 AI-powered analysis templates
   - Infographic dashboard with quality metrics

3. **Validate** — Quality assurance:
   - 4-dimension quality scoring (clarity, specificity, structure, actionability)
   - 128+ lint rules with categorized checks
   - 45+ word swap suggestions
   - Vocabulary enhancer
   - Lint collection box (CopyReadyBox)

4. **Playbook** — Workflow library:
   - 22 step-by-step workflows across categories
   - Workflow chain builder
   - Layer composer
   - Web app generator
   - Before/after prompt diff

5. **Monetize** — Revenue generation:
   - Top 10 profitable prompt patterns
   - SaaS prompt templates
   - Deployment stack recommendations
   - AI tool integration guides
   - Automation workflow templates

### Meta Prompt Templates
1. **Quick Critique** — Rate 1-10, 5 improvements, 2 refined variants
2. **Structured Analysis** — Score, 3 improvements with 3 approaches each, 2 refined prompts
3. **Expert Engineering** — Dual scores, 4 improvements (context/constraints/output/hierarchy), Precision & Strategy variants, self-test, rationale tags

### Brand Systems
6 complete identity systems: powerUP, SaaS, E-commerce, Fintech, Insurance, Creative Agency. Each includes: color palette, typography, motion language, design rules, tone of voice.

### Animal Thinking Modes
7 modes with unique cognitive styles: Eagle (strategic overview), Owl (analytical depth), Ant (systematic execution), Rabbit (rapid iteration), Dolphin (creative lateral thinking), Beaver (architectural precision), Elephant (memory & wisdom). 6 pre-built chains for multi-mode reasoning.

### AI Integration Pattern
- All AI calls go through `/api/generate` (POST)
- Request: `{ prompt: string, metaType: 1|2|3 }` or `{ action: string, data: any }`
- Uses `z-ai-web-dev-sdk` server-side only
- System prompts use containment (XML tags) to prevent prompt injection
- Results rendered as markdown via ReactMarkdown

## Constraints
- Never execute the user's prompt — only analyze and refine it
- All AI calls must be server-side (API routes), never client-side
- Meta prompt templates must include XML containment tags
- Non-negotiable constraints from original prompt must be preserved in all variants
- Brand system data must be self-contained (no external dependencies)
- Every modifier must have a practical tip explaining when/how to use it
- Mobile-first responsive design required for all UI components
- Zone accent colors are fixed and must not be changed

## Examples

### Example 1: Adding a New Modifier
```javascript
// Add to MODS array:
{cat:"Reasoning",mod:"simulate 3 different expert perspectives before answering,",tip:"Gets diverse viewpoints. Use for strategic decisions where blind spots are costly."}
```

### Example 2: Creating a Meta Prompt API Call
```javascript
// Client-side:
const res = await fetch("/api/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt: userInput, metaType: 3 }),
});
const data = await res.json();
// data.result contains the expert engineering analysis
```
