import { NextRequest, NextResponse } from "next/server";
import { getMovieList } from "@/lib/api/movies.server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchKey = searchParams.get("searchKey") ?? "";
  const pageParam = searchParams.get("page") ?? "1";

  const page = Number(pageParam);
  const safePage = Number.isNaN(page) || page < 1 ? 1 : page;

  const data = await getMovieList({
    page: safePage,
    query: searchKey.trim(),
  });

  return NextResponse.json(data);
}
