import type { MetadataRoute } from "next";
import { blogArticles } from "@/lib/blogArticles";
import { products } from "@/lib/products";
import { recipes } from "@/lib/recipes";
import { canonical } from "@/lib/site";
import { sectionMap } from "@/lib/i18n";

type Entry = {
  tr: string; // TR yolu (kök seviyede)
  en: string; // EN yolu (/en altında)
  priority: number;
  changeFrequency: "monthly" | "yearly";
};

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
    })),
    ...recipes.map((r) => ({
      tr: r.urlSlug,
      en: `en/${r.urlSlug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    ...blogArticles.map((a) => ({
      tr: a.urlSlug,
      en: `en/${a.urlSlug}`,
      priority: 0.6,
      changeFrequency: "yearly" as const,
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
      },
      {
        url: canonical(e.en),
        lastModified: now,
        changeFrequency: e.changeFrequency,
        priority: e.priority,
        alternates: { languages },
      },
    ];
  });
}
