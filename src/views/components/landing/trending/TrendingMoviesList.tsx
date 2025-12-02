import MovieCard from "@/lib/components/movie/MovieCard";
import { Movie } from "@/lib/interfaces/movie.interface";

export default function TrendingMoviesList({
  trendingMovies,
}: {
  trendingMovies: Movie[];
}) {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0f0f12] via-[#111827] to-[#0f0f12]">
      <div className="flex w-full overflow-x-auto scrollbar-hide gap-6">
        {trendingMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            displayAddToWatchlistButton={false}
          />
        ))}
      </div>
    </section>
  );
}
