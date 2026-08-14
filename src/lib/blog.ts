import { blogArticles } from "@/lib/blogArticles";
import { recipes } from "@/lib/recipes";

export type BlogPost = {
  title: string;
  excerpt: string;
  image: string;
  /** Site içi adres — eski sitedeki URL ile birebir aynı. */
  href: string;
};

/**
 * Blog listesi: eski sitedeki sıralamayı korur.
 * Tarif yazıları tarif sayfalarına, diğerleri taşınan makale sayfalarına gider.
 */
const order = [
  "vegan-iskender-tarifi",
  "bitki-bazli-sucuklu-kuru-fasulye-tarifi",
  "bitki-bazli-salcali-sosis-tarifi",
  "vegan-urun-tuketimi-ve-bitki-bazli-beslenmede-turkiye-ve-avrupa-yukseliste",
  "vegan-beslenmeye-baslamaniza-yardimci-olacak-7-saglikli-ipucu",
  "vejetaryenler-ne-yemez",
  "vegan-olmanin-sagligimiza-en-onemli-7-faydasi",
  "vegan-vejetaryen-pesketaryen-fleksitaryen-farki-nedir",
  "2023de-takip-edilecek-bitki-bazli-trendler",
  "veganizm-ve-cevre",
  "kedi-ve-kopeklerle-seyahat-ipuculari",
  "veganlik-nedir",
];

function build(): BlogPost[] {
  const bySlug = new Map<string, BlogPost>();

  for (const recipe of recipes) {
    bySlug.set(recipe.urlSlug, {
      title: recipe.title,
      excerpt: recipe.teaser,
      image: recipe.image,
      href: `/${recipe.urlSlug}`,
    });
  }

  for (const article of blogArticles) {
    bySlug.set(article.urlSlug, {
      title: article.title,
      excerpt: article.description,
      image: article.image,
      href: `/${article.urlSlug}`,
    });
  }

  return order
    .map((slug) => bySlug.get(slug))
    .filter((post): post is BlogPost => Boolean(post));
}

export const blogPosts: BlogPost[] = build();
