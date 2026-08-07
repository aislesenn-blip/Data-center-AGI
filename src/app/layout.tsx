import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://diaspedia.com"),
  title: {
    default: "diaspedia | Together, we make cross-border cheaper",
    template: "%s | diaspedia"
  },
  description: "diaspedia helps people living abroad get products from other continents more easily and cheaply. We organize schedules and combine demand to make shipping cheaper for everyone.",
  keywords: ["cross-border", "shared shipping", "international shipping", "fintech", "group shipping", "savings", "diaspora", "africa to europe", "global payments"],
  authors: [{ name: "diaspedia" }],
  creator: "diaspedia",
  publisher: "diaspedia",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://diaspedia.com",
    siteName: "diaspedia",
    title: "diaspedia | Together, we make cross-border cheaper",
    description: "diaspedia helps people living abroad get products from other continents more easily and cheaply. We organize schedules and combine demand to make shipping cheaper for everyone.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "diaspedia - Together, we make cross-border cheaper",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "diaspedia | Together, we make cross-border cheaper",
    description: "diaspedia helps people living abroad get products from other continents more easily and cheaply. We organize schedules and combine demand to make shipping cheaper for everyone.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://diaspedia.com/#organization",
      "name": "diaspedia",
      "url": "https://diaspedia.com",
      "logo": "https://diaspedia.com/logo.png",
      "description": "A future cross-border financial company starting with shipping, making international shipping and movement of goods affordable for diaspora communities.",
      "founder": {
        "@type": "Person",
        "name": "Ernest Michael"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@diaspedia.com",
        "contactType": "customer service"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://diaspedia.com/#website",
      "url": "https://diaspedia.com",
      "name": "diaspedia",
      "publisher": {
        "@id": "https://diaspedia.com/#organization"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-brand-text bg-brand-bg">{children}</body>
    </html>
  );
}
