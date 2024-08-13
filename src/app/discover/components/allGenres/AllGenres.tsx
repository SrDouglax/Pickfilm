import Link from "next/link";
import GenreDisplay from "./components/genreDisplay";

// Icon Imports
import {
  MdMovie,
  MdMusicNote,
  MdLocalCafe,
  MdLibraryBooks,
  MdOutlineRocketLaunch,
  MdPeople,
  MdWhatshot,
  MdTheaters,
  MdLocalPizza,
  MdOutlineSmartToy,
  MdBusinessCenter,
  MdOutlineFamilyRestroom,
  MdFilterAlt,
} from "react-icons/md";
import { GiChainsaw, GiDrippingKnife, GiConcentrationOrb, GiChemicalArrow, GiRocketFlight } from "react-icons/gi";
import { RiEmotionLaughFill, RiHeartsFill } from "react-icons/ri";
import { BsDice6Fill } from "react-icons/bs";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import FilmeeterIcon from "@/assets/branding/filmeeterLogo.png";

export const genres = [
  {
    id: -1,
    name: "Gênero Aleatório",
    icon: BsDice6Fill,
    bgColorClass: "bg-red-600",
    classNames: "shadow-red-800 hover:shadow-red-900 animate-in",
  },
  {
    id: 28,
    name: "Ação",
    icon: GiChemicalArrow,
    bgColorClass: "bg-purple-600",
    classNames: "shadow-purple-800 hover:shadow-purple-900 animate-in",
  },
  {
    id: 12,
    name: "Aventura",
    icon: GiRocketFlight,
    bgColorClass: "bg-blue-600",
    classNames: "shadow-blue-800 hover:shadow-blue-900 animate-in",
  },
  {
    id: 16,
    name: "Animação",
    icon: MdOutlineSmartToy,
    bgColorClass: "bg-slate-600",
    classNames: "shadow-slate-800 hover:shadow-slate-900 animate-in",
  },
  {
    id: 35,
    name: "Comédia",
    icon: RiEmotionLaughFill,
    bgColorClass: "bg-yellow-600",
    classNames: "shadow-yellow-800 hover:shadow-yellow-900 animate-in",
  },
  {
    id: 80,
    name: "Crime",
    icon: MdLocalCafe,
    bgColorClass: "bg-indigo-600",
    classNames: "shadow-indigo-800 hover:shadow-indigo-900 animate-in",
  },
  {
    id: 99,
    name: "Documentário",
    icon: MdLibraryBooks,
    bgColorClass: "bg-green-600",
    classNames: "shadow-green-800 hover:shadow-green-900 animate-in",
  },
  {
    id: 18,
    name: "Drama",
    icon: MdMovie,
    bgColorClass: "bg-pink-600",
    classNames: "shadow-pink-800 hover:shadow-pink-900 animate-in",
  },
  {
    id: 10751,
    name: "Família",
    icon: MdOutlineFamilyRestroom,
    bgColorClass: "bg-indigo-600",
    classNames: "shadow-indigo-800 hover:shadow-indigo-900 animate-in",
  },
  {
    id: 14,
    name: "Fantasia",
    icon: MdOutlineRocketLaunch,
    bgColorClass: "bg-purple-600",
    classNames: "shadow-purple-800 hover:shadow-purple-900 animate-in",
  },
  {
    id: 36,
    name: "História",
    icon: MdPeople,
    bgColorClass: "bg-teal-600",
    classNames: "shadow-teal-800 hover:shadow-teal-900 animate-in",
  },
  {
    id: 27,
    name: "Terror",
    icon: GiDrippingKnife,
    bgColorClass: "bg-pink-600",
    classNames: "shadow-pink-800 hover:shadow-pink-900 animate-in",
  },
  {
    id: 10402,
    name: "Música",
    icon: MdMusicNote,
    bgColorClass: "bg-yellow-600",
    classNames: "shadow-yellow-800 hover:shadow-yellow-900 animate-in",
  },
  {
    id: 9648,
    name: "Mistério",
    icon: MdWhatshot,
    bgColorClass: "bg-red-600",
    classNames: "shadow-red-800 hover:shadow-red-900 animate-in",
  },
  {
    id: 10749,
    name: "Romance",
    icon: RiHeartsFill,
    bgColorClass: "bg-blue-600",
    classNames: "shadow-blue-800 hover:shadow-blue-900 animate-in",
  },
  {
    id: 878,
    name: "Ficção científica",
    icon: GiConcentrationOrb,
    bgColorClass: "bg-slate-600",
    classNames: "shadow-slate-800 hover:shadow-slate-900 animate-in",
  },
  {
    id: 10770,
    name: "Cinema TV",
    icon: MdTheaters,
    bgColorClass: "bg-green-600",
    classNames: "shadow-green-800 hover:shadow-green-900 animate-in",
  },
  {
    id: 53,
    name: "Thriller",
    icon: GiChainsaw,
    bgColorClass: "bg-pink-600",
    classNames: "shadow-pink-800 hover:shadow-pink-900 animate-in",
  },
  {
    id: 10752,
    name: "Guerra",
    icon: MdBusinessCenter,
    bgColorClass: "bg-yellow-600",
    classNames: "shadow-yellow-800 hover:shadow-yellow-900 animate-in",
  },
  {
    id: 37,
    name: "Faroeste",
    icon: MdLocalPizza,
    bgColorClass: "bg-blue-600",
    classNames: "shadow-blue-800 hover:shadow-blue-900 animate-in",
  },
];

export interface genreType {
  id: number;
  name: string;
}

interface AllGenresProps {
  selectedGenre?: genreType;
  setSelectedGenre: Function;
  showFilterOptions: boolean;
  setShowFilterOptions: Function;
}

const montserrat = Montserrat({ subsets: ["latin"] });

export default function AllGenres({ selectedGenre, setSelectedGenre, showFilterOptions, setShowFilterOptions }: AllGenresProps) {
  return (
    <div
      className={`${
        selectedGenre === undefined && !showFilterOptions ? "opacity-100 scale-100 z-50" : "opacity-0 scale-90 z-0"
      } absolute top-0 right-0 ease-in-out duration-200 flex flex-col items-center overflow-hidden w-full h-full`}>
      <header className="w-full py-2 px-4 shadow-xl flex justify-between">
        <Link href="/" className="text-xl font-bold" style={montserrat.style}>
          <Image
            src={FilmeeterIcon}
            quality={100}
            alt={"Icone Filmeeter"}
            className="h-8 py-0.5 -translate-y-0.5 w-max aspect-auto object-contain"
          />
        </Link>
        <div className="flex items-center text-white gap-1 font-semibold" onClick={() => setShowFilterOptions(true)}>
          <MdFilterAlt className="text-white text-2xl cursor-pointer" />
          Filtros
        </div>
      </header>
      <div className="flex flex-col max-w-4xl w-full h-full px-4 pb-4 pt-2 overflow-y-auto scroll-zero gap-3">
        <h2 className={`ease-in-out text-2xl mb-2 font-bold text-white duration-200`} style={montserrat.style}>
          O que deseja assistir hoje?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
        </div>
      </div>
    </div>
  );
}
