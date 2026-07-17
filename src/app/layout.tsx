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
  metadataBase: new URL("https://feep.africa"),
  title: {
    default: "FEEP | Payment Infrastructure for Essential Services",
    template: "%s | FEEP"
  },
  description: "FEEP bridges the gap between essential service providers who need timely payments and people who need flexible schedules, starting with education and housing.",
  keywords: ["payment infrastructure", "flexible payments", "essential services", "education financing", "emerging markets", "fintech africa", "B2B2C payments"],
  authors: [{ name: "FEEP" }],
  creator: "FEEP",
  publisher: "FEEP",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://feep.africa",
    siteName: "FEEP",
    title: "FEEP | Payment Infrastructure for Essential Services",
    description: "FEEP bridges the gap between essential service providers who need timely payments and people who need flexible schedules, starting with education and housing.",
    images: [
      {
        url: "/og-image.jpg", // You'll need to add this to public/ later
        width: 1200,
        height: 630,
        alt: "FEEP - Payment Infrastructure for Essential Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FEEP | Payment Infrastructure for Essential Services",
    description: "FEEP bridges the gap between essential service providers who need timely payments and people who need flexible schedules, starting with education and housing.",
    images: ["/og-image.jpg"], // Ensure this matches OG image
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
      "@id": "https://feep.africa/#organization",
      "name": "FEEP",
      "url": "https://feep.africa",
      "logo": "https://feep.africa/logo-school.png",
      "description": "Payment infrastructure for essential services in emerging markets.",
      "founder": {
        "@type": "Person",
        "name": "Ernest Michael"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hello@feep.africa",
        "contactType": "customer service"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://feep.africa/#website",
      "url": "https://feep.africa",
      "name": "FEEP",
      "publisher": {
        "@id": "https://feep.africa/#organization"
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
      <body className="font-sans antialiased text-feep-text bg-feep-bg">{children}</body>
    </html>
  );
}
