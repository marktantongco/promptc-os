// ─── MCP Server Route — StreamableHTTP Transport ────────────────────────────
// Implements the Model Context Protocol (2024-11-05) over HTTP POST.
// JSON-RPC 2.0 handler at /api/mcp exposing promptc-os as tool calls.

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import ZAI from "z-ai-web-dev-sdk";

// ─── Data imports ──────────────────────────────────────────────────────────
import {
  MASTER,
  ADVOCATE,
  ZONES,
  MODS,
  TASKS,
  BRANDS,
  TMPLS,
  ANIMALS,
  LAYERS,
} from "@/app/data/promptc-data";
import {
  SKILLS_CATALOG,
  CATEGORY_ICONS,
  CATEGORY_COLORS,
} from "@/app/data/skills-catalog";
import { basketItemSchema } from "@/lib/stateSchema";
import { safeIncludes } from "@/lib/utils";

// ─── In-memory basket store ────────────────────────────────────────────────
// Per the MCP spec this is session-scoped. In production you'd persist this.
interface BasketItem {
  id: string;
  text: string;
  label: string;
  zone: string;
  time: string;
  chars: number;
  pinned: boolean;
  favorited: boolean;
}

const basketStore = new Map<string, BasketItem>();

// ─── JSON-RPC 2.0 helpers ─────────────────────────────────────────────────
function jsonRpcResult(id: unknown, result: unknown) {
  return NextResponse.json({
    jsonrpc: "2.0",
    id,
    result,
  });
}

function jsonRpcError(id: unknown, code: number, message: string, data?: unknown) {
  return NextResponse.json({
    jsonrpc: "2.0",
    id,
    error: { code, message, ...(data !== undefined ? { data } : {}) },
  });
}

const PARSE_ERROR = -32700;
const INVALID_REQUEST = -32600;
const METHOD_NOT_FOUND = -32601;
const INVALID_PARAMS = -32602;

// ─── Zod schemas for each tool ─────────────────────────────────────────────
const searchSchema = z.object({
  query: z.string().min(1),
  category: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(20),
});

const skillsListSchema = z.object({
  category: z.string().optional(),
});

const skillsGetSchema = z.object({
  name: z.string().min(1),
});

const modifiersListSchema = z.object({
  category: z.string().optional(),
});

const templatesListSchema = z.object({});

const brandsListSchema = z.object({});

const animalsListSchema = z.object({});

const zonesListSchema = z.object({});

const basketAddSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  label: z.string(),
  zone: z.string(),
});

const basketRemoveSchema = z.object({
  id: z.string().min(1),
});

const basketListSchema = z.object({
  zone: z.string().optional(),
  sort: z.enum(["newest", "oldest", "longest", "shortest", "az"]).default("newest"),
});

const composeSchema = z.object({
  role: z.string().optional(),
  context: z.string().optional(),
  objective: z.string().optional(),
  constraints: z.string().optional(),
  aesthetic: z.string().optional(),
  planning: z.string().optional(),
  output: z.string().optional(),
  refinement: z.string().optional(),
});

const analyzeSchema = z.object({
  prompt: z.string().min(1),
});

// ─── Tool definitions (MCP spec shape) ─────────────────────────────────────
const TOOL_DEFINITIONS = [
  {
    name: "search",
    description:
      "Search across all promptc-os content: modifiers, templates, tasks, workflows, brands, animals, and skills. Returns matching items with id, name, category, description, and text.",
    inputSchema: {
      type: "object" as const,
      properties: {
        query: { type: "string", description: "Search query string" },
        category: {
          type: "string",
          description: "Optional category filter (e.g. 'Role', 'Output', 'Reasoning', 'Brand', 'Animal', skill category)",
        },
        limit: {
          type: "number",
          description: "Maximum results to return (1-100, default 20)",
          default: 20,
        },
      },
      required: ["query"],
    },
  },
  {
    name: "skills_list",
    description: "List all 66 skills in the promptc-os catalog with optional category filter.",
    inputSchema: {
      type: "object" as const,
      properties: {
        category: {
          type: "string",
          description: "Optional category filter (e.g. 'AI / LLM Core', 'Web Development')",
        },
      },
      required: [],
    },
  },
  {
    name: "skills_get",
    description: "Get detailed info about a specific skill by name.",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: { type: "string", description: "Exact skill name (e.g. 'LLM', 'fullstack-dev')" },
      },
      required: ["name"],
    },
  },
  {
    name: "modifiers_list",
    description: "List all 47 prompt modifiers with optional category filter.",
    inputSchema: {
      type: "object" as const,
      properties: {
        category: {
          type: "string",
          description: "Optional category: Role, Output, Reasoning, Speed, Strategy, Hack, Data, Agent, Productivity",
        },
      },
      required: [],
    },
  },
  {
    name: "templates_list",
    description: "List all prompt templates (Web App, Mobile, Brand, Landing Page, Dashboard, Meta templates, Brand systems, API Design, AI Agent, MCP Tool Server, etc.).",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "brands_list",
    description: "List all 6 brand design systems (powerUP, SaaS, E-commerce, Fintech, Insurance, Creative Agency).",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "animals_list",
    description: "List all 7 thinking mode animals (Rabbit, Owl, Ant, Eagle, Dolphin, Beaver, Elephant).",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "zones_list",
    description: "List the 6 workspace zones (ACTIVATE, BUILD, VALIDATE, PLAYBOOK, MONETIZE, SYSTEM).",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
  {
    name: "basket_add",
    description: "Add an item to the basket. Items are stored with zone, label, text, and metadata.",
    inputSchema: {
      type: "object" as const,
      properties: {
        id: { type: "string", description: "Unique identifier for the basket item" },
        text: { type: "string", description: "The text content to store" },
        label: { type: "string", description: "Display label for the item" },
        zone: { type: "string", description: "Zone to assign the item to (activate, build, validate, playbook, monetize, system)" },
      },
      required: ["id", "text", "label", "zone"],
    },
  },
  {
    name: "basket_remove",
    description: "Remove an item from the basket by id.",
    inputSchema: {
      type: "object" as const,
      properties: {
        id: { type: "string", description: "The id of the basket item to remove" },
      },
      required: ["id"],
    },
  },
  {
    name: "basket_list",
    description: "List basket items with optional zone filter and sort order.",
    inputSchema: {
      type: "object" as const,
      properties: {
        zone: { type: "string", description: "Filter by zone (activate, build, validate, playbook, monetize, system)" },
        sort: {
          type: "string",
          enum: ["newest", "oldest", "longest", "shortest", "az"],
          description: "Sort order (default: newest)",
          default: "newest",
        },
      },
      required: [],
    },
  },
  {
    name: "compose",
    description: "Compose a structured prompt from the 8-layer system: Role, Context, Objective, Constraints, Aesthetic, Planning, Output, Refinement. Uses the promptc-os layer template.",
    inputSchema: {
      type: "object" as const,
      properties: {
        role: { type: "string", description: "Who the AI acts as (e.g. 'senior full-stack developer')" },
        context: { type: "string", description: "Product, audience, platform context" },
        objective: { type: "string", description: "What success looks like" },
        constraints: { type: "string", description: "Quality guardrails and limitations" },
        aesthetic: { type: "string", description: "Design language / tone keywords" },
        planning: { type: "string", description: "Reasoning instructions before generating" },
        output: { type: "string", description: "Exact format to deliver" },
        refinement: { type: "string", description: "Self-critique instructions before final output" },
      },
      required: [],
    },
  },
  {
    name: "analyze",
    description: "Score a prompt on 4 dimensions (clarity, specificity, structure, actionability) each 1-10, with feedback and suggestions. Uses AI analysis.",
    inputSchema: {
      type: "object" as const,
      properties: {
        prompt: { type: "string", description: "The prompt text to analyze" },
      },
      required: ["prompt"],
    },
  },
  {
    name: "system_prompt",
    description: "Get the master system prompt for promptc-os — the core advocacy-mode prompt used across all zones.",
    inputSchema: {
      type: "object" as const,
      properties: {},
      required: [],
    },
  },
];

// ─── Tool handlers ─────────────────────────────────────────────────────────

function handleSearch(params: unknown) {
  const parsed = searchSchema.safeParse(params);
  if (!parsed.success) {
    return { error: true, message: `Invalid params: ${parsed.error.issues.map((i) => i.message).join(", ")}` };
  }
  const { query, category, limit } = parsed.data;
  const results: Array<{ id: string; name: string; category: string; description: string; text: string }> = [];

  // Search modifiers
  for (const mod of MODS) {
    if (category && !safeIncludes(mod.cat, category)) continue;
    if (safeIncludes(mod.mod, query) || safeIncludes(mod.tip, query) || safeIncludes(mod.cat, query)) {
      results.push({
        id: `mod-${mod.mod.slice(0, 30)}`,
        name: mod.mod,
        category: `Modifier / ${mod.cat}`,
        description: mod.tip,
        text: mod.mod,
      });
    }
  }

  // Search templates
  for (let i = 0; i < TMPLS.length; i++) {
    const t = TMPLS[i];
    if (category && !safeIncludes("template", category) && !safeIncludes(t.label, category)) continue;
    if (safeIncludes(t.label, query) || safeIncludes(t.desc, query) || safeIncludes(t.content, query)) {
      results.push({
        id: `tmpl-${i}`,
        name: t.label,
        category: "Template",
        description: t.desc,
        text: t.content,
      });
    }
  }

  // Search tasks
  for (let i = 0; i < TASKS.length; i++) {
    const t = TASKS[i];
    if (category && !safeIncludes("task", category) && !safeIncludes(t.label, category)) continue;
    if (safeIncludes(t.label, query) || safeIncludes(t.content, query)) {
      results.push({
        id: `task-${i}`,
        name: t.label,
        category: "Task",
        description: t.label,
        text: t.content,
      });
    }
  }

  // Search brands
  for (const b of BRANDS) {
    if (category && !safeIncludes("brand", category) && !safeIncludes(b.label, category)) continue;
    if (safeIncludes(b.label, query) || safeIncludes(b.uc, query) || safeIncludes(b.prompt, query)) {
      results.push({
        id: `brand-${b.id}`,
        name: b.label,
        category: "Brand",
        description: b.uc,
        text: b.prompt,
      });
    }
  }

  // Search animals
  for (const a of ANIMALS) {
    if (category && !safeIncludes("animal", category) && !safeIncludes(a.name, category)) continue;
    if (safeIncludes(a.name, query) || safeIncludes(a.mode, query) || safeIncludes(a.prompt, query)) {
      results.push({
        id: `animal-${a.name.toLowerCase()}`,
        name: `${a.emoji} ${a.name}`,
        category: "Animal",
        description: a.mode,
        text: a.prompt,
      });
    }
  }

  // Search skills
  for (const s of SKILLS_CATALOG) {
    if (category && !safeIncludes(s.category, category) && !safeIncludes(s.name, category)) continue;
    if (safeIncludes(s.name, query) || safeIncludes(s.description, query) || safeIncludes(s.category, query)) {
      results.push({
        id: `skill-${s.name}`,
        name: s.name,
        category: `Skill / ${s.category}`,
        description: s.description,
        text: s.description,
      });
    }
  }

  return results.slice(0, limit);
}

function handleSkillsList(params: unknown) {
  const parsed = skillsListSchema.safeParse(params);
  if (!parsed.success) {
    return { error: true, message: `Invalid params: ${parsed.error.issues.map((i) => i.message).join(", ")}` };
  }
  const { category } = parsed.data;
  const skills = category
    ? SKILLS_CATALOG.filter((s) => safeIncludes(s.category, category))
    : SKILLS_CATALOG;
  return skills.map((s) => ({
    name: s.name,
    category: s.category,
    description: s.description,
    files: s.files,
    icon: s.icon,
  }));
}

function handleSkillsGet(params: unknown) {
  const parsed = skillsGetSchema.safeParse(params);
  if (!parsed.success) {
    return { error: true, message: `Invalid params: ${parsed.error.issues.map((i) => i.message).join(", ")}` };
  }
  const { name } = parsed.data;
  const skill = SKILLS_CATALOG.find(
    (s) => s.name.toLowerCase() === name.toLowerCase()
  );
  if (!skill) {
    return { error: true, message: `Skill '${name}' not found. Available: ${SKILLS_CATALOG.map((s) => s.name).join(", ")}` };
  }
  return {
    name: skill.name,
    category: skill.category,
    description: skill.description,
    files: skill.files,
    icon: skill.icon,
    categoryIcon: CATEGORY_ICONS[skill.category] || "📌",
    categoryColor: CATEGORY_COLORS[skill.category] || "#6B7280",
  };
}

function handleModifiersList(params: unknown) {
  const parsed = modifiersListSchema.safeParse(params);
  if (!parsed.success) {
    return { error: true, message: `Invalid params: ${parsed.error.issues.map((i) => i.message).join(", ")}` };
  }
  const { category } = parsed.data;
  const mods = category
    ? MODS.filter((m) => safeIncludes(m.cat, category))
    : MODS;
  return mods.map((m, i) => ({
    id: i,
    category: m.cat,
    modifier: m.mod,
    tip: m.tip,
  }));
}

function handleTemplatesList(_params: unknown) {
  return TMPLS.map((t, i) => ({
    id: i,
    label: t.label,
    description: t.desc,
    contentLength: t.content.length,
  }));
}

function handleBrandsList(_params: unknown) {
  return BRANDS.map((b) => ({
    id: b.id,
    label: b.label,
    useCase: b.uc,
    color: b.col,
  }));
}

function handleAnimalsList(_params: unknown) {
  return ANIMALS.map((a) => ({
    name: a.name,
    emoji: a.emoji,
    mode: a.mode,
    prompt: a.prompt,
  }));
}

function handleZonesList(_params: unknown) {
  return ZONES.map((z) => ({
    id: z.id,
    label: z.label,
    icon: z.icon,
    description: z.sub,
    color: z.color,
  }));
}

function handleBasketAdd(params: unknown) {
  const parsed = basketAddSchema.safeParse(params);
  if (!parsed.success) {
    return { error: true, message: `Invalid params: ${parsed.error.issues.map((i) => i.message).join(", ")}` };
  }
  const { id, text, label, zone } = parsed.data;
  const item: BasketItem = {
    id,
    text,
    label,
    zone,
    time: new Date().toISOString(),
    chars: text.length,
    pinned: false,
    favorited: false,
  };
  // Validate with the shared Zod schema
  const validated = basketItemSchema.safeParse(item);
  if (!validated.success) {
    return { error: true, message: `Basket item validation failed: ${validated.error.issues.map((i) => i.message).join(", ")}` };
  }
  basketStore.set(id, item);
  return { confirmed: true, item };
}

function handleBasketRemove(params: unknown) {
  const parsed = basketRemoveSchema.safeParse(params);
  if (!parsed.success) {
    return { error: true, message: `Invalid params: ${parsed.error.issues.map((i) => i.message).join(", ")}` };
  }
  const { id } = parsed.data;
  const existed = basketStore.delete(id);
  return { confirmed: true, removed: existed, id };
}

function handleBasketList(params: unknown) {
  const parsed = basketListSchema.safeParse(params);
  if (!parsed.success) {
    return { error: true, message: `Invalid params: ${parsed.error.issues.map((i) => i.message).join(", ")}` };
  }
  const { zone, sort } = parsed.data;
  let items = Array.from(basketStore.values());

  if (zone) {
    items = items.filter((i) => i.zone === zone);
  }

  switch (sort) {
    case "newest":
      items.sort((a, b) => b.time.localeCompare(a.time));
      break;
    case "oldest":
      items.sort((a, b) => a.time.localeCompare(b.time));
      break;
    case "longest":
      items.sort((a, b) => b.chars - a.chars);
      break;
    case "shortest":
      items.sort((a, b) => a.chars - b.chars);
      break;
    case "az":
      items.sort((a, b) => a.label.localeCompare(b.label));
      break;
  }

  return items;
}

function handleCompose(params: unknown) {
  const parsed = composeSchema.safeParse(params);
  if (!parsed.success) {
    return { error: true, message: `Invalid params: ${parsed.error.issues.map((i) => i.message).join(", ")}` };
  }
  const { role, context, objective, constraints, aesthetic, planning, output, refinement } = parsed.data;

  const sections: string[] = [];

  if (role) sections.push(`ROLE\nYou are a ${role}.`);
  else sections.push(`ROLE\nYou are a [expert role].`);

  if (context) {
    sections.push(`CONTEXT\n${context}`);
  } else {
    sections.push(`CONTEXT\nProduct: [name or description]\nPlatform: [mobile / web / hybrid]\nAudience: [who uses this]`);
  }

  if (objective) {
    sections.push(`OBJECTIVE\n${objective}`);
  } else {
    sections.push(`OBJECTIVE\n[One clear sentence of what success looks like]\nSuccess criteria:\n- [criterion 1]\n- [criterion 2]`);
  }

  if (constraints) {
    sections.push(`CONSTRAINTS\n${constraints}`);
  } else {
    sections.push(`CONSTRAINTS\n- Mobile-first\n- WCAG AA accessibility\n- 60fps animation budget\n- [other constraints]`);
  }

  if (aesthetic) {
    sections.push(`AESTHETIC\n${aesthetic}`);
  } else {
    sections.push(`AESTHETIC\n- [visual style keyword 1]\n- [visual style keyword 2]\n- [tone descriptor]`);
  }

  if (planning) {
    sections.push(`PLANNING (complete this before generating)\n${planning}`);
  } else {
    sections.push(`PLANNING (complete this before generating)\n1. Define information architecture\n2. Define navigation model\n3. Define layout and grid\n4. Define interaction and motion logic\n5. Validate accessibility and performance plan`);
  }

  if (output) {
    sections.push(`OUTPUT FORMAT\n${output}`);
  } else {
    sections.push(`OUTPUT FORMAT\nGenerate:\n1. [file or artifact type]\n2. [second deliverable]\n3. [instructions or explanation]`);
  }

  if (refinement) {
    sections.push(`REFINEMENT\n${refinement}`);
  } else {
    sections.push(`REFINEMENT\nAfter generating the first draft:\n- Critique for clarity and completeness\n- Refine once for structure\n- Refine once for polish\n- Output final result only`);
  }

  const composed = sections.join("\n\n");
  return {
    text: composed,
    layersUsed: LAYERS.map((l) => ({
      number: l.n,
      name: l.name,
      purpose: l.pur,
      provided: !!(
        (l.name === "Role" && role) ||
        (l.name === "Context" && context) ||
        (l.name === "Objective" && objective) ||
        (l.name === "Constraints" && constraints) ||
        (l.name === "Aesthetic" && aesthetic) ||
        (l.name === "Planning" && planning) ||
        (l.name === "Output" && output) ||
        (l.name === "Refinement" && refinement)
      ),
    })),
    charCount: composed.length,
  };
}

async function handleAnalyze(params: unknown) {
  const parsed = analyzeSchema.safeParse(params);
  if (!parsed.success) {
    return { error: true, message: `Invalid params: ${parsed.error.issues.map((i) => i.message).join(", ")}` };
  }
  const { prompt } = parsed.data;

  try {
    const systemPrompt = `You are a Prompt Quality Analyzer. Analyze the given prompt and score it on 4 dimensions, each 1-10.

Analyze this prompt on:
1. CLARITY — Is the goal unambiguous? No vague language (nice, cool, modern, good)?
2. SPECIFICITY — Does it specify output format, constraints, audience, platform?
3. STRUCTURE — Does it follow a logical order (role → context → objective → output)?
4. ACTIONABILITY — Can someone copy-paste this and get the expected result?

Respond ONLY with a valid JSON object — no markdown fences, no explanation:
{
  "clarity": <number 1-10>,
  "specificity": <number 1-10>,
  "structure": <number 1-10>,
  "actionability": <number 1-10>,
  "feedback": "<2-3 sentence summary of biggest strengths and one top improvement>",
  "suggestions": ["<specific suggestion 1>", "<specific suggestion 2>", "<specific suggestion 3>"]
}`;

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Analyze this prompt:\n\n---\n${prompt}\n---` },
      ],
    });

    const raw = completion.choices[0]?.message?.content || "";

    let scores;
    try {
      const cleaned = raw.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
      scores = JSON.parse(cleaned);
    } catch {
      const nums = raw.match(/(\d{1,2})/g);
      scores = {
        clarity: nums?.[0] ? parseInt(nums[0]) : 5,
        specificity: nums?.[1] ? parseInt(nums[1]) : 5,
        structure: nums?.[2] ? parseInt(nums[2]) : 5,
        actionability: nums?.[3] ? parseInt(nums[3]) : 5,
        feedback: raw.slice(0, 300),
        suggestions: [],
      };
    }

    const clamp = (n: number) => Math.max(1, Math.min(10, n || 5));

    return {
      scores: {
        clarity: clamp(scores.clarity),
        specificity: clamp(scores.specificity),
        structure: clamp(scores.structure),
        actionability: clamp(scores.actionability),
      },
      average: Math.round(
        (clamp(scores.clarity) + clamp(scores.specificity) + clamp(scores.structure) + clamp(scores.actionability)) / 4
      ),
      feedback: scores.feedback || "Analysis complete.",
      suggestions: Array.isArray(scores.suggestions) ? scores.suggestions.slice(0, 5) : [],
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { error: true, message: `Analysis failed: ${message}` };
  }
}

function handleSystemPrompt(_params: unknown) {
  return {
    text: MASTER,
    advocate: ADVOCATE,
    charCount: MASTER.length,
  };
}

// ─── Tool dispatch map ─────────────────────────────────────────────────────
const TOOL_HANDLERS: Record<string, (params: unknown) => Promise<unknown> | unknown> = {
  search: handleSearch,
  skills_list: handleSkillsList,
  skills_get: handleSkillsGet,
  modifiers_list: handleModifiersList,
  templates_list: handleTemplatesList,
  brands_list: handleBrandsList,
  animals_list: handleAnimalsList,
  zones_list: handleZonesList,
  basket_add: handleBasketAdd,
  basket_remove: handleBasketRemove,
  basket_list: handleBasketList,
  compose: handleCompose,
  analyze: handleAnalyze,
  system_prompt: handleSystemPrompt,
};

// ─── MCP method handlers ──────────────────────────────────────────────────

function handleInitialize(id: unknown) {
  return jsonRpcResult(id, {
    protocolVersion: "2024-11-05",
    capabilities: {
      tools: {},
    },
    serverInfo: {
      name: "promptc-os",
      version: "4.0.0",
    },
  });
}

function handleToolsList(id: unknown) {
  return jsonRpcResult(id, {
    tools: TOOL_DEFINITIONS,
  });
}

async function handleToolsCall(id: unknown, params: unknown) {
  if (!params || typeof params !== "object") {
    return jsonRpcError(id, INVALID_PARAMS, "tools/call requires params with 'name' and optional 'arguments'");
  }

  const { name, arguments: args } = params as { name: string; arguments?: unknown };
  if (!name || typeof name !== "string") {
    return jsonRpcError(id, INVALID_PARAMS, "tools/call params must include a 'name' string");
  }

  const handler = TOOL_HANDLERS[name];
  if (!handler) {
    return jsonRpcError(id, METHOD_NOT_FOUND, `Unknown tool: ${name}. Available: ${Object.keys(TOOL_HANDLERS).join(", ")}`);
  }

  try {
    const result = await handler(args ?? {});

    // If handler returned an error object
    if (result && typeof result === "object" && "error" in result && result.error === true) {
      return jsonRpcResult(id, {
        content: [
          {
            type: "text",
            text: JSON.stringify({ isError: true, message: (result as { message: string }).message }),
          },
        ],
        isError: true,
      });
    }

    return jsonRpcResult(id, {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal tool error";
    return jsonRpcResult(id, {
      content: [
        {
          type: "text",
          text: JSON.stringify({ isError: true, message }),
        },
      ],
      isError: true,
    });
  }
}

// ─── Route handler ─────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonRpcError(null, PARSE_ERROR, "Parse error: invalid JSON in request body");
  }

  // Validate JSON-RPC structure
  if (!body || typeof body !== "object") {
    return jsonRpcError(null, INVALID_REQUEST, "Invalid Request: body must be a JSON object");
  }

  const { jsonrpc, method, id, params } = body as {
    jsonrpc?: string;
    method?: string;
    id?: unknown;
    params?: unknown;
  };

  // Must be JSON-RPC 2.0
  if (jsonrpc !== "2.0") {
    return jsonRpcError(id ?? null, INVALID_REQUEST, "Invalid Request: must include 'jsonrpc: 2.0'");
  }

  if (!method || typeof method !== "string") {
    return jsonRpcError(id ?? null, INVALID_REQUEST, "Invalid Request: must include a 'method' string");
  }

  // Dispatch by method
  switch (method) {
    case "initialize":
      return handleInitialize(id ?? null);

    case "notifications/initialized":
      // Client acknowledges initialization — no response needed per spec,
      // but return 204-like empty for HTTP transport compatibility
      return new NextResponse(null, { status: 204 });

    case "tools/list":
      return handleToolsList(id ?? null);

    case "tools/call":
      return handleToolsCall(id ?? null, params);

    case "ping":
      return jsonRpcResult(id ?? null, {});

    default:
      return jsonRpcError(id ?? null, METHOD_NOT_FOUND, `Method not found: ${method}`);
  }
}

// GET endpoint returns server info for discovery
export async function GET() {
  return NextResponse.json({
    name: "promptc-os MCP Server",
    version: "4.0.0",
    protocolVersion: "2024-11-05",
    transport: "StreamableHTTP",
    endpoint: "/api/mcp",
    tools: TOOL_DEFINITIONS.length,
    description: "promptc OS — AI Prompt Engineering Operating System. 6-zone workspace with 47+ modifiers, 21 workflows, 66 skills.",
  });
}
