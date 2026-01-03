"use client";

import { useState } from "react";
import type { AiMovieQueryResult } from "@/lib/interfaces/movie.interface";

export function useAiResolveMovie() {
  const [data, setData] = useState<AiMovieQueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function resolve(
    description: string
  ): Promise<AiMovieQueryResult | null> {
    const trimmed = description.trim();
    if (!trimmed) return null;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/resolve-movie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: trimmed }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.error || "Request failed");
      }

      setData(json as AiMovieQueryResult);
      return json as AiMovieQueryResult;
    } catch (e: any) {
      setData(null);
      setError(e?.message ?? "Something went wrong");
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  function reset() {
    setData(null);
    setError(null);
    setIsLoading(false);
  }

  return { data, error, isLoading, resolve, reset };
}
