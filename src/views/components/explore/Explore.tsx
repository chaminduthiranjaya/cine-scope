"use client";
import MovieCard from "@/lib/components/movie/MovieCard";
import Pagination from "@/lib/components/movie/Pagination";
import { useMovieListQuery } from "@/views/hooks/useMovieListQuery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import type { ExploreProps } from "./explore.interface";

export default function Explore({ initialData }: ExploreProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchKey = (searchParams.get("q") ?? "").trim();
  const pageParam = Number(searchParams.get("page") ?? "1");
  const page = pageParam > 0 ? pageParam : 1;
  const movieListContainerRef = useRef<HTMLDivElement | null>(null);

  const { data, isFetching } = useMovieListQuery({
    searchKey,
    page,
    initialData,
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
    <section
      className="flex flex-col w-full max-w-[1400px] p-6 md:p-12"
      ref={movieListContainerRef}
    >
      <div className="mb-12">
        <h1 className="mb-4">Explore Movies</h1>
        <p className="text-[#94a3b8]">
          Discover your next favorite from our vast collection
        </p>
      </div>

      {isFetching ? (
        <div className="flex flex-wrap gap-6 mb-16">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div className="flex-shrink-0 w-60">
              <div
                key={idx}
                className=" relative mb-4 rounded-2xl flex aspect-[2/3] rounded-xl bg-slate-800/60 animate-pulse"
              />
            </div>
          ))}
        </div>
      ) : (
        <div id="movie-list-container" className="flex flex-wrap gap-6 mb-16">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
