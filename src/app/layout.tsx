import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Using Inter for a modern, clean, confident, high-end feel
const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#050505", // Rich Black
};

export const metadata: Metadata = {
  title: "Timebus",
  description: "Book your daily commute with certainty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased h-[100dvh] flex flex-col bg-[#FAFAFA] text-[#050505]`}>
        <main className="flex-1 overflow-y-auto w-full max-w-md mx-auto bg-white shadow-2xl h-full flex flex-col relative">
            {children}
        </main>
      </body>
    </html>
  );
}
