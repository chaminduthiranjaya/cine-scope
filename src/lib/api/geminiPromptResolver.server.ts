import "server-only";
import { z } from "zod";
import { genAI, GEMINI_MODEL } from "./geminiClient";

export const AiMovieExtractionSchema = z.object({
  intent: z.enum(["movie_lookup", "mood_recommendation"]),
  primary_title: z.string().nullable(),
  alternative_titles: z.array(z.string()).default([]),
  year: z.number().int().min(1900).max(2100).nullable(),
  query: z.string().min(1),
});

export type AiMovieExtraction = z.infer<typeof AiMovieExtractionSchema>;

export async function inferMovieQueryFromText(
  userText: string
): Promise<AiMovieExtraction> {
  const system = `
You are a movie assistant.

Your task:
1. Detect user intent:
   - "movie_lookup" → user is describing a specific movie
   - "mood_recommendation" → user describes emotions, vibes, or mood

Rules:
- If intent is movie_lookup:
  - Try to infer a specific movie title
- If intent is mood_recommendation:
  - DO NOT guess a movie title
  - Instead, construct a strong TMDB search query using genre, tone, era, themes
  - Set primary_title = null

Return ONLY valid JSON matching the schema.
No extra text.
`;

  const prompt = `
User description: "${userText}"
`;

  const res = await genAI.models.generateContent({
    model: GEMINI_MODEL,
    contents: [{ role: "user", parts: [{ text: system + "\n" + prompt }] }],
    config: {
      temperature: 0.2,
      responseMimeType: "application/json",
      responseJsonSchema: {
        type: "object",
        properties: {
          intent: {
            type: "string",
            enum: ["movie_lookup", "mood_recommendation"],
          },
          primary_title: { type: "string", nullable: true },
          alternative_titles: { type: "array", items: { type: "string" } },
          year: { type: "integer", nullable: true },
          query: { type: "string" },
        },
        required: ["intent", "query"],
      },
    },
  });

  // Gemini returns JSON text in response.text for structured outputs.
  // We'll parse + validate with Zod.
  const raw = res.text ?? "";
  const parsed = JSON.parse(raw);

  console.log(parsed);

  // Fill missing keys safely + validate types
  const safe = AiMovieExtractionSchema.parse({
    intent: parsed.intent,
    primary_title: parsed.primary_title ?? null,
    alternative_titles: parsed.alternative_titles ?? [],
    year: parsed.year ?? null,
    query: parsed.query ?? userText, // fallback
  });

  return safe;
}
