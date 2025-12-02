import "server-only";
import { formatMovie } from "../../views/utils/movie.util";
import type {
  ApiMovie,
  Movie,
  MovieListResponse,
  PagedResponse,
} from "../interfaces/movie.interface";
import { callTMDB } from "./tmdbClient";

const DEFAULT_LANGUAGE = "en-US";

/**
 * Fetches trending movies from TMDB API
 * @param timeWindow - Time window for trending movies (day or week)
 * @returns Promise resolving to array of movies with formatted poster paths
 */
export async function getTrendingMovies(
  timeWindow: "day" | "week" = "week"
): Promise<Movie[]> {
  const data = await callTMDB<PagedResponse<ApiMovie>>(
    `trending/movie/${timeWindow}`,
    {
      params: { language: DEFAULT_LANGUAGE },
      fetch: {
        next: {
          revalidate: timeWindow === "day" ? 3600 : 86400,
          tags: [`trending-movies-${timeWindow}`],
        },
      },
    }
  );

  return data.results?.map(formatMovie) ?? [];
}

export async function getMovieList(
  page: number = 1
): Promise<MovieListResponse> {
  const data = await callTMDB<PagedResponse<ApiMovie>>(`movie/popular`, {
    params: { language: DEFAULT_LANGUAGE, page },
  });

  return {
    page: data.page,
    movies: data.results?.map(formatMovie) ?? [],
    totalPages: data.total_pages,
    totalResults: data.total_results,
  };
}
