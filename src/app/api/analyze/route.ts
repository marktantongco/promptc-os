import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt is required and must be a non-empty string." },
        { status: 400 }
      );
    }

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
  "feedback": "<2-3 sentence summary of biggest strengths and one top improvement>"
}`;

    const userMessage = `Analyze this prompt:\n\n---\n${prompt.trim()}\n---`;

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: [
        { role: "assistant", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      thinking: { type: "disabled" },
    });

    const raw = completion.choices[0]?.message?.content || "";

    // Try to parse JSON from the response
    let scores;
    try {
      // Strip markdown fences if present
      const cleaned = raw.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
      scores = JSON.parse(cleaned);
    } catch {
      // Fallback: try to extract numbers
      const nums = raw.match(/(\d{1,2})/g);
      scores = {
        clarity: nums?.[0] ? parseInt(nums[0]) : 5,
        specificity: nums?.[1] ? parseInt(nums[1]) : 5,
        structure: nums?.[2] ? parseInt(nums[2]) : 5,
        actionability: nums?.[3] ? parseInt(nums[3]) : 5,
        feedback: raw.slice(0, 300),
      };
    }

    // Clamp scores to 1-10
    const clamp = (n: number) => Math.max(1, Math.min(10, n || 5));

    return NextResponse.json({
      scores: {
        clarity: clamp(scores.clarity),
        specificity: clamp(scores.specificity),
        structure: clamp(scores.structure),
        actionability: clamp(scores.actionability),
      },
      feedback: scores.feedback || "Analysis complete.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Analyze API error:", message);
    return NextResponse.json(
      { error: `Failed to analyze: ${message}` },
      { status: 500 }
    );
  }
}
