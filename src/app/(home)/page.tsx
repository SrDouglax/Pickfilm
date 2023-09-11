"use client";
import { MdArrowForwardIos } from "react-icons/md";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import FilmeeterIcon from '@/assets/branding/filmeeterLogo.png'
import { useState } from "react";
import Link from "next/link";

const montserrat = Montserrat({ subsets: ["latin"] });


export default function Home() {

  const [hide, setHide] = useState(false)

  return (
    <main
      className={`w-full h-full ease-in-out duration-500 ${
        hide ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}>
      <div className="absolute w-full h-full overflow-hidden">
        {/* Top */}
        <div className="relative w-[200vh] h-[1px] animate-[line-animate_2200ms_ease-in-out_infinite] bg-gradient-to-r from-transparent to-transparent line-animate via-white top-[5%] left-1/2"></div>
        <div className="relative w-[200vh] h-[1px] animate-[line-animate_3100ms_ease-in-out_infinite] bg-gradient-to-r from-transparent to-transparent line-animate via-white top-[5%] left-1/2"></div>
        <div className="relative w-[200vh] h-[1px] animate-[line-animate_12600ms_ease-in-out_infinite] bg-gradient-to-r from-transparent to-transparent line-animate via-white top-[5%] left-1/2"></div>
        <div className="relative w-[200vh] h-[1px] animate-[line-animate_7200ms_ease-in-out_infinite] bg-gradient-to-r from-transparent to-transparent line-animate via-white top-[5%] left-1/2"></div>
        <div className="relative w-[200vh] h-[1px] animate-[line-animate_3000ms_ease-in-out_infinite] bg-gradient-to-r from-transparent to-transparent line-animate via-white top-[5%] left-1/2"></div>
        <div className="relative w-[200vh] h-[1px] animate-[line-animate_5500ms_ease-in-out_infinite] bg-gradient-to-r from-transparent to-transparent line-animate via-white top-[5%] left-1/2"></div>
        {/* Bottom */}
        <div className="relative w-[200vh] h-[1px] animate-[line-animate_4200ms_ease-in-out_infinite] bg-gradient-to-r from-transparent to-transparent line-animate via-white top-[95%] left-1/2"></div>
        <div className="relative w-[200vh] h-[1px] animate-[line-animate_3040ms_ease-in-out_infinite] bg-gradient-to-r from-transparent to-transparent line-animate via-white top-[95%] left-1/2"></div>
        <div className="relative w-[200vh] h-[1px] animate-[line-animate_11300ms_ease-in-out_infinite] bg-gradient-to-r from-transparent to-transparent line-animate via-white top-[95%] left-1/2"></div>
        <div className="relative w-[200vh] h-[1px] animate-[line-animate_5600ms_ease-in-out_infinite] bg-gradient-to-r from-transparent to-transparent line-animate via-white top-[95%] left-1/2"></div>
        <div className="relative w-[200vh] h-[1px] animate-[line-animate_8100ms_ease-in-out_infinite] bg-gradient-to-r from-transparent to-transparent line-animate via-white top-[95%] left-1/2"></div>
        <div className="relative w-[200vh] h-[1px] animate-[line-animate_6201ms_ease-in-out_infinite] bg-gradient-to-r from-transparent to-transparent line-animate via-white top-[95%] left-1/2"></div>
      </div>
      <section className="relative gap-4 w-full h-full p-8 z-10 flex flex-col items-center justify-center">
        <Image
          src={FilmeeterIcon}
          alt={"Icone Filmeeter"}
          className="h-1/4 aspect-auto w-min max-w-[75%] object-cover"
        />
        <h1 className="text-5xl font-bold" style={montserrat.style}>
          <span className="text-white">FIL</span>
          <span className="text-violet-800">MEETER</span>
        </h1>
        <h2
          className={`ease-in-out text-lg max-w-md text-center text-white duration-200`}
          style={montserrat.style}>
          Descubra o sabor inesperado do cinema. Dê uma chance a filmes que despertem sua
          curiosidade. Experimente novas sensações
        </h2>
        <Link
          className="px-4 mt-4 cursor-pointer py-2 hover:scale-105 ease-in-out duration-300 rounded-md flex gap-2 text-xl items-center bg-white text-violet-800"
          onClick={() => {
            setHide(true);
          }}
          href={"/discover"}>
          <p className="font-semibold">DESCOBRIR ALGO NOVO</p>
          <MdArrowForwardIos />
        </Link>
      </section>
    </main>
  );
}
