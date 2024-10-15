"use client";
import { MdRefresh, MdClose, MdAccessTimeFilled, MdStar, MdPushPin, MdFilterAlt, MdArrowLeft, MdShare } from "react-icons/md";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { genreType, genres } from "../allGenres/AllGenres";
import { useState, useEffect, Dispatch, SetStateAction, useCallback } from "react";
import { filterType } from "../setFilters/SetFilters";
import toast from "react-hot-toast";
import Image from "next/image";

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

interface actorType {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

interface watchProviderType {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

interface VideoType {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

interface FilmHistoryType {
  film: filmType;
  watchProviders: watchProviderType[];
  cast: actorType[];
  trailer: VideoType;
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNThkZjI3NjVlNzVjZjcxOTU3OTQwOWQwYTZlZDE0ZCIsInN1YiI6IjYwNGU0N2I5NzMxNGExMDA0MGYzM2ZiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wcXwGa73OY0MtxHkeJtPxNLk6POBstoCWWEd-a9XOXs",
  },
};

interface MovieDisplayProps {
  filters?: filterType;
  setFilters: Dispatch<SetStateAction<filterType>>;
  selectedGenre?: genreType;
  setSelectedGenre: Function;
  starterFilmId?: number;
}

export default function MovieDisplay({ selectedGenre, setSelectedGenre, filters, setFilters, starterFilmId }: MovieDisplayProps) {
  const [film, setFilm] = useState<filmType>();
  const [lastReset, setLastReset] = useState<number>(0);
  const [watchProviders, setWatchProviders] = useState<watchProviderType[]>();
  const [cast, setCast] = useState<actorType[]>();
  const [trailer, setTrailer] = useState<VideoType>();
  const [filterSorted, setFilterSorted] = useState<string>("");
  const [filmHistory, setFilmHistory] = useState<FilmHistoryType[]>([]);
  const [filmHistoryIndex, setFilmHistoryIndex] = useState<number>(0);
  const [rotate, setRotate] = useState<boolean>(false);
  const [blur, setBlur] = useState<boolean>(false);
  const [firstReq, setFirstReq] = useState<boolean>(false);
  const [_, refresh] = useState<number>(0);

  useEffect(() => {
    if (selectedGenre && (starterFilmId ? firstReq : true)) {
      setFirstReq(true);
      setFilm(undefined);
      setWatchProviders(undefined);
      setCast(undefined);
      setTrailer(undefined);

      const filtersMap = {
        "popularity.desc": "Popularidade",
        "revenue.desc": "Mais Rentaveis",
        "vote_count.desc": "Melhores Avaliados",
        "primary_release_date.desc": "Mais Recentes",
      };

      let sortList = [];
      filters?.enabledSorts.popularity ? sortList.push("popularity.desc") : null;
      filters?.enabledSorts.revenue ? sortList.push("revenue.desc") : null;
      filters?.enabledSorts.votes ? sortList.push("vote_count.desc") : null;
      filters?.enabledSorts.date ? sortList.push("primary_release_date.desc") : null;
      const sort = sortList[Math.round((sortList.length - 1) * Math.random())];

      setFilterSorted((filtersMap as any)[sort]);

      const page = Math.round(20 * Math.random()) + 1;

      const adultFilter = `${filters?.adult ? "" : "&include_adult=false"}`;

      const watchProviders = `&watch_region=BR&with_watch_providers=${filters?.watchProviders.join("|")}`;

      var releaseDateObj = new Date();
      releaseDateObj.setDate(new Date().getDate() - 1);
      const releaseDate = `&primary_release_date.lte=${releaseDateObj.toISOString().split("T")[0]}`;

      const url = `https://api.themoviedb.org/3/discover/movie?language=pt-BR&include_video=true&page=${page}&sort_by=${sort}${
        selectedGenre.id >= 0 ? `&with_genres=${selectedGenre?.id}` : ""
      }${adultFilter}${watchProviders}${releaseDate}`;

      fetch(url, options)
        .then((res) => res.json())
        .then(async (json) => {
          const selectedFilm: filmType = json.results[Math.round(Math.random() * 19)];
          getFilmData(selectedFilm.id);
        });
    }
  }, [selectedGenre, lastReset]);

  useEffect(() => {
    if (starterFilmId) {
      setSelectedGenre(genres[0]);
      getFilmData(starterFilmId);
      setFirstReq(true);
    }
  }, []);

  async function getFilmData(filmId: number) {
    let _film: filmType;
    let _trailer: VideoType;
    let _watchProviders: watchProviderType[];
    let _cast: actorType[];
    await fetch(`https://api.themoviedb.org/3/movie/${filmId}?language=pt-BR`, options)
      .then((res) => res.json())
      .then((json) => {
        setBlur(true);
        setFilm(json);
        _film = json;
      });
    await fetch(`https://api.themoviedb.org/3/movie/${filmId}/videos?language=pt-BR`, options)
      .then((res) => res.json())
      .then((json) => {
        setTrailer(json?.results.find((e: any) => e.type === "Trailer"));
        _trailer = json;
      });
    setBlur(false);
    await fetch(`https://api.themoviedb.org/3/movie/${filmId}/watch/providers`, options)
      .then((res) => res.json())
      .then(async (json) => {
        setWatchProviders(json.results["BR"]?.flatrate);
        _watchProviders = json.results["BR"]?.flatrate;
        await fetch(`https://api.themoviedb.org/3/movie/${filmId}/credits?language=pt-BR`, options)
          .then((res) => res.json())
          .then((json) => {
            setCast(json.cast);
            _cast = json.cast;
          });
      });
    const newHistory = [...filmHistory, { film: _film!, watchProviders: _watchProviders!, cast: _cast!, trailer: _trailer! }];
    setFilmHistory(newHistory);
    setFilmHistoryIndex(newHistory.length - 1);
  }

  const handleRefreshClick = () => {
    setRotate(true);
    setLastReset(Date.now());
    setTimeout(() => setRotate(false), 1000); // Remove a rotação após a animação
  };

  const handleBackHistory = () => {
    if (filmHistoryIndex > 0) {
      setBlur(true);
      setFilmHistoryIndex(filmHistoryIndex - 1);
      setFilm(filmHistory[filmHistoryIndex - 1].film);
      setWatchProviders(filmHistory[filmHistoryIndex - 1].watchProviders);
      setCast(filmHistory[filmHistoryIndex - 1].cast);
      setTrailer(filmHistory[filmHistoryIndex - 1].trailer);
      setTimeout(() => {
        setBlur(false);
      }, 1);
    }
  };

  const handleNextHistory = () => {
    if (filmHistoryIndex < filmHistory.length - 1) {
      setBlur(true);
      setFilmHistoryIndex(filmHistoryIndex + 1);
      setFilm(filmHistory[filmHistoryIndex + 1].film);
      setWatchProviders(filmHistory[filmHistoryIndex + 1].watchProviders);
      setCast(filmHistory[filmHistoryIndex + 1].cast);
      setTrailer(filmHistory[filmHistoryIndex + 1].trailer);
      setTimeout(() => {
        setBlur(false);
      }, 1);
    }
  };

  function shareFilm() {
    if (!film) return;
    const dataToShare = {
      title: film.title,
      text: `Veja informações sobre ${film.title} no site ${window.location.host}`,
      url: `${window.location.origin}/discover/${film.id}`,
    };
    if (navigator.canShare(dataToShare)) {
      navigator.share(dataToShare).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/discover/${film?.id}`).then(
        () => alert("Link copiado para a área de transferência!"),
        () => alert("Erro ao copiar link")
      );
    }
  }

  return (
    <div
      className={`${
        selectedGenre !== undefined ? "opacity-100 scale-100 z-50" : "opacity-0 scale-110 z-0"
      } ease-in-out duration-200 flex flex-col w-full absolute h-full top-0 left-1/2 -translate-x-1/2 items-center`}>
      <div className="static top-0 z-50 flex justify-between w-full px-4 py-2 shadow-lg h-min">
        <div className="flex items-center gap-3">
          <div className={`${genres.find((e) => e.id == selectedGenre?.id)?.bgColorClass} w-0.5 h-3/4 rounded-full`}></div>
          <p className="text-xl text-white">{selectedGenre?.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <MdShare onClick={() => shareFilm()} className={`text-white text-2xl cursor-pointer`} />
          <MdClose
            onClick={() => {
              window.location.pathname == "/discover" ? setSelectedGenre(undefined) : window.location.replace("/discover");
            }}
            className={`text-white text-4xl cursor-pointer`}
          />
        </div>
      </div>
      <div
        className={`flex pb-20 flex-col items-center w-full h-full overflow-x-hidden overflow-y-auto styled-scroll ease-out ${
          blur ? "blur-xl duration-0" : "blur-0 duration-300"
        }`}>
        <div className="flex-col relative w-full ease-in-out duration-200 flex">
          <div
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${film?.backdrop_path})` }}
            className="absolute bg-cover z-0 bg-center w-full h-full [-webkit-mask-image:linear-gradient(black,transparent)] [mask-image:linear-gradient(black,transparent)]"
          />
          <div className="relative z-10 scale-[1.01] ease-in-out items-center pt-4 sm:pt-12 duration-200 flex flex-col w-full bg-gradient-to-r from-black/75 to-[#0E0A1BAA] ">
            <div className="flex flex-col w-full max-w-xl">
              {film !== undefined && (
                <div className="flex flex-col w-full h-full px-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex w-full flex-col">
                      <h1 // Título
                        className={"text-white text-3xl font-bold"}>
                        {film?.title}
                        <span aria-label={new Date().toISOString()} className="ml-3 text-base text-white text-opacity-50">
                          ({new Date(film?.release_date || Date.now()).getFullYear()})
                        </span>
                      </h1>
                      <p className="opacity-50 text-white">{filterSorted !== undefined ? `${filterSorted}` : ""}</p>
                    </div>
                    <div // Foto e informações
                      className="flex h-56 gap-4">
                      {/* Foto do filme */}
                      {film?.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/original${film?.poster_path}`}
                          className="flex-shrink-0 object-cover h-full bg-black bg-opacity-50 rounded-lg max-w-[50%]"
                          alt={"Poster do filme"}
                        />
                      )}
                      {/* Informações do filme */}
                      <div className="flex flex-col gap-2 py-2">
                        <p // Descrição
                          className={"text-white text-sm h-full text-opacity-70 leading-tight styled-scroll overflow-auto pr-2"}>
                          {film?.overview}
                        </p>
                        <div // Categorias
                          className="flex flex-wrap-reverse flex-shrink-0 w-full gap-2 mt-2 overflow-x-auto">
                          {film?.genres.map((e: genreType) => {
                            return (
                              <p
                                className="px-3 text-sm text-white bg-white rounded-full cursor-pointer h-min whitespace-nowrap bg-opacity-5 text-opacity-70"
                                onClick={() => {
                                  setSelectedGenre(e);
                                }}
                                key={e.id}>
                                {e.name}
                              </p>
                            );
                          })}
                        </div>
                        <div // Tempo e Estrelas
                          className="flex flex-col sm:flex-row sm:gap-4">
                          <div className="flex items-center gap-1 text-white text-opacity-50">
                            <MdAccessTimeFilled className="text-lg" />
                            {typeof film?.runtime === "number" && (
                              <p className="tracking-wide">
                                {Math.floor(film?.runtime / 60)}h{film?.runtime - Math.floor(film?.runtime / 60) * 60}m
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-white text-opacity-50">
                            <MdStar className="text-lg" />
                            {typeof film?.runtime === "number" && (
                              <p className="tracking-wide">
                                {film.vote_average.toFixed(1)}/10 <span className="opacity-50">({film.vote_count})</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {film === undefined && (
                <div className="flex items-center justify-center w-full h-full my-16">
                  <div className="w-16 h-16 border-t-2 border-l-2 border-white border-opacity-50 border-solid rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {(watchProviders?.length || 0) > 0 && (
          <div className="flex flex-col w-full max-w-xl gap-2 px-4 pt-4">
            <h1 // Onde assistir
              className={"text-white text-2xl font-bold"}>
              Onde assistir <span className="ml-1 text-lg opacity-75">(JustWatch)</span>
            </h1>
            <div className="relative flex w-full">
              <div className="top-0 -right-[2px] h-full w-12 absolute z-10 "></div>
              <div className="flex gap-1 pr-20 overflow-y-auto overflow-x-auto scroll-zero [-webkit-mask-image:linear-gradient(90deg,rgba(255,255,255,1)0%,rgba(255,255,255,1)83%,rgba(0,0,0,0)100%)] [mask-image:linear-gradient(90deg,rgba(255,255,255,1)0%,rgba(255,255,255,1)90%,rgba(0,0,0,0)100%)]">
                {watchProviders?.map((e) => {
                  return (
                    <div className="relative flex-shrink-0">
                      <Image
                        className="object-cover w-16 cursor-pointer h-16 duration-200 ease-in-out bg-black bg-opacity-50 rounded-lg hover:scale-90"
                        src={`https://image.tmdb.org/t/p/original${e.logo_path}`}
                        alt={"provedor " + e.provider_name}
                        width={256}
                        height={256}
                        key={e.provider_id}
                        onClick={() => {
                          setFilters((prev) => {
                            if (filters?.watchProviders.includes(e.provider_id)) {
                              return { ...prev, watchProviders: prev.watchProviders.filter((j) => j !== e.provider_id) };
                            } else {
                              return { ...prev, watchProviders: [...prev.watchProviders, e.provider_id] };
                            }
                          });
                          setLastReset(Date.now());
                        }}
                      />
                      {filters?.watchProviders.includes(e.provider_id) && <MdPushPin className="absolute text-white top-1 right-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {(film?.production_companies?.length || 0) > 0 && (
          <div className="flex flex-col w-full max-w-xl px-4 pt-4 text-white">
            <h1 // Produção
              className={"text-2xl font-bold"}>
              Produção
            </h1>
            <p className="opacity-75">{film?.production_companies.map((e) => e.name).join(", ")}</p>
          </div>
        )}
        {(cast?.length || 0) > 0 && (
          <div className="flex flex-col w-full max-w-xl gap-2 p-4">
            <h1 // Elenco
              className={"text-white text-2xl font-bold"}>
              Elenco
            </h1>
            <div className="relative flex w-full">
              <div className="flex gap-3 pr-20 overflow-x-auto scroll-zero [-webkit-mask-image:linear-gradient(90deg,rgba(255,255,255,1)0%,rgba(255,255,255,1)83%,rgba(0,0,0,0)100%)] [mask-image:linear-gradient(90deg,rgba(255,255,255,1)0%,rgba(255,255,255,1)90%,rgba(0,0,0,0)100%)]">
                {cast?.slice(0, 15)?.map((e) => {
                  return (
                    <div className="flex flex-col flex-shrink-0 w-48 overflow-hidden rounded-lg shadow bg-zinc-900" key={e.credit_id}>
                      {e.profile_path && (
                        <Image
                          className="object-cover w-full duration-200 ease-in-out bg-white bg-opacity-50 aspect-square"
                          src={`https://image.tmdb.org/t/p/original${e.profile_path}`}
                          width={300}
                          height={300}
                          alt={"Foto de " + e.name}
                        />
                      )}
                      {!e.profile_path && <div className="object-cover w-full duration-200 ease-in-out bg-white bg-opacity-50 aspect-square"></div>}
                      <div className="flex flex-col px-4 py-3 text-white">
                        <p className="overflow-hidden text-xl leading-tight whitespace-nowrap overflow-ellipsis">{e.name}</p>
                        <p className="overflow-hidden opacity-50 whitespace-nowrap overflow-ellipsis">{e.character}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {trailer?.id && (
          <div className="flex flex-col w-full max-w-xl gap-2 px-4 pt-4">
            <h1 // Onde assistir
              className={"text-white text-2xl font-bold"}>
              Trailer
            </h1>
            <iframe
              width="400"
              height="230"
              src={"https://www.youtube.com/embed/" + trailer.key}
              title="Embed videos and playlists"
              className="bg-white/5 rounded-lg w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen></iframe>
          </div>
        )}
      </div>
      <div className="z-10 items-end gap-2 absolute left-0 bottom-0 md:px-8 md:mb-4 px-2 mb-2 w-full md:justify-end justify-center flex">
        <button
          onClick={() => handleBackHistory()}
          disabled={filmHistoryIndex === 0}
          className="cursor-pointer disabled:opacity-50 rounded-full md:w-max flex gap-2 justify-center font-semibold items-center border-white/10 md:bg-black/40 bg-black/75 shadow-lg border text-white backdrop-blur-xl aspect-square h-full p-3">
          <BiSolidLeftArrow className={`text-white text-3xl md:text-lg`} />
        </button>
        <button
          onClick={() => handleNextHistory()}
          disabled={filmHistoryIndex === (filmHistory?.length || 0) - 1}
          className="cursor-pointer disabled:opacity-50 rounded-full md:w-max flex gap-2 justify-center font-semibold items-center border-white/10 md:bg-black/40 bg-black/75 shadow-lg border text-white backdrop-blur-xl aspect-square h-full p-3">
          <BiSolidRightArrow className={`text-white text-3xl md:text-lg`} />
        </button>
        <div
          onClick={() => handleRefreshClick()}
          className="cursor-pointer rounded-full md:w-max md:px-8 flex gap-2 justify-center font-semibold items-center border-white/10 md:bg-black/40 bg-black/75 shadow-lg border text-white backdrop-blur-xl w-3/4 py-3">
          <MdRefresh className={`text-white text-3xl ${rotate ? "animate-spin360" : ""}`} />
          <p className="text-2xl">Novo</p>
        </div>
      </div>
    </div>
  );
}
