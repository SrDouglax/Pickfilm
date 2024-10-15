"use client";

// Imports
import { useState } from "react";
import AllGenres, { genres, genreType } from "./components/allGenres/AllGenres";
import MovieDisplay from "./components/movieDisplay/MovieDisplay";
import SetFilters, { filterType } from "./components/setFilters/SetFilters";

export default function Home({ params }: { params: { filmId: string } }) {
  const [selectedGenre, setSelectedGenre] = useState<genreType | undefined>(params.filmId ? genres[0] : undefined);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filters, setFilters] = useState<filterType>({
    adult: true,
    enabledSorts: {
      date: false,
      popularity: true,
      revenue: true,
      votes: true,
    },
    watchProviders: [],
  });

  return (
    <main className="flex flex-col relative w-full h-full overflow-hidden">
      <AllGenres
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        showFilterOptions={showFilterOptions}
        setShowFilterOptions={setShowFilterOptions}
      />
      <MovieDisplay
        selectedGenre={selectedGenre}
        setFilters={setFilters}
        setSelectedGenre={setSelectedGenre}
        filters={filters}
        starterFilmId={Number(params.filmId)}
      />
      <SetFilters filters={filters} setFilters={setFilters} showFilterOptions={showFilterOptions} setShowFilterOptions={setShowFilterOptions} />
    </main>
  );
}
