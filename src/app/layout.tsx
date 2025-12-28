import type { Metadata } from "next";
import { Gugi, Zain } from "next/font/google";
import { Toaster } from 'react-hot-toast'

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

        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              borderRadius: '10px',
              background: '#261212', // tablebg
              color: '#F2E6E4',      // lightsky
              border: '1px solid #3A1A1A',
            },
            success: {
              iconTheme: {
                primary: '#F5D951',
                secondary: '#261212',
              },
            },
            error: {
              iconTheme: {
                primary: '#D32F2F',
                secondary: '#261212',
              },
            },
            loading: {
              iconTheme: {
                primary: '#F5D951',
                secondary: '#261212',
              },
            },
          }}
        />


      </body>
    </html>
  );
}
