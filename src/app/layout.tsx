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
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-black text-white h-[100dvh] w-screen overflow-hidden selection:bg-white selection:text-black overscroll-none`}
      >
        <main className="max-w-md mx-auto h-full relative overflow-hidden bg-black flex flex-col supports-[height:100cqh]:h-[100cqh]">
          {children}
        </main>
      </body>
    </html>
  );
}