import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Using Inter for an invisible, corporate, high-contrast structural feel
const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0A1128", // Deep Navy Blue
};

export const metadata: Metadata = {
  title: "Global Payment Network",
  description: "Universal payment acceptance and spending infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased h-[100dvh] flex flex-col bg-stone-gray text-midnight-black selection:bg-navy-blue selection:text-white`}>
        <main className="flex-1 overflow-y-auto w-full max-w-md mx-auto bg-electric-white shadow-2xl h-[100dvh] flex flex-col relative border-x border-border">
            {children}
        </main>
      </body>
    </html>
  );
}
