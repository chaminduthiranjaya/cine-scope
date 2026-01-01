import {
  resolveMovieQuery
} from "@/lib/api/hfPromptResolver.server";
import {
  AiMovieQueryResult
} from "@/lib/interfaces/movie.interface";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { description }: { description: string } = await req.json();
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
