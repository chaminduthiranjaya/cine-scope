"use client";

import MovieCard from "@/lib/components/movie/MovieCard";
import { useAppSelector } from "@/store/hooks";

export default function WatchList() {
  const items = useAppSelector((state) => state.watchList.items);
  const movies = Object.values(items);

  return (
    <section className="flex flex-col w-full max-w-[1400px] p-6 md:p-12">
      <div className="mb-12">
        <h1 className="mb-4">Your Watchlist</h1>
        <p className="text-[#94a3b8]">
          All the movies you&apos;ve saved to watch later.
        </p>
      </div>

      {movies.length === 0 ? (
        <p className="text-[#94a3b8]">
          Your watchlist is empty. Start adding movies from Explore.
        </p>
      ) : (
        <div className="flex flex-wrap gap-6 mb-16">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              displayAddToWatchlistButton
              useBlurPlaceholder
            />
          ))}
        </div>
      )}
    </section>
  );
}
