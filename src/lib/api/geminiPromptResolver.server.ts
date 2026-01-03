import "server-only";
import { z } from "zod";
import { genAI, GEMINI_MODEL } from "./geminiClient";

export const AiMovieExtractionSchema = z.object({
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
You are a movie title extraction assistant.
Return ONLY JSON that matches the provided schema.
No extra text.
`;

  const prompt = `
User description: "${userText}"
`;

  const res = await genAI.models.generateContent({
    model: GEMINI_MODEL,
    contents: [{ role: "user", parts: [{ text: system + "\n" + prompt }] }],
    config: {
      temperature: 0,
      responseMimeType: "application/json",
      responseJsonSchema: {
        type: "object",
        properties: {
          primary_title: { type: "string", nullable: true },
          alternative_titles: { type: "array", items: { type: "string" } },
          year: { type: "integer", nullable: true },
          query: { type: "string" },
        },
        required: ["primary_title", "alternative_titles", "year", "query"],
      },
    },
  });

  // Gemini returns JSON text in response.text for structured outputs.
  // We'll parse + validate with Zod.
  const raw = res.text ?? "";
  const parsed = JSON.parse(raw);

  // Fill missing keys safely + validate types
  const safe = AiMovieExtractionSchema.parse({
    primary_title: parsed.primary_title ?? null,
    alternative_titles: parsed.alternative_titles ?? [],
    year: parsed.year ?? null,
    query: parsed.query ?? userText, // fallback
  });

  return safe;
}
