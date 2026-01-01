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

export interface MovieListResponse {
  page: number;
  movies: Movie[];
  totalPages: number;
  totalResults: number;
}

export interface TMDBParams {
  [key: string]: string | number | boolean | undefined;
}

export interface MovieCardProps {
  movie: Movie;
  displayAddToWatchlistButton?: boolean;
  useBlurPlaceholder?: boolean;
}

export interface GetMovieListParams {
  page: number;
  query?: string;
  year?: string;
};

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export interface UseMovieListQueryParams {
  searchKey: string;
  page: number;
  initialData?: MovieListResponse;
};

export interface AiMovieExtraction {
  primary_title?: string;
  alternative_titles?: string[];
  year?: string;
  query: string;
}

export interface AiMovieQueryResult {
  status: "not_found" | "not_exact_match" | "found";
  reason?: string;
  suggestion?: string[];
  results?: MovieListResponse;
}