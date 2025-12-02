"use client";
import { Movie } from "@/lib/interfaces/movie.interface";
import { Star } from "lucide-react";
import Image from "next/image";

export default function TrendingMovie({ movie }: { movie: Movie }) {
  return (
    <div className=" flex-shrink-0 w-64 group cursor-pointer">
      <div className="relative mb-4 rounded-2xl overflow-hidden">
        <div className="aspect-[2/3] relative">
          <Image
            src={movie.poster}
            alt={`${movie.title} movie poster`}
            fill
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg flex items-center gap-1.5">
          <Star className="w- h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm">{movie.voteAverage}</span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-full py-2.5 bg-[#e11d48] hover:bg-[#be123c] rounded-lg transition-colors">
            Add to Watchlist
          </button>
        </div>
      </div>

      <h3 className="mb-1 group-hover:text-[#e11d48] transition-colors">
        {movie.title}
      </h3>
      <p className="text-sm text-[#94a3b8]">{movie.releaseYear}</p>
    </div>
  );
}
