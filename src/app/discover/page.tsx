"use client";
import { MdClose, MdAccessTimeFilled, MdStar, MdRefresh } from "react-icons/md";
import { Montserrat } from "next/font/google";
import GenreDisplay from "./components/genreDisplay";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  MdMovie,
  MdMusicNote,
  MdLocalCafe,
  MdFlight,
  MdSentimentSatisfied,
  MdDirectionsRun,
  MdLibraryBooks,
  MdNaturePeople,
  MdPeople,
  MdLocalPlay,
  MdWhatshot,
  MdTheaters,
  MdLocalPizza,
  MdChildCare,
  MdBusinessCenter,
} from "react-icons/md";

const montserrat = Montserrat({ subsets: ["latin"] });

const genres = [
  {
    id: 28,
    name: "Ação",
    icon: MdDirectionsRun,
    bgColorClass: "bg-red-500",
    classNames: "shadow-red-800 hover:shadow-red-900 animate-in",
  },
  {
    id: 12,
    name: "Aventura",
    icon: MdFlight,
    bgColorClass: "bg-blue-500",
    classNames: "shadow-blue-800 hover:shadow-blue-900 animate-in",
  },
  {
    id: 16,
    name: "Animação",
    icon: MdChildCare,
    bgColorClass: "bg-slate-500",
    classNames: "shadow-slate-800 hover:shadow-slate-900 animate-in",
  },
  {
    id: 35,
    name: "Comédia",
    icon: MdSentimentSatisfied,
    bgColorClass: "bg-yellow-500",
    classNames: "shadow-yellow-800 hover:shadow-yellow-900 animate-in",
  },
  {
    id: 80,
    name: "Crime",
    icon: MdLocalCafe,
    bgColorClass: "bg-indigo-500",
    classNames: "shadow-indigo-800 hover:shadow-indigo-900 animate-in",
  },
  {
    id: 99,
    name: "Documentário",
    icon: MdLibraryBooks,
    bgColorClass: "bg-green-500",
    classNames: "shadow-green-800 hover:shadow-green-900 animate-in",
  },
  {
    id: 18,
    name: "Drama",
    icon: MdMovie,
    bgColorClass: "bg-pink-500",
    classNames: "shadow-pink-800 hover:shadow-pink-900 animate-in",
  },
  {
    id: 10751,
    name: "Família",
    icon: MdChildCare,
    bgColorClass: "bg-indigo-500",
    classNames: "shadow-indigo-800 hover:shadow-indigo-900 animate-in",
  },
  {
    id: 14,
    name: "Fantasia",
    icon: MdNaturePeople,
    bgColorClass: "bg-purple-500",
    classNames: "shadow-purple-800 hover:shadow-purple-900 animate-in",
  },
  {
    id: 36,
    name: "História",
    icon: MdPeople,
    bgColorClass: "bg-teal-500",
    classNames: "shadow-teal-800 hover:shadow-teal-900 animate-in",
  },
  {
    id: 27,
    name: "Terror",
    icon: MdLocalPlay,
    bgColorClass: "bg-pink-500",
    classNames: "shadow-pink-800 hover:shadow-pink-900 animate-in",
  },
  {
    id: 10402,
    name: "Música",
    icon: MdMusicNote,
    bgColorClass: "bg-yellow-500",
    classNames: "shadow-yellow-800 hover:shadow-yellow-900 animate-in",
  },
  {
    id: 9648,
    name: "Mistério",
    icon: MdWhatshot,
    bgColorClass: "bg-red-500",
    classNames: "shadow-red-800 hover:shadow-red-900 animate-in",
  },
  {
    id: 10749,
    name: "Romance",
    icon: MdSentimentSatisfied,
    bgColorClass: "bg-blue-500",
    classNames: "shadow-blue-800 hover:shadow-blue-900 animate-in",
  },
  {
    id: 878,
    name: "Ficção científica",
    icon: MdWhatshot,
    bgColorClass: "bg-slate-500",
    classNames: "shadow-slate-800 hover:shadow-slate-900 animate-in",
  },
  {
    id: 10770,
    name: "Cinema TV",
    icon: MdTheaters,
    bgColorClass: "bg-green-500",
    classNames: "shadow-green-800 hover:shadow-green-900 animate-in",
  },
  {
    id: 53,
    name: "Thriller",
    icon: MdWhatshot,
    bgColorClass: "bg-pink-500",
    classNames: "shadow-pink-800 hover:shadow-pink-900 animate-in",
  },
  {
    id: 10752,
    name: "Guerra",
    icon: MdBusinessCenter,
    bgColorClass: "bg-yellow-500",
    classNames: "shadow-yellow-800 hover:shadow-yellow-900 animate-in",
  },
  {
    id: 37,
    name: "Faroeste",
    icon: MdLocalPizza,
    bgColorClass: "bg-blue-500",
    classNames: "shadow-blue-800 hover:shadow-blue-900 animate-in",
  },
];

interface filmType {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface watchProviderType {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

interface genreType {
  id: number;
  name: string;
}

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState<genreType>();
  const [film, setFilm] = useState<filmType>();
  const [lastReset, setLastReset] = useState<number>(0);
  const [watchProviders, setWatchProviders] = useState<watchProviderType[]>();

  useEffect(() => {
    if (selectedGenre) {
      setFilm(undefined);
      setWatchProviders(undefined);

      const sortList = ["popularity.desc", "revenue.desc", "vote_count.desc"];
      const sort = sortList[Math.round((sortList.length - 1) * Math.random())];

      const page = Math.round(10 * Math.random()) + 1;

      const url = `https://api.themoviedb.org/3/discover/movie?language=pt-BR&page=${page}&sort_by=${sort}&with_genres=${selectedGenre.id}`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNThkZjI3NjVlNzVjZjcxOTU3OTQwOWQwYTZlZDE0ZCIsInN1YiI6IjYwNGU0N2I5NzMxNGExMDA0MGYzM2ZiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wcXwGa73OY0MtxHkeJtPxNLk6POBstoCWWEd-a9XOXs",
        },
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          const selectedFilm: filmType = json.results[Math.round(Math.random() * 19)];
          console.log(selectedFilm, json);
          fetch(
            `https://api.themoviedb.org/3/movie/${selectedFilm.id}?language=pt-BR`,
            options
          )
            .then((res) => res.json())
            .then((json) => {
              setFilm(json);
              console.log(json);
            });
          fetch(
            `https://api.themoviedb.org/3/movie/${selectedFilm.id}/watch/providers`,
            options
          )
            .then((res) => res.json())
            .then((json) => {
              setWatchProviders(json.results["BR"]?.flatrate);
              console.log(json.results["BR"]?.flatrate);
            });
        });
    }
  }, [selectedGenre, lastReset]);

  return (
    <main className="flex flex-col relative w-full h-full overflow-hidden">
      <div
        className={`${
          selectedGenre === undefined
            ? "opacity-100 scale-100 z-50"
            : "opacity-0 scale-90 z-0"
        } absolute top-0 right-0 ease-in-out duration-200 flex flex-col items-center overflow-hidden w-full h-full px-4 py-8`}>
        <Link href="/" className="text-4xl font-bold" style={montserrat.style}>
          <span className="text-white">FIL</span>
          <span className="text-violet-800">MEETER</span>
        </Link>
        <h2
          className={`ease-in-out text-lg font-bold text-white duration-200 ${
            selectedGenre == undefined ? "h-6 mt-4" : "h-0 overflow-hidden"
          }`}
          style={montserrat.style}>
          O que deseja assistir hoje?
        </h2>
        <section
          className={`max-w-4xl w-full mt-2 gap-3 grid grid-cols-1 sm:grid-cols-2 py-3 overflow-y-auto pr-3 styled-scroll ease-in-out duration-200 ${
            selectedGenre == undefined ? " top-0" : "relative top-full"
          }`}>
          {genres.map((genre, index) => (
            <GenreDisplay
              key={index}
              icon={genre.icon}
              name={genre.name}
              classNames={`${genre.bgColorClass} ${genre.classNames}`}
              onClick={() => {
                setSelectedGenre(genre);
              }}
            />
          ))}
        </section>
      </div>
      <div
        className={`${
          selectedGenre !== undefined
            ? "opacity-100 scale-100 z-50"
            : "opacity-0 scale-110 z-0"
        } ease-in-out duration-200 flex flex-col w-full absolute h-full top-0 left-1/2 -translate-x-1/2`}>
        <div
          className="ease-in-out duration-200 flex flex-col w-full bg-center bg-cover"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${film?.backdrop_path})`,
          }}>
          <div className="ease-in-out items-center duration-200 flex flex-col w-full bg-gradient-to-b from-[#0009] to-zinc-800">
            <div className="max-w-xl w-full flex flex-col">
              <div className="flex w-full justify-between p-4 h-min">
                <div className="flex gap-3 items-center">
                  <div
                    className={`${
                      genres.find((e) => e.id == selectedGenre?.id)?.bgColorClass
                    } w-0.5 h-3/4 rounded-full`}></div>
                  <p className="text-white text-xl">{selectedGenre?.name || "???"}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <MdRefresh
                    onClick={() => setLastReset(Date.now())}
                    className={`text-white text-3xl cursor-pointer`}
                  />
                  <MdClose
                    onClick={() => setSelectedGenre(undefined)}
                    className={`text-white text-4xl cursor-pointer`}
                  />
                </div>
              </div>
              {film !== undefined && (
                <div className="flex flex-col h-full w-full px-4">
                  <div className="flex flex-col gap-4">
                    <h1 // Título
                      className={"text-white text-3xl font-bold"}>
                      {film?.title}
                      <span className="ml-3 text-base text-white text-opacity-50">
                        ({new Date(film?.release_date || Date.now()).getFullYear()})
                      </span>
                    </h1>
                    <div // Foto e informações
                      className="flex gap-4 h-56">
                      {/* Foto do filme */}
                      {film?.poster_path && (
                        <Image
                          src={`https://image.tmdb.org/t/p/original${film?.poster_path}`}
                          className="h-full rounded-lg w-min flex-shrink-0 object-cover bg-black bg-opacity-50"
                          alt={"Poster do filme"}
                          width={2000}
                          height={3000}
                          priority
                        />
                      )}
                      {/* Informações do filme */}
                      <div className="flex flex-col gap-2 py-2">
                        <p // Descrição
                          className={
                            "text-white text-sm h-full text-opacity-70 leading-tight styled-scroll overflow-auto pr-2"
                          }>
                          {film?.overview}
                        </p>
                        <div // Categorias
                          className="flex gap-2 overflow-x-auto flex-shrink-0 w-full flex-wrap-reverse mt-2">
                          {film?.genres.map((e: genreType) => {
                            return (
                              <p
                                className="px-3 text-sm bg-white h-min whitespace-nowrap cursor-pointer bg-opacity-5 text-white text-opacity-70 rounded-full"
                                onClick={() => {
                                  setSelectedGenre(e);
                                }}>
                                {e.name}
                              </p>
                            );
                          })}
                        </div>
                        <div // Tempo e Estrelas
                          className="flex gap-4">
                          <div className="flex gap-1 text-white text-opacity-50 items-center">
                            <MdAccessTimeFilled className="text-lg" />
                            {typeof film?.runtime === "number" && (
                              <p className="tracking-wide">
                                {Math.floor(film?.runtime / 60)}h
                                {film?.runtime - Math.floor(film?.runtime / 60) * 60}m
                              </p>
                            )}
                          </div>
                          <div className="flex gap-1 text-white text-opacity-50 items-center">
                            <MdStar className="text-lg" />
                            {typeof film?.runtime === "number" && (
                              <p className="tracking-wide">
                                {film.vote_average.toFixed(1)}/10
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {(watchProviders?.length || 0) > 0 && (
                      <div className="flex flex-col w-full gap-2">
                        <h1 // Onde assistir
                          className={"text-white text-2xl font-bold"}>
                          Onder assistir
                        </h1>
                        <div className="flex relative w-full">
                          <div className="top-0 -right-[2px] h-full w-24 md:hidden absolute z-10 bg-gradient-to-r from-transparent to-zinc-800"></div>
                          <div className="flex gap-1 scroll-zero overflow-x-auto pr-20">
                            {watchProviders?.map((e) => {
                              return (
                                <Image
                                  className="rounded-lg w-16 h-16 bg-black bg-opacity-50 hover:scale-100 scale-90 ease-in-out duration-200"
                                  src={`https://image.tmdb.org/t/p/original${e.logo_path}`}
                                  alt={"provedor " + e.provider_name}
                                  width={256}
                                  height={256}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {film === undefined && (
                <div className="w-full h-full my-16 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-t-2 border-l-2 border-white border-opacity-50 animate-spin border-solid"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
