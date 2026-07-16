import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FEEP | Your payments. Your terms.",
  description: "We help essential service providers make payments more accessible and flexible for everyone.",
  openGraph: {
    title: "FEEP | Payment Infrastructure for Essential Services",
    description: "We help essential service providers make payments more accessible and flexible for everyone.",
    url: "https://feep.africa",
    siteName: "FEEP",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FEEP | Payment Infrastructure for Essential Services",
    description: "We help essential service providers make payments more accessible and flexible for everyone.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
