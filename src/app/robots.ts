import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Statik dışa aktarmada (IHS) bu rota derleme anında üretilmeli.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // İçerik paneli arama sonuçlarında yer almamalı.
      disallow: ["/admin"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
