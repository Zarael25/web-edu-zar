import type { Metadata } from "next";
import { Gugi, Zain } from "next/font/google";
import "./globals.css";

const gugi = Gugi({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gugi",
});

const zain = Zain({
  weight: ["200", "300", "400", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-zain",
});

export const metadata: Metadata = {
  title: "Edu Zar",
  description: "Sistema de libreta de notas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${gugi.variable} ${zain.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
