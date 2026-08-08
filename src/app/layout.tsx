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
    default: "diaspedia | Premium Social Travel Utility",
    template: "%s | diaspedia"
  },
  description: "diaspedia helps travelers organize trips, coordinate passenger bookings, and discover friends traveling on active rail and bus routes.",
  keywords: ["travel utility", "social travel", "passenger tickets", "deutsche bahn", "flixbus", "eurostar", "group routes", "diaspedia"],
  authors: [{ name: "diaspedia" }],
  creator: "diaspedia",
  publisher: "diaspedia",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://diaspedia.com",
    siteName: "diaspedia",
    title: "diaspedia | Premium Social Travel Utility",
    description: "diaspedia helps travelers organize trips, coordinate passenger bookings, and discover friends traveling on active rail and bus routes.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "diaspedia - Premium Social Travel Utility",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "diaspedia | Premium Social Travel Utility",
    description: "diaspedia helps travelers organize trips, coordinate passenger bookings, and discover friends traveling on active rail and bus routes.",
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
      "description": "A premium social travel utility organizing discoverable trips, active traveler routes, and direct passenger ticket bookings.",
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
