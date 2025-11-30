"use server"

export async function fetchDetails() {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=0123456789abcdef0123456789abcdef"
    );
    const data = await response.json();
    return data;
  }