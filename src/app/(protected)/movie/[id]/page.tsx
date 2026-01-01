import { getMovieDetails } from "@/lib/api/movies.server";
import { Movie } from "@/lib/interfaces/movie.interface";
import MovieDetails from "@/views/components/movieDetails/MovieDetails";
import { notFound } from "next/navigation";

export default async function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  if (!Number.isFinite(Number(id))) notFound();

  const movie: Movie = await getMovieDetails(Number(id));
  if (!movie) notFound();

  return <MovieDetails movie={movie} />;
}
