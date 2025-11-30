"use client";
import Image from "next/image";
import { useState } from "react";
import placeholder from "../../../../public/images/movie_poster_fallback.png";
import { ErrorMap, HeroGalleryProps } from "../../Interfaces/heroGallery.interface";
import { POSTER_LAYOUT } from "./constants";

export default function HeroGallery({ posters }: HeroGalleryProps) {
  const [errorMap, setErrorMap] = useState<ErrorMap>({});

  return (
    <section className="w-full flex flex-col">
      <div className="relative h-[600px] hidden md:flex">
        {POSTER_LAYOUT.map((slot, index) => {
          const src = errorMap[slot.id]
            ? placeholder
            : posters[index] ?? placeholder;

          return (
            <div key={slot.id} className={slot.wrapperClass}>
              <Image
                alt="Movie poster"
                className="object-cover"
                fill
                src={src}
                onError={() =>
                  setErrorMap((prev) => ({ ...prev, [slot.id]: true }))
                }
              />
            </div>
          );
        })}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#e11d48]/10 rounded-full blur-[120px] pointer-events-none" />
      </div>
    </section>
  );
}
