"use client";
import {
  MdAddLink,
  MdMovie,
  MdVideogameAsset,
  MdMusicNote,
  MdLocalCafe,
  MdArrowBack,
  MdClose,
} from "react-icons/md";
import { Montserrat } from "next/font/google";
import GenreDisplay from "./components/genreDisplay";
import { useEffect, useState } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });

const genres = [
  {
    id: 28,
    name: "Ação",
    icon: MdAddLink,
    classNames: "bg-red-500 shadow-red-800 hover:shadow-red-900 animate-in",
  },
  {
    id: 12,
    name: "Aventura",
    icon: MdMovie,
    classNames: "bg-blue-500 shadow-blue-800 hover:shadow-blue-900 animate-in",
  },
  {
    id: 16,
    name: "Animação",
    icon: MdVideogameAsset,
    classNames: "bg-slate-500 shadow-slate-800 hover:shadow-slate-900 animate-in",
  },
  {
    id: 35,
    name: "Comédia",
    icon: MdMusicNote,
    classNames: "bg-yellow-500 shadow-yellow-800 hover:shadow-yellow-900 animate-in",
  },
  {
    id: 80,
    name: "Crime",
    icon: MdLocalCafe,
    classNames: "bg-indigo-500 shadow-indigo-800 hover:shadow-indigo-900 animate-in",
  },
  {
    id: 99,
    name: "Documentário",
    icon: MdAddLink,
    classNames: "bg-green-500 shadow-green-800 hover:shadow-green-900 animate-in",
  },
  {
    id: 18,
    name: "Drama",
    icon: MdMovie,
    classNames: "bg-pink-500 shadow-pink-800 hover:shadow-pink-900 animate-in",
  },
  {
    id: 10751,
    name: "Família",
    icon: MdVideogameAsset,
    classNames: "bg-indigo-500 shadow-indigo-800 hover:shadow-indigo-900 animate-in",
  },
  {
    id: 14,
    name: "Fantasia",
    icon: MdMusicNote,
    classNames: "bg-purple-500 shadow-purple-800 hover:shadow-purple-900 animate-in",
  },
  {
    id: 36,
    name: "História",
    icon: MdLocalCafe,
    classNames: "bg-teal-500 shadow-teal-800 hover:shadow-teal-900 animate-in",
  },
  {
    id: 27,
    name: "Terror",
    icon: MdAddLink,
    classNames: "bg-pink-500 shadow-pink-800 hover:shadow-pink-900 animate-in",
  },
  {
    id: 10402,
    name: "Música",
    icon: MdMovie,
    classNames: "bg-yellow-500 shadow-yellow-800 hover:shadow-yellow-900 animate-in",
  },
  {
    id: 9648,
    name: "Mistério",
    icon: MdVideogameAsset,
    classNames: "bg-red-500 shadow-red-800 hover:shadow-red-900 animate-in",
  },
  {
    id: 10749,
    name: "Romance",
    icon: MdMusicNote,
    classNames: "bg-blue-500 shadow-blue-800 hover:shadow-blue-900 animate-in",
  },
  {
    id: 878,
    name: "Ficção científica",
    icon: MdLocalCafe,
    classNames: "bg-slate-500 shadow-slate-800 hover:shadow-slate-900 animate-in",
  },
  {
    id: 10770,
    name: "Cinema TV",
    icon: MdAddLink,
    classNames: "bg-green-500 shadow-green-800 hover:shadow-green-900 animate-in",
  },
  {
    id: 53,
    name: "Thriller",
    icon: MdMovie,
    classNames: "bg-pink-500 shadow-pink-800 hover:shadow-pink-900 animate-in",
  },
  {
    id: 10752,
    name: "Guerra",
    icon: MdVideogameAsset,
    classNames: "bg-yellow-500 shadow-yellow-800 hover:shadow-yellow-900 animate-in",
  },
  {
    id: 37,
    name: "Faroeste",
    icon: MdMusicNote,
    classNames: "bg-blue-500 shadow-blue-800 hover:shadow-blue-900 animate-in",
  },
];

interface filmType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState<number>();
  const [film, setFilm] = useState<filmType>();

  useEffect(() => {
    if (selectedGenre) {
      setFilm(undefined);

      const sortList = ["popularity.desc", "revenue.desc", "vote_count.desc"];
      const sort = sortList[Math.round((sortList.length - 1) * Math.random())];

      const page = Math.round(10 * Math.random());

      const url = `https://api.themoviedb.org/3/discover/movie?language=pt-BR&page=${page}&sort_by=${sort}&with_genres=${selectedGenre}`;
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
        .then((json) => setFilm(json.results[Math.round(Math.random() * 20)]));
    }
  }, [selectedGenre]);

  return (
    <main className="flex flex-col relative w-full h-full">
      <div
        className={`${
          selectedGenre === undefined
            ? "opacity-100 scale-100 z-50"
            : "opacity-0 scale-90 z-0"
        } absolute top-0 right-0 ease-in-out duration-200 flex flex-col items-center overflow-hidden w-full h-full px-4 py-8`}>
        <h1 className="text-4xl font-bold" style={montserrat.style}>
          <span className="text-white">FIL</span>
          <span className="text-violet-800">MEETER</span>
        </h1>
        <h2
          className={`ease-in-out text-lg font-bold text-white duration-200 ${
            selectedGenre == undefined ? "h-6 mt-4" : "h-0 overflow-hidden"
          }`}
          style={montserrat.style}>
          O que deseja assistir hoje?
        </h2>
        <section
          className={`max-w-4xl w-full mt-2 gap-3 grid grid-cols-1 sm:grid-cols-3 py-3 overflow-y-auto pr-3 styled-scroll ease-in-out duration-200 ${
            selectedGenre == undefined ? " top-0" : "relative top-full"
          }`}>
          {genres.map((genre, index) => (
            <GenreDisplay
              key={index}
              icon={genre.icon}
              name={genre.name}
              classNames={genre.classNames}
              onClick={() => {
                setSelectedGenre(genre.id);
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
        } ease-in-out duration-200 max-w-xl py-4 flex flex-col w-full absolute h-full top-0 left-1/2 -translate-x-1/2`}>
        <div className="flex w-full justify-between p-4 h-min">
          <div className="flex gap-3 items-center">
            <div className="w-0.5 h-3/4 bg-red-500 rounded-full"></div>
            <p className="text-white text-xl">Ação</p>
          </div>
          <MdClose
            onClick={() => setSelectedGenre(undefined)}
            className={`text-white text-4xl`}
          />
        </div>
        <div className="flex flex-col h-full w-full px-4">
          <div className="flex gap-4">
            {film?.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/original${film?.poster_path}`}
                className="w-32 rounded-md flex-shrink-0 object-cover"></img>
            )}
            <div className="flex flex-col gap-1">
              <p className={"text-white text-xl font-bold"}>{film?.title}</p>
              <p className={"text-white text-opacity-70 leading-tight"}>{film?.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
