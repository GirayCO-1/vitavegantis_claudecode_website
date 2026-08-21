import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SetHtmlLang from "@/components/SetHtmlLang";
import { SITE_DESCRIPTION_EN, SITE_NAME, canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: "VitaVegantis — Plant-Based High-Protein Vegan Foods",
    template: "%s — VitaVegantis",
  },
  description: SITE_DESCRIPTION_EN,
  alternates: {
    canonical: canonical("en"),
    languages: { "tr-TR": canonical("/"), en: canonical("en") },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: canonical("en"),
    title: "VitaVegantis — Plant-Based High-Protein Vegan Foods",
    description: SITE_DESCRIPTION_EN,
    images: [
      {
        url: "/og-cover.webp",
        width: 1200,
        height: 630,
        alt: "VitaVegantis plant-based products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VitaVegantis — Plant-Based High-Protein Vegan Foods",
    description: SITE_DESCRIPTION_EN,
    images: ["/og-cover.webp"],
  },
};

// İngilizce site: /en/ altındaki tüm sayfalar.
export default function EnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SetHtmlLang lang="en" />
      <Navbar locale="en" />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer locale="en" />
    </>
  );
}
