import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://leapparkour.cz"),
  title: {
    default: "Leap Parkour – Parkour komunita na Vysočině",
    template: "%s | Leap Parkour",
  },
  description:
    "Největší parkourová komunita na Vysočině. Pořádáme parkourové kroužky pro děti v Havlíčkově Brodě a letní tábor LeapCamp plný pohybu, her a zážitků.",
  openGraph: {
    title: "Leap Parkour – Parkour komunita na Vysočině",
    description: "Pořádáme parkourové kroužky pro děti v Havlíčkově Brodě a letní tábor LeapCamp plný pohybu, her a zážitků.",
    url: "https://leapparkour.cz",
    siteName: "Leap Parkour",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: "/images/2024_08_DSC05433.jpg",
        width: 1200,
        height: 630,
        alt: "Leap Parkour",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsClub",
  "name": "Leap Parkour",
  "alternateName": "LeapParkour z.s.",
  "url": "https://leapparkour.cz",
  "logo": "https://leapparkour.cz/images/logo.svg",
  "image": "https://leapparkour.cz/images/2024_08_DSC05433.jpg",
  "description": "Největší parkourová komunita na Vysočině. Pořádáme parkourové kroužky pro děti v Havlíčkově Brodě a letní tábor LeapCamp.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Práčat 1886",
    "addressLocality": "Havlíčkův Brod",
    "postalCode": "58001",
    "addressRegion": "Vysočina",
    "addressCountry": "CZ"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 49.611914,
    "longitude": 15.5802 // Havlíčkův Brod region coordinates
  },
  "email": "leapparkour@seznam.cz",
  "sameAs": [
    "https://www.instagram.com/leapparkour/",
    "https://www.facebook.com/share/YG84oj6nvVgR4NvM/",
    "https://www.youtube.com/@LeapParkour"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="no-js" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.remove('no-js')",
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
