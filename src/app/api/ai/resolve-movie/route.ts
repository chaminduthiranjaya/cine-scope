import { NextResponse } from "next/server";
import { inferMovieQueryFromText } from "@/lib/api/geminiPromptResolver.server";
import { getMovieList } from "@/lib/api/movies.server";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { description }: { description: string } = await req.json();

    const ai = await inferMovieQueryFromText(description);
    if (!ai) {
      return NextResponse.json({
        status: "not_found",
        reason: "Error processing your request with our AI",
      });
    }

    console.log(ai.primary_title, ai.year);

    const results = await getMovieList({
      page: 1,
      query: ai.primary_title || ai.query,
    });

    if (results.movies.length === 0) {
      return NextResponse.json({
        status: "partial_found",
        reason: "not exact match.",
        suggestion: ai.alternative_titles,
      });
    }

    return NextResponse.json({
      status: "found",
      results,
    });
  } catch (error) {
    console.error("Error resolving movie request:", error);
    return NextResponse.json(
      { error: "Failed to resolve your movie request" },
      { status: 500 }
    );
  }
}
