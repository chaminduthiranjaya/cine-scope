import { getMovieList } from "@/lib/api/movies.server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = (searchParams.get("searchKey") ?? "").trim();
    const pageParam = searchParams.get("page") ?? "1";

    const page = Number(pageParam);
    const safePage = Number.isNaN(page) || page < 1 ? 1 : page;

    const data = await getMovieList({
      page: safePage,
      query,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching movie list: ", error);
    return NextResponse.json(
      { error: "Failed to fetch movie list" },
      { status: 500 }
    );
  }
}
