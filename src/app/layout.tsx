import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Caveat, Baloo_2 } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, canonical } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/structuredData";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VitaVegantis — Bitki Bazlı Yüksek Proteinli Vegan Ürünler",
    template: "%s — VitaVegantis",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: canonical("/") },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE_NAME,
    url: canonical("/"),
    title: "VitaVegantis — Bitki Bazlı Yüksek Proteinli Vegan Ürünler",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-cover.webp",
        width: 1200,
        height: 630,
        alt: "VitaVegantis bitki bazlı ürünler",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VitaVegantis — Bitki Bazlı Yüksek Proteinli Vegan Ürünler",
    description: SITE_DESCRIPTION,
    images: ["/og-cover.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  keywords: [
    "vegan ürünler",
    "bitki bazlı",
    "vegan sosis",
    "vegan sucuk",
    "bitkisel protein",
    "yüksek proteinli vegan",
    "besin mayası",
    "vegan köfte",
    "VitaVegantis",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "food",
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0b4a28",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${fraunces.variable} ${inter.variable} ${caveat.variable} ${baloo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-forest">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {children}
      </body>
    </html>
  );
}
