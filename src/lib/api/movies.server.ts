import "server-only";
import { formatMovie } from "../../views/utils/movie.util";
import type {
  ApiMovie,
  GetMovieListParams,
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
  try {
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
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
}

export async function getMovieList({
  page,
  query,
}: GetMovieListParams): Promise<MovieListResponse> {
  try {
    const isSearch = !!query && query.trim().length > 0;
    const data = await callTMDB<PagedResponse<ApiMovie>>(
      isSearch ? "search/movie" : "movie/popular",
      {
        params: {
          query,
          page,
          language: DEFAULT_LANGUAGE,
        },
        fetch: {
          next: { revalidate: isSearch ? 0 : 3600, tags: ["movie-list"] },
        },
      }
    );
    return {
      page: data.page,
      movies: data.results?.map(formatMovie) ?? [],
      totalPages: data.total_pages > 500 ? 500 : data.total_pages, // TMDB Free API limitation, only allows to paginate 500 pages
      totalResults: data.total_results,
    };
  } catch (error) {
    console.error("Error fetching movie list:", error);
    return {
      page: 1,
      movies: [],
      totalPages: 0,
      totalResults: 0,
    };
  }
}
