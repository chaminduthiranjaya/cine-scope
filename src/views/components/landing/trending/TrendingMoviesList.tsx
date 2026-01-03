import MovieCard from "@/lib/components/movie/MovieCard";
import { Movie } from "@/lib/interfaces/movie.interface";

export default function TrendingMoviesList({
  trendingMovies,
}: {
  trendingMovies: Movie[];
}) {
  return (
    <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-[#0f0f12] via-[#111827] to-[#0f0f12] w-full flex justify-center">
      <div className="max-w-[1400px] w-full">
        {" "}
        <div className="flex overflow-x-auto scrollbar-hide gap-6 scrollbar scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-600">
          {trendingMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              displayAddToWatchlistButton={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
