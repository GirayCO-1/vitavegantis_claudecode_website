import type { MetadataRoute } from "next";
import { blogArticles } from "@/lib/blogArticles";
import { products } from "@/lib/products";
import { recipes } from "@/lib/recipes";
import { canonical } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "urunler", priority: 0.9 },
    { path: "tarifler", priority: 0.8 },
    { path: "hakkimizda", priority: 0.7 },
    { path: "neden-bitki-bazli", priority: 0.7 },
    { path: "satisnoktalari", priority: 0.8 },
    { path: "blog", priority: 0.6 },
    { path: "iletisim", priority: 0.5 },
  ];

  return [
    ...staticPages.map((p) => ({
      url: canonical(p.path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    ...products.map((p) => ({
      url: canonical(p.urlSlug),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...recipes.map((r) => ({
      url: canonical(r.urlSlug),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogArticles.map((a) => ({
      url: canonical(a.urlSlug),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
