import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Digital Child Card | Secure Their Future",
  description: "Institutional-grade financial platform for parents to secure their children's future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        <main className="mx-auto max-w-md h-[100dvh] bg-white shadow-2xl relative overflow-hidden flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
