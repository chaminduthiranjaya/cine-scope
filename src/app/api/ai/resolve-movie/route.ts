import { resolveMovieQuery } from "@/lib/api/hfPromptResolver.server";
import type { AiMovieQueryResult } from "@/lib/interfaces/movie.interface";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as {
      description?: string;
    } | null;

    const description = (body?.description ?? "").trim();
    if (!description) {
      return NextResponse.json(
        { error: "description is required" },
        { status: 400 }
      );
    }

    const res: AiMovieQueryResult = await resolveMovieQuery(description);
    return NextResponse.json(res);
  } catch (error) {
    console.error("Error resolving movie request: ", error);
    return NextResponse.json(
      { error: "Failed to resolve your movie request" },
      { status: 500 }
    );
  }
}
