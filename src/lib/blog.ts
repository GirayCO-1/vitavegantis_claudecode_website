import { articlesFor } from "@/lib/blogArticles";
import { recipes } from "@/lib/recipes";
import { itemHref, type Locale } from "@/lib/i18n";

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

export function blogPostsFor(locale: Locale): BlogPost[] {
  const bySlug = new Map<string, BlogPost>();

  for (const recipe of recipes) {
    bySlug.set(recipe.urlSlug, {
      title: locale === "en" ? recipe.en.title : recipe.title,
      excerpt: locale === "en" ? recipe.en.teaser : recipe.teaser,
      image: recipe.image,
      href: itemHref(recipe.urlSlug, locale),
    });
  }

  for (const article of articlesFor(locale)) {
    bySlug.set(article.urlSlug, {
      title: article.title,
      excerpt: article.description,
      image: article.image,
      href: itemHref(article.urlSlug, locale),
    });
  }

  return order
    .map((slug) => bySlug.get(slug))
    .filter((post): post is BlogPost => Boolean(post));
}

export const blogPosts: BlogPost[] = blogPostsFor("tr");
