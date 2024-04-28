"use client";
import { MdArrowForwardIos } from "react-icons/md";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import FilmeeterIcon from "@/assets/branding/filmeeterLogo.png";
import { useState } from "react";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Home() {
  const [hide, setHide] = useState(false);

  return (
    <main
      className={`w-full h-full ease-in-out duration-500 ${
        hide ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}>
      <section className="w-full h-full flex flex-col gap-6 justify-center">
        <div className="gap-2 px-8 z-10 w-full flex flex-col items-center justify-center">
          <Image
            src={FilmeeterIcon}
            alt={"Icone Filmeeter"}
            className="h-36 aspect-auto w-min max-w-[75%] object-cover animate-[animate-in_1000ms_ease-in-out]"
            width={386.5}
            height={322.25}
          />
          <h1
            className="text-5xl mt-2 font-bold animate-[animate-in_1400ms_ease-in-out]"
            style={montserrat.style}>
            <span className="text-white">FIL</span>
            <span className="text-violet-800">MEETER</span>
          </h1>
          <h2
            className={`ease-in-out text-lg max-w-md text-center leading-tight text-white duration-200 animate-[animate-in_1600ms_ease-in-out]`}
            style={montserrat.style}>
            Abra-se a novos horizontes cinematográficos. Explore a diversidade do cinema!
          </h2>
        </div>
        <div className="relative w-full flex items-center justify-center mt-4">
          <div className="absolute w-full h-full z-60 overflow-hidden flex flex-col items-center justify-center group blur-[2px]">
            <div className="relative w-[200%] h-[1px] animate-[line-animate_22200ms_ease-in-out_infinite] group-hover:animate-[line-animate_1020ms_ease-in-out_infinite] flex-shrink-0 bg-gradient-to-r from-transparent to-transparent line-animate via-violet-800 left-1/2"></div>
            <div className="relative w-[200%] h-[1px] animate-[line-animate_3100ms_ease-in-out_infinite] group-hover:animate-[line-animate_720ms_ease-in-out_infinite] flex-shrink-0 bg-gradient-to-r from-transparent to-transparent line-animate via-white left-1/2"></div>
            <div className="relative w-[200%] h-[1px] animate-[line-animate_8500ms_ease-in-out_infinite] group-hover:animate-[line-animate_1220ms_ease-in-out_infinite] flex-shrink-0 bg-gradient-to-r from-transparent to-transparent line-animate via-white left-1/2"></div>
            <div className="relative w-[200%] h-[1px] animate-[line-animate_7200ms_ease-in-out_infinite] group-hover:animate-[line-animate_1620ms_ease-in-out_infinite] flex-shrink-0 bg-gradient-to-r from-transparent to-transparent line-animate via-violet-800 left-1/2"></div>
            <div className="relative w-[200%] h-[1px] animate-[line-animate_5600ms_ease-in-out_infinite] group-hover:animate-[line-animate_2920ms_ease-in-out_infinite] flex-shrink-0 bg-gradient-to-r from-transparent to-transparent line-animate via-white left-1/2"></div>
            <div className="relative w-[200%] h-[1px] animate-[line-animate_5500ms_ease-in-out_infinite] group-hover:animate-[line-animate_1320ms_ease-in-out_infinite] flex-shrink-0 bg-gradient-to-r from-transparent to-transparent line-animate via-white left-1/2"></div>
            <div className="relative w-[200%] h-[1px] animate-[line-animate_4200ms_ease-in-out_infinite] group-hover:animate-[line-animate_3120ms_ease-in-out_infinite] flex-shrink-0 bg-gradient-to-r from-transparent to-transparent line-animate via-violet-800 left-1/2"></div>
            <div className="relative w-[200%] h-[1px] animate-[line-animate_8000ms_ease-in-out_infinite] group-hover:animate-[line-animate_1920ms_ease-in-out_infinite] flex-shrink-0 bg-gradient-to-r from-transparent to-transparent line-animate via-white left-1/2"></div>
            <div className="relative w-[200%] h-[1px] animate-[line-animate_9040ms_ease-in-out_infinite] group-hover:animate-[line-animate_1020ms_ease-in-out_infinite] flex-shrink-0 bg-gradient-to-r from-transparent to-transparent line-animate via-violet-800 left-1/2"></div>
            <div className="relative w-[200%] h-[1px] animate-[line-animate_11300ms_ease-in-out_infinite] group-hover:animate-[line-animate_1420ms_ease-in-out_infinite] flex-shrink-0 bg-gradient-to-r from-transparent to-transparent line-animate via-violet-800 left-1/2"></div>
            <div className="relative w-[200%] h-[1px] animate-[line-animate_12600ms_ease-in-out_infinite] group-hover:animate-[line-animate_2020ms_ease-in-out_infinite] flex-shrink-0 bg-gradient-to-r from-transparent to-transparent line-animate via-violet-800 left-1/2"></div>
            <div className="relative w-[200%] h-[1px] animate-[line-animate_6500ms_ease-in-out_infinite] group-hover:animate-[line-animate_4020ms_ease-in-out_infinite] flex-shrink-0 bg-gradient-to-r from-transparent to-transparent line-animate via-white left-1/2"></div>
            <div className="relative w-[200%] h-[1px] animate-[line-animate_6201ms_ease-in-out_infinite] group-hover:animate-[line-animate_1220ms_ease-in-out_infinite] flex-shrink-0 bg-gradient-to-r from-transparent to-transparent line-animate via-violet-800 left-1/2"></div>
            <div className="relative w-[200%] h-[1px] animate-[line-animate_14200ms_ease-in-out_infinite] group-hover:animate-[line-animate_920ms_ease-in-out_infinite] flex-shrink-0 bg-gradient-to-r from-transparent to-transparent line-animate via-violet-800 left-1/2"></div>
          </div>
          <Link
            className="relative z-10 px-4 cursor-pointer py-2 hover:scale-105 ease-in-out duration-300 rounded-md flex gap-2 text-xl items-center bg-white text-violet-800 animate-[animate-in_2000ms_ease-in-out]"
            onClick={() => {
              setHide(true);
            }}
            href={"/discover"}>
            <p className="font-semibold">DESCOBRIR ALGO NOVO</p>
            <MdArrowForwardIos />
          </Link>
        </div>
      </section>
    </main>
  );
}
