import { Movie } from "@/domain/movies/api/movie.interface";
import { getHeroGalleryPosters } from "@/domain/movies/utils/movie.util";
import HeroGallery from "./HeroGallery";
import HeroStats from "./HeroStats";
import TrendingMoviesList from "./trending/TrendingMoviesList";

export default function Hero({ trendingMovies }: { trendingMovies: Movie[] }) {
  const galleryPosrters = getHeroGalleryPosters(trendingMovies, 4);
  return (
    <section className="flex flex-col w-full max-w-[1400px] justify-center p-6 md:p-12">
      <div className="flex flex-row">
        <div className="lg:flex-2">
          <h1>Discover your next favorite movie.</h1>
          <p className="max-w-xl text-sm text-slate-300 sm:text-base mt-10 mb-10">
            Search, explore, and build your watchlist with real-time movie data.
            Join thousands of movie enthusiasts discovering their next cinematic
            adventure.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-all duration-200 shadow-2xl shadow-rose-600/30 hover:shadow-rose-600/40 hover:scale-105">
              Get Started
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-slate-700 hover:border-rose-600 text-white rounded-xl transition-all duration-200 hover:bg-rose-600/5">
              Browse as Guest
            </button>
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
