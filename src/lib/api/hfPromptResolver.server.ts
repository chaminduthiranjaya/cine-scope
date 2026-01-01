import "server-only";
import {
  AiMovieExtraction,
  AiMovieQueryResult,
  MovieListResponse,
} from "../interfaces/movie.interface";
import { callHuggingFace } from "./hfClient";
import { getMovieList } from "./movies.server";

/**
 * Infer movie query from user text
 * @param userText User description of a movie
 * @returns Movie extraction result
 */
export async function inferMovieQueryFromText(
  userText: string
): Promise<AiMovieExtraction | null> {
  const prompt = `
You are a movie title extraction assistant.

The user will describe a movie they want to watch or remember in free text.

Your job:
- Infer a possible movie title if there is one.
- Optionally infer alternative titles.
- Infer the most likely release year if mentioned.
- Always construct a useful search query using keywords, actors, genre etc.

You MUST return STRICT JSON. No explanations, no extra text.

JSON shape:
{
  "primary_title": string | null,
  "alternative_titles": string[],
  "year": number | null,
  "query": string
}

Rules:
- If you are not sure of the exact title, set "primary_title": null.
- "alternative_titles" can be empty or contain guesses.
- "year" should be a 4-digit year if clearly inferred, otherwise null.
- "query" must always be filled with a good search string.

User description: "${userText}"
`;

  const raw = await callHuggingFace(prompt);

  try {
    return JSON.parse(raw) as AiMovieExtraction;
  } catch (e) {
    console.error("Failed to parse Hugging Face JSON:", e, raw);
    return null;
  }
}

export async function resolveMovieQuery(
  description: string
): Promise<AiMovieQueryResult> {
  const aiResponse: AiMovieExtraction | null = await inferMovieQueryFromText(
    description
  );

  if (!aiResponse) {
    return {
      status: "not_found",
      reason: "We could not parse your description.",
    };
  }

  const results: MovieListResponse = await getMovieList({
    page: 1,
    query: aiResponse?.primary_title || aiResponse?.query,
    ...(aiResponse?.year && { year: aiResponse.year }),
  });

  if (results.movies.length === 0) {
    return {
      status: "not_exact_match",
      reason: "We could not find an exact match.",
      suggestion: aiResponse.alternative_titles || [],
    };
  }

  return {
    status: "found",
    results,
  };
}
