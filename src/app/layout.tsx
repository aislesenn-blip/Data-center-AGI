import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import type { Viewport } from "next";

export const metadata: Metadata = {
  title: "SpaceCard",
  description: "The zero-fee payment network.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SpaceCard",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen selection:bg-white selection:text-black hide-scrollbar`}
      >
        <main className="max-w-md mx-auto min-h-screen relative overflow-hidden bg-black pb-24">
          {children}
        </main>
      </body>
    </html>
  );
}