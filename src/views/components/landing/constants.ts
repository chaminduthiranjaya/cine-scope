import { PosterLayoutItem } from "../../Interfaces/heroGallery.interface";

export const POSTER_LAYOUT: PosterLayoutItem[] = [
  {
    id: "first",
    wrapperClass:
      "absolute top-0 right-24 w-64 h-96 rounded-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-300",
  },
  {
    id: "second",
    wrapperClass:
      "absolute top-10 left-0 w-56 h-80 rounded-2xl overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-300",
  },
  {
    id: "third",
    wrapperClass:
      "absolute bottom-16 left-12 w-52 h-72 rounded-2xl overflow-hidden transform rotate-6 hover:rotate-0 transition-transform duration-300",
  },
  {
    id: "fourth",
    wrapperClass:
      "absolute bottom-4 right-12 w-48 h-64 rounded-2xl overflow-hidden transform -rotate-6 hover:rotate-0 transition-transform duration-300",
  },
];
