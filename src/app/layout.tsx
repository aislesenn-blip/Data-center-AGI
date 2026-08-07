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
    default: "diaspedia | Together, we make cross-border cheaper.",
    template: "%s | diaspedia"
  },
  description: "diaspedia helps people living abroad get products from their home countries. By bringing people together on the same shipping route, we make shipping cheaper for everyone.",
  keywords: ["cross-border", "collective shipping", "diaspora payments", "cheap international shipping", "diaspedia", "africa cargo savings", "social fintech"],
  authors: [{ name: "diaspedia" }],
  creator: "diaspedia",
  publisher: "diaspedia",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://diaspedia.com",
    siteName: "diaspedia",
    title: "diaspedia | Together, we make cross-border cheaper.",
    description: "diaspedia helps people living abroad get products from their home countries. By bringing people together on the same shipping route, we make shipping cheaper for everyone.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "diaspedia - Together, we make cross-border cheaper.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "diaspedia | Together, we make cross-border cheaper.",
    description: "diaspedia helps people living abroad get products from their home countries. By bringing people together on the same shipping route, we make shipping cheaper for everyone.",
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
      "description": "Together, we make cross-border cheaper. Starting with combined shipping routes for global diasporas.",
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
      <body className="font-sans antialiased text-diaspedia-text bg-diaspedia-bg">{children}</body>
    </html>
  );
}
