"use client";
import MovieCard from "@/lib/components/movie/MovieCard";
import Pagination from "@/lib/components/movie/Pagination";
import { MovieListResponse } from "@/lib/interfaces/movie.interface";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

type ExploreProps = {
  initialData: MovieListResponse;
};

export default function Explore({ initialData }: ExploreProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchKey = (searchParams.get("q") ?? "").trim();
  const pageParam = Number(searchParams.get("page") ?? "1");
  const page = pageParam > 0 ? pageParam : 1;
  const movieListContainerRef = useRef<HTMLDivElement | null>(null);

  const { data } = useQuery<MovieListResponse>({
    queryKey: ["movies", { searchKey, page }],
    queryFn: async () => {
      const params = new URLSearchParams({
        ...(searchKey && { searchKey }),
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

  function handlePageChange(nextPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));

    const url = `${pathname}?${params.toString()}`;
    router.replace(url, { scroll: false });

    // Smooth scroll to grid top
    movieListContainerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  const movies = data?.movies ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <section className="flex flex-col w-full max-w-[1400px] p-6 md:p-12">
      <div className="mb-12">
        <h1 className="mb-4">Explore Movies</h1>
        <p className="text-[#94a3b8]">
          Discover your next favorite from our vast collection
        </p>
      </div>

      <div
        id="movie-list-container"
        className="flex flex-wrap gap-6 mb-16"
        ref={movieListContainerRef}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {page}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
