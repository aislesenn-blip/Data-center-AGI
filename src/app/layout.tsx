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
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  title: "Wi-Pa",
  description: "Wireless Paper - Instant, trusted money movement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased h-[100dvh] flex flex-col bg-[#000000] text-[#000000]`}>
        <main className="flex-1 overflow-hidden w-full max-w-md mx-auto bg-[#F9FAFB] h-[100dvh] flex flex-col relative shadow-2xl">
            {children}
        </main>
      </body>
    </html>
  );
}
