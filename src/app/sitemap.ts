import type { MetadataRoute } from "next";
import { articlesFor } from "@/lib/blogArticles";
import { products } from "@/lib/products";
import { recipes } from "@/lib/recipes";
import { SITE_URL, canonical } from "@/lib/site";
import { sectionMap } from "@/lib/i18n";

// Statik dışa aktarmada (IHS) bu rota derleme anında üretilmeli.
export const dynamic = "force-static";

type Entry = {
  tr: string; // TR yolu (kök seviyede)
  en: string; // EN yolu (/en altında)
  priority: number;
  changeFrequency: "monthly" | "yearly";
  /** Sayfaya ait görseller; sitemap'e <image:image> olarak yazılır. */
  images?: string[];
};

/** Görsel yolunu tam adrese çevirir; sitemap mutlak adres istiyor. */
const tam = (yol: string) => `${SITE_URL}${yol}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: Entry[] = [
    { tr: "/", en: "en", priority: 1, changeFrequency: "monthly" },
    ...Object.entries(sectionMap).map(([tr, en]) => ({
      tr,
      en: `en/${en}`,
      priority: tr === "urunler" ? 0.9 : tr === "iletisim" ? 0.5 : 0.7,
      changeFrequency: "monthly" as const,
    })),
    ...products.map((p) => ({
      tr: p.urlSlug,
      en: `en/${p.urlSlug}`,
      priority: 0.9,
      changeFrequency: "monthly" as const,
      images: [tam(p.sceneImage), tam(p.image)],
    })),
    ...recipes.map((r) => ({
      tr: r.urlSlug,
      en: `en/${r.urlSlug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
      // Kapak görseli + varsa alt tariflerin görselleri.
      images: [tam(r.image), ...(r.variants?.map((v) => tam(v.image)) ?? [])],
    })),
    ...articlesFor("tr").map((a) => ({
      tr: a.urlSlug,
      en: `en/${a.urlSlug}`,
      priority: 0.6,
      changeFrequency: "yearly" as const,
      images: [tam(a.image)],
    })),
  ];

  // Her içerik iki dilde de listelenir; hreflang eşleşmesi sitemap üzerinden
  // bildirilir (Google hreflang'i sitemap'ten de okur).
  return entries.flatMap((e) => {
    const languages = {
      "tr-TR": canonical(e.tr),
      en: canonical(e.en),
      "x-default": canonical(e.tr),
    };
    return [
      {
        url: canonical(e.tr),
        lastModified: now,
        changeFrequency: e.changeFrequency,
        priority: e.priority,
        alternates: { languages },
        images: e.images,
      },
      {
        url: canonical(e.en),
        lastModified: now,
        changeFrequency: e.changeFrequency,
        priority: e.priority,
        alternates: { languages },
        images: e.images,
      },
    ];
  });
}
