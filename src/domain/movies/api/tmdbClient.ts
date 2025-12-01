import "server-only";

const TMDB_API_URL = "https://api.themoviedb.org/3";
const TMDB_BEARER = process.env.TMDB_BEARER_TOKEN;

if (!TMDB_BEARER) {
  throw new Error("TMDB_BEARER_TOKEN is not set");
}

type TMDBParams = Record<string, string | number | boolean | undefined>;

export async function callTMDB<TResponse>(
  path: string,
  params: TMDBParams = {},
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body: any = {}
): Promise<TResponse> {
  const url = new URL(`${TMDB_API_URL}/${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value != null) {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url.toString(), {
    method,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_BEARER}`,
    },
    ...(body && method !== "GET" && { body: JSON.stringify(body) }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("TMDB error:", res.status, text);
    throw new Error(`TMDB request failed (${res.status})`);
  }

  return res.json();
}
