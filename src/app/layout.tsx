import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BluePost | Move anything. Anywhere. Simply.",
  description: "A modern logistics platform connecting people and businesses who need to move goods with available transportation capacity across Tanzania.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-bluepost-bg text-bluepost-dark min-h-screen">
        {/* Full screen edge-to-edge experience */}
        {children}
      </body>
    </html>
  );
}
