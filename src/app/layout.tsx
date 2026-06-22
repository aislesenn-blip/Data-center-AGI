import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0A4D3C",
};

export const metadata: Metadata = {
  title: "Child Card Platform",
  description: "Secure long-term digital card platform for your child's future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased h-[100dvh] flex flex-col bg-[#F8FAFC]`}>
        <main className="flex-1 overflow-y-auto w-full max-w-md mx-auto bg-white shadow-xl h-full flex flex-col relative">
            {children}
        </main>
      </body>
    </html>
  );
}
