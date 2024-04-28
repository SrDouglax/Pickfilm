"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdClose, MdDone, MdFilterAlt } from "react-icons/md";

type sortName = "popularity" | "votes" | "date" | "revenue";

export interface filterType {
  watchProviders: number[];
  adult: boolean;
  enabledSorts: {
    popularity: boolean;
    votes: boolean;
    date: boolean;
    revenue: boolean;
  };
}

interface watchProvider {
  display_priorities: any;
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

interface SetFiltersProps {
  filters?: filterType;
  setFilters: Dispatch<SetStateAction<filterType>>;
  showFilterOptions: boolean;
  setShowFilterOptions: Function;
}

export default function SetFilters({
  filters,
  setFilters,
  showFilterOptions,
  setShowFilterOptions,
}: SetFiltersProps) {
  const [watchProviders, setWatchProviders] = useState<watchProvider[]>([]);
  const [, lastChange] = useState(0);

  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/watch/providers/movie?language=pt-BR&watch_region=BR";
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
        console.log(json);

        setWatchProviders(json.results);
      });
  }, []);

  function setEnabledSorts(sortName: sortName, oldData: filterType, value: boolean) {
    let data = oldData;
    if (value === true) {
      data.enabledSorts[sortName] = value;
    } else if (Object.values(data.enabledSorts).filter((e) => e === true).length > 1) {
      data.enabledSorts[sortName] = value;
    }
    lastChange(Date.now());
    return data;
  }

  function setAdultFilter(oldData: filterType, value: boolean) {
    let data = oldData || {};
    data.adult = value;
    lastChange(Date.now());
    return data;
  }

  return (
    <div
      className={`${
        showFilterOptions ? "opacity-100 scale-100 z-50" : "opacity-0 scale-110 z-0"
      } ease-in-out duration-200 flex flex-col w-full absolute h-full top-0 left-0 items-center`}>
      <div className="flex justify-between w-full px-4 py-2 shadow-lg h-min">
        <div className="flex items-center gap-2">
          <MdFilterAlt
            className="text-2xl text-white cursor-pointer"
            onClick={() => setShowFilterOptions(true)}
          />
          <p className="text-xl text-white">Filtros</p>
        </div>
        <div className="flex items-center gap-2">
          <MdClose
            onClick={() => setShowFilterOptions(false)}
            className={`text-white text-4xl cursor-pointer`}
          />
        </div>
      </div>
      <div className="flex flex-col w-full max-w-2xl gap-3 px-4 pt-4 pb-4 overflow-y-auto text-white styled-scroll">
        <div className="flex flex-col">
          <h2 className={"text-2xl font-bold"}>Filmes sorteados</h2>
          <p className="leading-none opacity-60">Defina quais filmes deseja sortear</p>
          <div className="flex flex-col w-full gap-1 mt-4">
            <div className="flex justify-between w-full">
              <p className="text-lg">Populares</p>
              <div className="flex w-24 overflow-hidden border border-white border-solid rounded-full border-opacity-20">
                <div
                  className={`w-full text-center ease-in-out items-center flex justify-center duration-200 cursor-pointer ${
                    filters?.enabledSorts?.popularity ? "" : "bg-red-500"
                  }`}
                  onClick={() =>
                    setFilters((e) => setEnabledSorts("popularity", e, false))
                  }>
                  <MdClose/>
                </div>
                <div
                  className={`w-full text-center ease-in-out items-center flex justify-center duration-200 cursor-pointer ${
                    filters?.enabledSorts?.popularity ? "bg-green-500" : ""
                  }`}
                  onClick={() => {
                    setFilters((e) => setEnabledSorts("popularity", e, true));
                  }}>
                  <MdDone/>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-lg">Maiores lucros</p>
              <div className="flex w-24 overflow-hidden border border-white border-solid rounded-full border-opacity-20">
                <div
                  className={`w-full text-center ease-in-out items-center flex justify-center duration-200 cursor-pointer ${
                    filters?.enabledSorts?.revenue ? "" : "bg-red-500"
                  }`}
                  onClick={() => setFilters((e) => setEnabledSorts("revenue", e, false))}>
                  <MdClose/>
                </div>
                <div
                  className={`w-full text-center ease-in-out items-center flex justify-center duration-200 cursor-pointer ${
                    filters?.enabledSorts?.revenue ? "bg-green-500" : ""
                  }`}
                  onClick={() => {
                    setFilters((e) => setEnabledSorts("revenue", e, true));
                  }}>
                  <MdDone/>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-lg">Mais recentes</p>
              <div className="flex w-24 overflow-hidden border border-white border-solid rounded-full border-opacity-20">
                <div
                  className={`w-full text-center ease-in-out items-center flex justify-center duration-200 cursor-pointer ${
                    filters?.enabledSorts?.date ? "" : "bg-red-500"
                  }`}
                  onClick={() => setFilters((e) => setEnabledSorts("date", e, false))}>
                  <MdClose/>
                </div>
                <div
                  className={`w-full text-center ease-in-out items-center flex justify-center duration-200 cursor-pointer ${
                    filters?.enabledSorts?.date ? "bg-green-500" : ""
                  }`}
                  onClick={() => {
                    setFilters((e) => setEnabledSorts("date", e, true));
                  }}>
                  <MdDone/>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-lg">Mais avaliados</p>
              <div className="flex w-24 overflow-hidden border border-white border-solid rounded-full border-opacity-20">
                <div
                  className={`w-full text-center ease-in-out items-center flex justify-center duration-200 cursor-pointer ${
                    filters?.enabledSorts?.votes ? "" : "bg-red-500"
                  }`}
                  onClick={() => setFilters((e) => setEnabledSorts("votes", e, false))}>
                  <MdClose/>
                </div>
                <div
                  className={`w-full text-center ease-in-out items-center flex justify-center duration-200 cursor-pointer ${
                    filters?.enabledSorts?.votes ? "bg-green-500" : ""
                  }`}
                  onClick={() => {
                    setFilters((e) => setEnabledSorts("votes", e, true));
                  }}>
                  <MdDone/>
                </div>
              </div>
            </div>
            <div className="flex justify-between w-full pt-2 mt-1 border-t border-white border-solid border-opacity-10">
              <p className="text-lg">Filmes adultos</p>
              <div className="flex w-24 overflow-hidden border border-white border-solid rounded-full border-opacity-20">
                <div
                  className={`w-full text-center ease-in-out items-center flex justify-center duration-200 cursor-pointer ${
                    filters?.adult ? "" : "bg-red-500"
                  }`}
                  onClick={() => setFilters((e) => setAdultFilter(e, false))}>
                  <MdClose/>
                </div>
                <div
                  className={`w-full text-center ease-in-out items-center flex justify-center duration-200 cursor-pointer ${
                    filters?.adult ? "bg-green-500" : ""
                  }`}
                  onClick={() => {
                    setFilters((e) => setAdultFilter(e, true));
                  }}>
                  <MdDone/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className={"text-white text-2xl font-bold"}>Locais para assistir</h2>
          <p className="leading-none opacity-60">
            Alguns provedores não estão funcionando corretamente.
          </p>
          <div className="grid w-full grid-cols-6 gap-2 mt-4 sm:grid-cols-8">
            {watchProviders.map((e) => {
              return (
                <div
                  className={`w-full hover:scale-105 ease-in-out duration-100 rounded-xl sm:rounded-[1.25rem] overflow-hidden ${
                    filters?.watchProviders?.includes(e.provider_id) ||
                    filters?.watchProviders?.length === 0
                      ? `opacity-100 ${
                          filters?.watchProviders?.includes(e.provider_id)
                            ? " outline outline-1 outline-white outline-offset-1"
                            : ""
                        }`
                      : "opacity-50 hover:opacity-75"
                  }`}
                  key={e.provider_id}
                  onClick={() => {
                    filters?.watchProviders?.includes(e.provider_id)
                      ? setFilters((old) => {
                          const data = old || {};
                          data.watchProviders = data?.watchProviders?.filter(
                            (k) => k !== e.provider_id
                          );
                          lastChange(Date.now());
                          return data;
                        })
                      : setFilters((old) => {
                          let data = old || {};
                          data.watchProviders = data?.watchProviders || [];
                          data.watchProviders.push(e.provider_id);
                          lastChange(Date.now());
                          return data;
                        });
                  }}>
                  <img
                    className="object-cover aspect-square"
                    src={`https://image.tmdb.org/t/p/original${e.logo_path}`}
                    alt={""}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
