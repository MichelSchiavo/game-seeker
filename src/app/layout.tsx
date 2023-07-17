import { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { Nunito } from "next/font/google";
import { Header } from "@/components/Header";
import { GamesProvider } from "@/context/GamesContext";
import { Footer } from "@/components/Footer";

import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GameSeeker",
  description: "Your favorite games in one place",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>

      <body className={nunito.className}>
        {
          <AuthProvider>
            <GamesProvider>
              <Header />
              {children}
              <Footer />
            </GamesProvider>
          </AuthProvider>
        }
      </body>
    </html>
  );
}
