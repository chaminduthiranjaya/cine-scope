import { Movie } from "@/lib/interfaces/movie.interface";
import { getTrendingMovies } from "@/lib/api/movies.server";
import Hero from "@/views/components/landing/Hero";

export default async function Home() {
  const trendingMovies: Movie[] = await getTrendingMovies();

  return (
    <div className="flex min-h-screen justify-center font-sans">
      <Hero trendingMovies={trendingMovies} />
    </div>
  );
}
