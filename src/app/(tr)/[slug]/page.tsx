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

// Ürün, tarif ve blog sayfaları eski sitedeki gibi kök seviyede yayınlanır
// (ör. /vita-vegantis-vegan-sucuk/, /vegan-iskender-tarifi/, /veganlik-nedir/)
// — böylece mevcut arama sıralamaları ve dış bağlantılar korunur.
export function generateStaticParams() {
  return [
    ...products.map((p) => ({ slug: p.urlSlug })),
    ...recipes.map((r) => ({ slug: r.urlSlug })),
    ...articlesFor("tr").map((a) => ({ slug: a.urlSlug })),
  ];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const url = canonical(slug);

  const product = getProductByUrl(slug);
  if (product) {
    return {
      title: product.name,
      description: product.description,
      alternates: { canonical: url },
      openGraph: {
        type: "website",
        url,
        title: `${product.name} — VitaVegantis`,
        description: product.description,
        images: [{ url: `${SITE_URL}${product.sceneImage}`, alt: product.name }],
      },
    };
  }

  const recipe = getRecipeByUrl(slug);
  if (recipe) {
    return {
      title: recipe.title,
      description: recipe.teaser,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        url,
        title: `${recipe.title} — VitaVegantis`,
        description: recipe.teaser,
        images: [{ url: `${SITE_URL}${recipe.image}`, alt: recipe.title }],
      },
    };
  }

  const article = getArticleByUrl(slug);
  if (article) {
    return {
      title: article.seoTitle ?? article.title,
      description: article.description,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        url,
        title: `${article.title} — VitaVegantis`,
        description: article.description,
        images: [{ url: `${SITE_URL}${article.image}`, alt: article.title }],
      },
    };
  }

  return {};
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = getProductByUrl(slug);
  if (product) {
    const productSeo = productSeoFor(product.slug, "tr");
    return (
      <>
        <JsonLd data={productSchema(product)} />
        {productSeo?.faq.length ? (
          <JsonLd data={faqSchema(productSeo.faq, product.urlSlug)} />
        ) : null}
        <JsonLd
          data={breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "Ürünler", path: "urunler" },
            { name: product.name, path: product.urlSlug },
          ])}
        />
        <ProductDetail product={product} />
      </>
    );
  }

  const recipe = getRecipeByUrl(slug);
  if (recipe) {
    return (
      <>
        <JsonLd data={recipeSchema(recipe)} />
        <JsonLd
          data={breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "Tarifler", path: "tarifler" },
            { name: recipe.title, path: recipe.urlSlug },
          ])}
        />
        <RecipeDetail recipe={recipe} />
      </>
    );
  }

  const article = getArticleByUrl(slug);
  if (article) {
    return (
      <>
        <JsonLd data={articleSchema(article)} />
        <JsonLd
          data={breadcrumbSchema([
            { name: "Ana Sayfa", path: "/" },
            { name: "Blog", path: "blog" },
            { name: article.title, path: article.urlSlug },
          ])}
        />
        <ArticleDetail article={article} />
      </>
    );
  }

  notFound();
}
