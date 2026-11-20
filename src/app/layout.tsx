import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { SITE } from "@/constants/site";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "SK Design — Impression & Publicité | Enseignes LED Tunisie",
  description:
    "Atelier SK Design : enseignes lumineuses LED, habillage façade, vitrophanie, plaques professionnelles et imprimerie numérique en Tunisie. Devis gratuit sous 2h.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: SITE.url,
    siteName: SITE.name,
    locale: "fr_TN",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SK Design — Impression & Publicité" }],
  },
  keywords: [
    "enseigne LED Tunisie",
    "impression grand format",
    "habillage façade",
    "SK Design",
    "publicité Tunisie",
  ],
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${plusJakarta.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-slate-900">
        {children}
      </body>
    </html>
  );
}
