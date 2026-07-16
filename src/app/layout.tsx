import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FEEP | Your payments. Your terms.",
  description: "Payment infrastructure for life's essential services. We pay your provider upfront, you split the cost over time with zero extra fees. Built for scale in emerging markets.",
  openGraph: {
    title: "FEEP | Payment Infrastructure for Essential Services",
    description: "Access life's essentials. Pay on your schedule. We pay the provider upfront so you can split the exact cost over time.",
    url: "https://feep.africa",
    siteName: "FEEP",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FEEP | Payment Infrastructure for Essential Services",
    description: "Access life's essentials. Pay on your schedule. We pay the provider upfront so you can split the exact cost over time.",
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
