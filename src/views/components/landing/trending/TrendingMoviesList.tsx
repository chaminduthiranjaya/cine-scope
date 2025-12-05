import MovieCard from "@/lib/components/movie/MovieCard";
import { Movie } from "@/lib/interfaces/movie.interface";

export default function TrendingMoviesList({
  trendingMovies,
}: {
  trendingMovies: Movie[];
}) {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="flex w-full overflow-x-auto scrollbar-hide gap-6">
        {trendingMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            displayAddToWatchlistButton={true}
          />
        ))}
      </div>
    </section>
  );
}
