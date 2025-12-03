"use client";

import type { MovieListResponse } from "@/lib/interfaces/movie.interface";
import { useQuery } from "@tanstack/react-query";

type UseMovieListQueryParams = {
  searchKey: string;
  page: number;
  initialData?: MovieListResponse;
};

export function useMovieListQuery({
  searchKey,
  page,
  initialData,
}: UseMovieListQueryParams) {
  return useQuery<MovieListResponse>({
    queryKey: ["movies", { searchKey, page }],
    queryFn: async () => {
      const params = new URLSearchParams({
        ...(searchKey && { q: searchKey }),
        page: String(page),
      });

      const res = await fetch(`/api/movies/search?${params.toString()}`);
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
  });
}
