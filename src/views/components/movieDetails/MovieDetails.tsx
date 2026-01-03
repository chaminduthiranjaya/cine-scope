import { Movie } from "@/lib/interfaces/movie.interface";
import {
  Star,
  Clock,
  Calendar,
  Play,
  Bookmark,
  Share2,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

const genres = ["Sci-Fi", "Adventure", "Drama"];

export default function MovieDetails({ movie }: { movie: Movie }) {
  return (
    <div className="min-h-screen bg-[#0f0f12]">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <Image
            src={movie.backdrop}
            alt="Movie backdrop"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-[#0f0f12]/80 to-[#0f0f12]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f12] via-transparent to-[#0f0f12]/60" />
        </div>

        {/* Content */}
        <div className="relative h-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-end pb-16">
          <div className="flex flex-col lg:flex-row gap-8 w-full">
            {/* Movie Poster */}
            <div className="flex-shrink-0">
              <div className="w-72 h-[432px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#1e293b]">
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Movie Info */}
            <div className="flex-1 flex flex-col justify-end">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#e11d48]/20 border border-[#e11d48]/30 rounded-lg mb-4 w-fit">
                <TrendingUp className="w-4 h-4 text-[#e11d48]" />
                <span className="text-sm text-[#e11d48]">Trending Now</span>
              </div>

              <h1 className="mb-4">{movie.title}</h1>

              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xl">{movie.voteAverage}</span>
                  <span className="text-[#94a3b8]">/10</span>
                </div>
                <div className="flex items-center gap-2 text-[#94a3b8]">
                  <Calendar className="w-5 h-5" />
                  <span>{movie.releaseYear}</span>
                </div>
                <div className="flex items-center gap-2 text-[#94a3b8]">
                  <Clock className="w-5 h-5" />
                  <span>2h 28min</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                {movie.genres?.map((genre, index) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 bg-[#1e293b] border border-[#334155] rounded-lg text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 px-8 py-4 bg-[#e11d48] hover:bg-[#be123c] rounded-xl transition-all duration-200 shadow-lg shadow-[#e11d48]/30 hover:scale-105">
                  <Play className="w-5 h-5" />
                  <span>Watch Trailer</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-4 bg-[#1e293b] hover:bg-[#334155] border border-[#334155] rounded-xl transition-all duration-200">
                  <Bookmark className="w-5 h-5" />
                  <span>Add to Watchlist</span>
                </button>
                <button className="p-4 bg-[#1e293b] hover:bg-[#334155] border border-[#334155] rounded-xl transition-all duration-200">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        {/* Synopsis */}
        <section className="mb-16">
          <h2 className="mb-6">Synopsis</h2>
          <p className="text-[#94a3b8] leading-relaxed max-w-4xl">
            {movie.overview}
          </p>
        </section>

        {/* Cast & Crew */}
        <section className="mb-16">
          <h2 className="mb-6">Cast & Crew</h2>
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {castMembers.map((member, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative mb-3 rounded-2xl overflow-hidden aspect-[3/4] bg-[#1e293b]">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="mb-1">{member.name}</h3>
                <p className="text-sm text-[#94a3b8]">{member.role}</p>
              </div>
            ))}
          </div> */}
        </section>

        {/* Ratings Breakdown */}
        <section className="mb-16">
          <h2 className="mb-6">Audience Ratings</h2>
          <div className="bg-gradient-to-br from-[#1e293b] to-[#111827] rounded-3xl p-8 border border-[#334155]">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="text-6xl mb-2">{movie.voteAverage}</div>
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-6 h-6 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-[#94a3b8]">
                  Based on {movie.voteCount} reviews
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { stars: 5, percentage: 75 },
                  { stars: 4, percentage: 15 },
                  { stars: 3, percentage: 6 },
                  { stars: 2, percentage: 3 },
                  { stars: 1, percentage: 1 },
                ].map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-4">
                    <span className="text-sm text-[#94a3b8] w-12">
                      {rating.stars} star
                    </span>
                    <div className="flex-1 h-2 bg-[#334155] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#e11d48] to-[#be123c]"
                        style={{ width: `${rating.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-[#94a3b8] w-12 text-right">
                      {rating.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Similar Movies */}
        <section>
          <h2 className="mb-6">More Like This</h2>
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similarMovies.map((similarMovie) => (
              <div
                key={similarMovie.id}
                className="group cursor-pointer"
              >
                <div className="relative mb-3 rounded-2xl overflow-hidden">
                  <div className="aspect-[2/3] relative">
                    <ImageWithFallback
                      src={similarMovie.image}
                      alt={similarMovie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm">{similarMovie.rating}</span>
                  </div>
                </div>
                <h3 className="group-hover:text-[#e11d48] transition-colors">
                  {similarMovie.title}
                </h3>
              </div>
            ))}
          </div> */}
        </section>
      </div>
    </div>
  );
}
