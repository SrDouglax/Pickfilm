import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PICKFILM",
  description: "Não decida que filme ou série ver a seguir.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="w-full h-full">
      <body className="w-full h-full overflow-hidden bg-gradient-to-r from-black to-[#0E0A1B]">{children}</body>
    </html>
  );
}
