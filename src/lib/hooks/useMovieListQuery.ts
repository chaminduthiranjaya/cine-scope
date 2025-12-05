"use client";

import type {
  MovieListResponse,
  UseMovieListQueryParams,
} from "@/lib/interfaces/movie.interface";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch movie list based on search key and page number
 * @param param0 - Object containing search key and page number
 * @returns - Query object containing movie list data
 */
export function useMovieListQuery({
  searchKey,
  page,
  initialData,
}: UseMovieListQueryParams) {
  return useQuery<MovieListResponse>({
    queryKey: ["movies", { searchKey, page }],
    queryFn: async ({ signal }) => {
      const params = new URLSearchParams({
        ...(searchKey && { searchKey }),
        page: String(page),
      });

      const res = await fetch(`/api/movies/search?${params.toString()}`, {
        signal,
      });
      if (!res.ok) {
        throw new Error("Failed to fetch movies");
      }
      return res.json();
    },
    initialData:
      initialData && !searchKey && page === initialData.page
        ? initialData
        : undefined,
    placeholderData: (previous) => previous,
    staleTime: 60 * 60 * 1000,
  });
}
