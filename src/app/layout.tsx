import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FEEP | Financial Infrastructure for Education",
  description: "We guarantee full upfront tuition for schools, while giving families the flexibility to pay in zero-interest monthly installments. Built for scale in emerging markets.",
  openGraph: {
    title: "FEEP | Financial Infrastructure for Education",
    description: "We guarantee full upfront tuition for schools, while giving families the flexibility to pay in zero-interest monthly installments.",
    url: "https://feep.africa",
    siteName: "FEEP",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FEEP | Financial Infrastructure for Education",
    description: "We guarantee full upfront tuition for schools, while giving families the flexibility to pay in zero-interest monthly installments.",
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
