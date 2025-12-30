import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SwupProvider from "@/components/SwupProvider";
import LenisProvider from "@/components/LenisProvider";
import GoogleAnalytics from "@/app/lib/google-analytics";
import ConsentBanner from "./lib/consent-banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Simulasi Studio",
  description: "Artist-run Screen printing studio",
};

export const viewport = {
  themeColor: "#ececf9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LenisProvider>
          <SwupProvider>
            <Header />
            <main id="swup">
              {children}
            </main>
            <ConsentBanner />
            {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics />}
            <Footer />
          </SwupProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
