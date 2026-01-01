import "server-only";

const TMDB_API_URL = "https://api.themoviedb.org/3";
const TMDB_BEARER = process.env.TMDB_BEARER_TOKEN;

if (!TMDB_BEARER) {
  throw new Error("TMDB_BEARER_TOKEN is not set");
}

interface TMDBParams {
  [key: string]: string | number | boolean | undefined;
}

interface TMDBRequestOptions {
  params?: TMDBParams;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  fetch?: RequestInit & {
    next?: {
      revalidate?: number;
      tags?: string[];
    };
  };
}

/**
 * Makes a request to the TMDB API
 * @param path - TMDB API endpoint
 * @param options - Request options
 * @returns Promise resolving to response data
 */
export async function callTMDB<TResponse>(
  path: string,
  options: TMDBRequestOptions = {}
): Promise<TResponse> {
  const {
    params = {},
    method = "GET",
    body,
    fetch: fetchOptions = {},
  } = options;

  const url = new URL(`${TMDB_API_URL}/${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value != null) {
      url.searchParams.set(key, String(value));
    }
  });

  const baseInit: RequestInit = {
    method,
    ...(fetchOptions.next && {
      next: {
        revalidate: fetchOptions.next?.revalidate,
        tags: fetchOptions.next?.tags,
      },
    }),
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_BEARER}`,
      ...(fetchOptions.headers || {}),
    },
  };

  if (body && method !== "GET") {
    baseInit.body = JSON.stringify(body);
  }

  const res = await fetch(url.toString(), {
    ...baseInit,
    ...fetchOptions,
    headers: {
      ...(baseInit.headers || {}),
      ...(fetchOptions.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("TMDB error:", res.status, text);
    throw new Error(`TMDB request failed (${res.status})`);
  }

  return res.json();
}
