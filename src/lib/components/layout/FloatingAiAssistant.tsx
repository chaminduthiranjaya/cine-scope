"use client";

import { useState } from "react";
import { MessageCircle, Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAiResolveMovie } from "@/lib/hooks/useAiResolveMovie";
import type {
  AiMovieQueryResult,
  Movie,
} from "@/lib/interfaces/movie.interface";

export default function FloatingAiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const { data, error, isLoading, resolve, reset } = useAiResolveMovie();

  // Optional: hide on login/signup
  const isAuthPage = pathname === "/login" || pathname === "/register";
  if (isAuthPage) return null;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res: AiMovieQueryResult | null = await resolve(value);

    if (res?.status === "found" && res?.results?.movies?.length === 1) {
      router.push(`/movie/${res.results.movies[0].id}`);
      setIsOpen(false);
    }
  }

  function onMovieClick(movieId: number) {
    router.push(`/movie/${movieId}`);
    setIsOpen(false);
    setValue("");
    reset();
  }

  const movies: Movie[] =
    data?.status === "found" ? data?.results?.movies?.slice(0, 5) || [] : [];

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className="fixed bottom-6 right-6 z-[60] rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-xl shadow-rose-600/40 w-14 h-14 flex items-center justify-center transition-transform duration-200 hover:scale-105"
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[59] w-[360px] max-w-[90vw]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
              <div>
                <p className="text-sm font-semibold text-slate-50">
                  CineScope AI
                </p>
                <p className="text-xs text-slate-400">
                  Describe a movie and I’ll find it on TMDB
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-800 text-slate-300"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 scrollbar scrollbar-thin max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-600">
              <form onSubmit={onSubmit} className="flex gap-2">
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder='e.g. "guy stuck on Mars growing potatoes"'
                  className="flex-1 rounded-xl bg-slate-950/60 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/60"
                />
                <button
                  type="submit"
                  disabled={isLoading || !value.trim()}
                  className="rounded-xl bg-rose-600 px-3 py-2 text-sm text-white hover:bg-rose-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <Search className="w-4 h-4" />
                  {isLoading ? "..." : "Go"}
                </button>
              </form>

              {error && <p className="mt-3 text-xs text-rose-400">{error}</p>}

              {/* Results */}
              <div className="mt-4 space-y-2">
                {isLoading && (
                  <div className="space-y-2">
                    <div className="h-12 rounded-xl bg-slate-800/60 animate-pulse" />
                    <div className="h-12 rounded-xl bg-slate-800/60 animate-pulse" />
                  </div>
                )}

                {data?.status === "not_found" && (
                  <div className="text-sm text-slate-300">
                    <p className="font-medium">No match</p>
                    <p className="text-xs text-slate-400">{data.reason}</p>
                  </div>
                )}

                {data?.status === "partial_found" && (
                  <div className="text-sm text-slate-300">
                    <p className="font-medium">Not an exact match</p>
                    <p className="text-xs text-slate-400">{data.reason}</p>

                    {data.suggestion?.length ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {data.suggestion.slice(0, 6).map((s) => (
                          <span
                            key={s}
                            className="text-xs px-2 py-1 rounded-lg bg-slate-800 text-slate-200"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )}

                {data?.status === "found" && (
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-100 mb-2">
                        Top matches
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          reset();
                          setValue("");
                        }}
                        disabled={
                          isLoading || !value.trim() || movies.length === 0
                        }
                        className="text-xs rounded-sm bg-rose-600 px-1 py-1 text-white hover:bg-rose-700 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1"
                      >
                        Reset
                      </button>
                    </div>

                    <div className="space-y-2">
                      {movies &&
                        movies.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => onMovieClick(m.id)}
                            className="w-full text-left rounded-xl border border-slate-800 hover:border-rose-600/70 bg-slate-950/40 hover:bg-slate-950/60 px-3 py-2 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-slate-100">
                                {m.title}
                              </span>
                              <span className="text-xs text-slate-400">
                                {m.releaseYear}
                              </span>
                            </div>
                            {m.overview ? (
                              <p className="mt-1 text-xs text-slate-400 line-clamp-2">
                                {m.overview}
                              </p>
                            ) : null}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
