import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#F6F4ED",
};

export const metadata: Metadata = {
  title: "FEEP Global",
  description: "FEEP helps families pay school fees through simple, interest-free monthly plans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-feep-bg text-zinc-900 selection:bg-feep-primary/30">
      <body className={`${inter.className} min-h-screen bg-feep-bg text-zinc-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
