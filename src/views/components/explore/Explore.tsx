import { getMovieList } from "@/lib/api/movies.server";
import MovieCard from "@/lib/components/movie/MovieCard";
import Pagination from "@/lib/components/movie/Pagination";
import { MovieListResponse } from "@/lib/interfaces/movie.interface";

export default async function Explore() {
  const data: MovieListResponse = await getMovieList(1);

  return (
    <section className="flex flex-col w-full max-w-[1400px] p-6 md:p-12">
      <div className="mb-12">
        <h1 className="mb-4">Explore Movies</h1>
        <p className="text-[#94a3b8]">
          Discover your next favorite from our vast collection
        </p>
      </div>

      <div className="flex flex-wrap gap-6 mb-16">
        {data.movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <Pagination currentPage={10} totalPages={data.totalPages} />
    </section>
  );
}
