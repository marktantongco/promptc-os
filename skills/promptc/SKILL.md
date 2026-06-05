---
name: promptc OS
description: "AI Prompt Engineering Operating System — 6-zone workspace with 47+ modifiers, 21 workflows, 66 skills, Zod-validated state, MCP server, basket system, and monetize strategies."
version: 4.0.0
category: Prompt Engineering
tags: [prompt-engineering, ai, llm, chatgpt, claude, gemini, modifiers, templates, workflows, mcp]
homepage: https://marktantongco.github.io/promptc-os/
repository: https://github.com/marktantongco/promptc-os
mcpEndpoint: https://promptc-os.vercel.app/api/mcp
---

# promptc OS — AI Prompt Engineering Operating System

## Context
promptc OS is a production-grade prompt engineering environment that treats prompt creation as a systematic engineering discipline. It provides structured tools across 6 interconnected zones — from initial activation through building, validation, playbook orchestration, monetization, and system management. Every prompt, modifier, template, and workflow in the system is copy-ready — paste directly into ChatGPT, Claude, Gemini, or any AI chat.

v4.0 introduces a Data Integrity Layer with Zod-validated state at every boundary and an MCP server exposing all capabilities as tools for AI agents.

Use this skill when:
- Building or extending the promptc OS web application
- Adding new prompt modifiers, templates, or workflows
- Integrating AI-powered prompt analysis features
- Creating brand identity systems or meta-prompt methodologies
- Designing monetization content or SaaS prompt templates
- Querying the prompt library via MCP (Model Context Protocol)
- Validating prompt state with Zod schemas
- Implementing usePersistedReducer for debounced state persistence

## Instructions

### Zone Architecture
1. **Activate** — Discover & Collect:
   - 8 task prompts (YouTube, Coding, Business, Research, UI/UX, Image AI, Copy, Email)
   - 47 modifier prompts across 9 categories (Role, Output, Reasoning, Speed, Strategy, Hack, Data, Agent, Productivity)
   - 20 templates organized by type
   - 6 brand design systems with complete identity specifications
   - 7 animal thinking modes with multi-select and combined generation
   - 8-layer prompt composer (Role → Context → Objective → Constraints → Aesthetic → Planning → Output → Refinement)

2. **Build** — Construct & Transform:
   - Master system prompt (10 core rules + advocacy mode + writing rules)
   - 8 enhancement protocols with user input for combined enhancement
   - Meta Builder with 3 instant prompt transformers (Quick Critique, Structured Analysis, Expert Engineering — fully offline)

3. **Validate** — Test & Improve:
   - 28 automated lint checks across 5 segments
   - 40+ weak → strong word replacements across 4 levels
   - 60+ design terms with CSS implementations
   - AI-powered 4-dimension quality scoring

4. **Playbook** — Orchestrate & Execute:
   - 21 production workflows across Design, Dev, Business, AI/ML, and more
   - 6 multi-animal thinking sequences
   - 12 design element combinations with psychological rationale
   - 4 display + mono font pairings

5. **Monetize** — Earn & Scale:
   - 6 highest-value prompt products with revenue potential
   - 6 automation blueprints with tech stacks and time estimates
   - 4 income strategies (Quick Win → Active → Passive → Hybrid)
   - 5 agent frameworks with starter prompts

6. **System** — Meta-Control & Skills:
   - 66 skills across 13 categories
   - System health dashboard
   - 6 core operating principles
   - 6-step skill builder wizard

### MCP Server (v4.0 NEW)
The MCP server at `/api/mcp` exposes promptc OS as a tool server for AI agents:

**14 MCP Tools:**
| Tool | Description |
|------|-------------|
| `search` | Search across all content (modifiers, templates, tasks, brands, animals, skills) |
| `skills_list` | List 66 skills with optional category filter |
| `skills_get` | Get detailed skill info by name |
| `modifiers_list` | List 47 modifiers with optional category filter |
| `templates_list` | List all prompt templates |
| `brands_list` | List 6 brand design systems |
| `animals_list` | List 7 thinking mode animals |
| `zones_list` | List 6 workspace zones |
| `basket_add` | Add item to basket (Zod-validated) |
| `basket_remove` | Remove item from basket |
| `basket_list` | List basket items with filter/sort |
| `compose` | Compose structured prompt from 8 layers |
| `analyze` | Score prompt on 4 dimensions (AI-powered) |
| `system_prompt` | Get the master system prompt |

**Protocol:** JSON-RPC 2.0 over HTTP POST (StreamableHTTP transport)
**Endpoint:** `https://promptc-os.vercel.app/api/mcp`

### Data Integrity Architecture (v4.0)
- **`safeIncludes()`** — Null-safe case-insensitive string search, prevents TypeError on null/undefined text
- **`basketItemSchema`** — Zod validator for basket items, rejects corrupt data at the boundary
- **`persistedStateSchema`** — Zod validator for 19 persisted state keys
- **`usePersistedReducer`** — Custom hook: useReducer + Zod + debounced batch localStorage save (replaces 35+ useEffect writers)
- **25 property-based tests** — 1,000+ random inputs proving validators never throw

### AI Integration Pattern
- All AI calls go through `/api/generate` (POST) or MCP `analyze` tool
- Request: `{ prompt: string, metaType: 1|2|3 }` or MCP tools/call
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
- All state validation goes through Zod schemas — never trust raw input
- Use `safeIncludes()` for all search/filter operations — never call `.toLowerCase()` on potentially null values

## Examples

### Example 1: Calling the MCP Server
```bash
# Initialize connection
curl -X POST https://promptc-os.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"my-agent","version":"1.0"}}}'

# Search for role modifiers
curl -X POST https://promptc-os.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search","arguments":{"query":"role","category":"Role"}}}'

# Compose a structured prompt
curl -X POST https://promptc-os.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"compose","arguments":{"role":"senior full-stack developer","objective":"Build a responsive dashboard","constraints":"Mobile-first, WCAG AA, 60fps"}}}'
```

### Example 2: Adding a New Modifier
```javascript
// Add to MODS array in promptc-data.ts:
{cat:"Reasoning",mod:"simulate 3 different expert perspectives before answering,",tip:"Gets diverse viewpoints. Use for strategic decisions where blind spots are costly."}
```

### Example 3: Using usePersistedReducer
```typescript
import { usePersistedReducer } from "@/hooks/useAppReducer";
import { persistedStateSchema } from "@/lib/stateSchema";

const [state, dispatch] = usePersistedReducer(
  appReducer,
  initialState,
  persistedStateSchema,
  { storageKey: "promptc-state", debounceMs: 500 }
);

// Individual action:
dispatch({ type: "SET_SEARCH", payload: "role prompt" });

// Batch update (atomic multi-field):
dispatch({ type: "BATCH_UPDATE", payload: { zone: "build", search: "" } });
```
