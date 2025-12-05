"use client";
import { toBase64, useShimmer } from "@/lib/hooks/shimmer";
import { MovieCardProps } from "@/lib/interfaces/movie.interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToWatchList, removeFromWatchList } from "@/store/watchListSlice";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import placeholder from "../../../../public/images/movie_poster_fallback.png";

export default function MovieCard({
  movie,
  displayAddToWatchlistButton = false,
  useBlurPlaceholder = false,
}: MovieCardProps) {
  const [isErrLoad, setIsErrLoad] = useState(false);
  const dispatch = useAppDispatch();

  const isInWatchlist = useAppSelector(
    (state) => !!state.watchList.items[movie.id]
  );

  function addToWatchlist(
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) {
    if (isInWatchlist) {
      dispatch(removeFromWatchList(movie.id));
    } else {
      dispatch(addToWatchList(movie));
    }
  }
  return (
    <div className="flex-shrink-0 w-60 group cursor-pointer">
      <div className="relative mb-4 rounded-2xl overflow-hidden">
        <div className="aspect-[2/3] relative">
          <Image
            src={isErrLoad ? placeholder : movie.poster}
            alt={`${movie.title} movie poster`}
            width={300}
            height={450}
            placeholder={useBlurPlaceholder ? "blur" : "empty"}
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              useShimmer(300, 450)
            )}`}
            onError={() => setIsErrLoad(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg flex items-center gap-1.5">
          <Star className="w- h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm">{movie.voteAverage}</span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {displayAddToWatchlistButton && (
            <button
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors"
              onClick={addToWatchlist}
            >
              {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>
          )}
        </div>
      </div>

      <h3 className="mb-1 group-hover:text-rose-600 transition-colors">
        {movie.title}
      </h3>
      <p className="text-sm text-slate-400">{movie.releaseYear}</p>
    </div>
  );
}
