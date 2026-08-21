import type { Metadata } from "next";
import { SITE_URL, canonical } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/structuredData";
import Image from "next/image";
import Link from "next/link";
import { blogPostsFor } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles from the VitaVegantis blog on plant-based eating, plant protein, sustainability and vegan cooking.",
  alternates: {
    canonical: canonical("en/blog"),
    languages: {
      "tr-TR": canonical("blog"),
      en: canonical("en/blog"),
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: canonical("en/blog"),
    title: "Blog — VitaVegantis",
    description:
      "Articles on plant-based eating, plant protein, sustainability and vegan cooking.",
    images: [`${SITE_URL}/blog/vegan-urun-tuketimi.webp`],
  },
};

export default function BlogPageEn() {
  const blogPosts = blogPostsFor("en");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "en" },
          { name: "Blog", path: "en/blog" },
        ])}
      />
      <JsonLd
        data={itemListSchema(
          "en/blog",
          "VitaVegantis Blog",
          blogPosts.map((p) => ({
            name: p.title,
            urlSlug: p.href.replace(/^\/|\/$/g, ""),
          })),
        )}
      />
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-accent text-2xl text-plum">Our reading corner</p>
            <h1 className="font-display mt-2 text-4xl font-semibold text-forest sm:text-5xl">
              Blog
            </h1>
            <p className="mt-4 text-forest/70">
              Writing on plant-based eating, sustainability and the
              VitaVegantis kitchen.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {blogPosts.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group flex flex-col overflow-hidden rounded-3xl border border-forest/10 bg-white/60 transition-shadow hover:shadow-lg"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-lg font-semibold text-forest">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-forest/70">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 text-sm font-medium text-coral group-hover:underline">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
