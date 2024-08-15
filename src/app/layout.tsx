import { GoogleAnalytics } from "@next/third-parties/google";
import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PICKFILM",
  description: "Não decida que filme ou série ver a seguir.",
  other: {
    "google-site-verification": "tUP-lkB8SFrbA8mdORrM4TMiFKTmzr6KhaZvFHLgc2o",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="w-full h-full">
      <body className="w-full h-full overflow-hidden bg-gradient-to-r from-black to-[#0E0A1B]">{children}</body>
      <GoogleAnalytics gaId="G-V84K2C6RG7" />
    </html>
  );
}
