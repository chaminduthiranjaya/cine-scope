"use client";
import { Movie } from "@/lib/interfaces/movie.interface";
import { getHeroGalleryPosters } from "@/views/utils/movie.util";
import { useSession } from "next-auth/react";
import Link from "next/link";
import HeroGallery from "./HeroGallery";
import HeroStats from "./HeroStats";
import TrendingMoviesList from "./trending/TrendingMoviesList";

export default function Hero({ trendingMovies }: { trendingMovies: Movie[] }) {
  const galleryPosrters = getHeroGalleryPosters(trendingMovies, 4);
  const { status } = useSession();
  return (
    <section className="flex flex-col items-center w-full">
      <div className="max-w-[1400px] w-full flex flex-row justify-center">
        <div className="lg:flex-2">
          <h1>Discover your next favorite movie.</h1>
          <p className="max-w-xl text-sm text-slate-300 sm:text-base mt-10 mb-10">
            Search, explore, and build your watchlist with real-time movie data.
            Join thousands of movie enthusiasts discovering their next cinematic
            adventure.
          </p>
          <div className="flex flex-wrap gap-4">
            {status === "unauthenticated" && (
              <Link
                href="/login"
                className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-all duration-200 shadow-2xl shadow-rose-600/30 hover:shadow-rose-600/40 hover:scale-105"
              >
                Get Started
              </Link>
            )}
          </div>
          <HeroStats />
        </div>
        <div className="hidden lg:flex lg:flex-2">
          <HeroGallery posters={galleryPosrters} />
        </div>
      </div>
      <TrendingMoviesList trendingMovies={trendingMovies} />
    </section>
  );
}
