export interface ApiMovie {
  id: number;
  title?: string;
  name?: string;
  overview?: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average?: number;
  vote_count?: number;
  release_date?: string;
  popularity?: number;
  genre_ids?: number[];
}

export interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  poster: string;
  backdrop: string;
  voteAverage?: string;
  voteCount?: number;
  releaseDate?: string;
  releaseYear?: number;
  popularity?: number;
  genreIds?: number[];
}

export interface PagedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBParams {
  [key: string]: string | number | boolean | undefined;
}
