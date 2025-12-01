"use client";
import Image from "next/image";
import { useState } from "react";
import {
  ErrorMap,
  HeroGalleryProps,
} from "../../Interfaces/heroGallery.interface";
import { POSTER_LAYOUT } from "./constants";

export default function HeroGallery({ posters }: HeroGalleryProps) {
  const [errorMap, setErrorMap] = useState<ErrorMap>({});

  return (
    <section className="w-full flex flex-col">
      <div className="relative h-[600px] hidden md:flex">
        {POSTER_LAYOUT.map((slot, index) => {
          return (
            <div key={slot.id} className={slot.wrapperClass}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-rose-600/20">
                <Image
                  alt="Movie poster"
                  className="object-cover"
                  fill
                  src={posters[index]}
                  onError={() =>
                    setErrorMap((prev) => ({ ...prev, [slot.id]: true }))
                  }
                />
              </div>
            </div>
          );
        })}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />
      </div>
    </section>
  );
}
