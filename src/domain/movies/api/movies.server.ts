import "server-only";
import { formatMovie } from "../utils/movie.util";
import type { ApiMovie, Movie, PagedResponse } from "./movie.interface";
import { callTMDB } from "./tmdbClient";

type TMDBTrendingResponse = PagedResponse<ApiMovie>;

const DEFAULT_LANGUAGE = "en-US";

/**
 * Fetches trending movies from TMDB API
 * @param timeWindow - Time window for trending movies (day or week)
 * @returns Promise resolving to array of movies with formatted poster paths
 */
export async function getTrendingMovies(
  timeWindow: "day" | "week" = "week"
): Promise<Movie[]> {
  const data = await callTMDB<TMDBTrendingResponse>(
    `trending/movie/${timeWindow}`,
    { language: DEFAULT_LANGUAGE },
    "GET",
    {
      next: {
        revalidate: timeWindow === "day" ? 3600 : 86400, // 1 hour or 24 hours
        tags: [`trending-movies-${timeWindow}`], // For on-demand revalidation
      },
    }
  );
  return data.results?.map(formatMovie) ?? [];
}
