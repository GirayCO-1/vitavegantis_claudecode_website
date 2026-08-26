import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleDetail from "@/components/detail/ArticleDetail";
import ProductDetail from "@/components/detail/ProductDetail";
import RecipeDetail from "@/components/detail/RecipeDetail";
import JsonLd from "@/components/JsonLd";
import { articlesFor, getArticleByUrl } from "@/lib/blogArticles";
import { getProductByUrl, products } from "@/lib/products";
import { getRecipeByUrl, recipes } from "@/lib/recipes";
import { SITE_URL, canonical } from "@/lib/site";
import { productSeoFor } from "@/lib/productSeo";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  productSchema,
  recipeSchema,
} from "@/lib/structuredData";

// Türkçe içerik slug'larının /en/ altındaki İngilizce karşılıkları.
// Slug iki dilde de aynıdır; yalnızca içerik çevrilir.
export function generateStaticParams() {
  return [
    ...products.map((p) => ({ slug: p.urlSlug })),
    ...recipes.map((r) => ({ slug: r.urlSlug })),
    ...articlesFor("en").map((a) => ({ slug: a.urlSlug })),
  ];
}

export const dynamicParams = false;

/** İki yönlü hreflang: TR kökte, EN /en/ altında. */
function altLanguages(slug: string) {
  return {
    "tr-TR": canonical(slug),
    en: canonical(`en/${slug}`),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const url = canonical(`en/${slug}`);

  const product = getProductByUrl(slug);
  if (product) {
    return {
      title: product.en.name,
      description: product.en.description,
      alternates: { canonical: url, languages: altLanguages(slug) },
      openGraph: {
        type: "website",
        locale: "en_US",
        url,
        title: `${product.en.name} — VitaVegantis`,
        description: product.en.description,
        images: [{ url: `${SITE_URL}${product.sceneImage}`, alt: product.en.name }],
      },
    };
  }

  const recipe = getRecipeByUrl(slug);
  if (recipe) {
    return {
      title: recipe.en.title,
      description: recipe.en.teaser,
      alternates: { canonical: url, languages: altLanguages(slug) },
      openGraph: {
        type: "article",
        locale: "en_US",
        url,
        title: `${recipe.en.title} — VitaVegantis`,
        description: recipe.en.teaser,
        images: [{ url: `${SITE_URL}${recipe.image}`, alt: recipe.en.title }],
      },
    };
  }

  const article = getArticleByUrl(slug, "en");
  if (article) {
    return {
      title: article.seoTitle ?? article.title,
      description: article.description,
      alternates: { canonical: url, languages: altLanguages(slug) },
      openGraph: {
        type: "article",
        locale: "en_US",
        url,
        title: `${article.title} — VitaVegantis`,
        description: article.description,
        images: [{ url: `${SITE_URL}${article.image}`, alt: article.title }],
      },
    };
  }

  return {};
}

export default async function SlugPageEn({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = getProductByUrl(slug);
  if (product) {
    const productSeo = productSeoFor(product.slug, "en");
    return (
      <>
        <JsonLd data={productSchema(product, "en")} />
        {productSeo?.faq.length ? (
          <JsonLd data={faqSchema(productSeo.faq, `en/${product.urlSlug}`)} />
        ) : null}
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", path: "en" },
            { name: "Products", path: "en/products" },
            { name: product.en.name, path: `en/${product.urlSlug}` },
          ])}
        />
        <ProductDetail product={product} locale="en" />
      </>
    );
  }

  const recipe = getRecipeByUrl(slug);
  if (recipe) {
    return (
      <>
        <JsonLd data={recipeSchema(recipe, "en")} />
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", path: "en" },
            { name: "Recipes", path: "en/recipes" },
            { name: recipe.en.title, path: `en/${recipe.urlSlug}` },
          ])}
        />
        <RecipeDetail recipe={recipe} locale="en" />
      </>
    );
  }

  const article = getArticleByUrl(slug, "en");
  if (article) {
    return (
      <>
        <JsonLd data={articleSchema(article, "en")} />
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", path: "en" },
            { name: "Blog", path: "en/blog" },
            { name: article.title, path: `en/${article.urlSlug}` },
          ])}
        />
        <ArticleDetail article={article} locale="en" />
      </>
    );
  }

  notFound();
}
