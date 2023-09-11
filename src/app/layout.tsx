import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FILMEETER",
  description: "Decida que filme ou série ver a seguir.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="w-full h-full">
      <body className="w-full h-full overflow-hidden bg-zinc-800">{children}</body>
    </html>
  );
}
