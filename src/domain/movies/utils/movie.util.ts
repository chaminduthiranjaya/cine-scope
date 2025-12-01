import { ApiMovie, Movie } from "../api/movie.interface";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

/**
 * Formats an API movie object into a Movie object
 * @param movie The API movie object to format
 * @returns The formatted Movie object
 */
export function formatMovie(movie: ApiMovie): Movie {
  return {
    releaseYear: movie.release_date
      ? new Date(movie.release_date).getFullYear()
      : undefined,
    poster: `${TMDB_IMAGE_BASE}${movie.poster_path}`,
    backdrop: `${TMDB_IMAGE_BASE}${movie.backdrop_path}`,
    voteAverage: movie.vote_average?.toFixed(1),
    voteCount: movie.vote_count,
    popularity: movie.popularity,
    genreIds: movie.genre_ids,
    id: movie.id,
    title: movie.title,
    overview: movie.overview || "",
  };
}

/**
 * Gets the posters for the hero gallery
 * @param movies The movies to get posters from
 * @param count The number of posters to get
 * @returns An array of posters
 */
export function getHeroGalleryPosters(movies: Movie[], count: number): string[] {
  if (!movies?.length) return [];

  const validPosters = movies.filter((m) => m.poster).map((m) => m.poster);

  if (!validPosters.length) return [];

  return validPosters.slice(validPosters.length - count, validPosters.length);
}
