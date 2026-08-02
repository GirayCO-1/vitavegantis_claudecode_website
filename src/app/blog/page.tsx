import type { Metadata } from "next";
import Image from "next/image";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — VitaVegantis",
  description: "Bitki bazlı beslenme üzerine yazılar ve haberler.",
};

export default function BlogPage() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-accent text-2xl text-plum">Okuma Köşemiz</p>
          <h1 className="font-display mt-2 text-4xl font-semibold text-forest sm:text-5xl">
            Blog
          </h1>
          <p className="mt-4 text-forest/70">
            Bitki bazlı beslenme, sürdürülebilirlik ve VitaVegantis
            mutfağından yazılar.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {blogPosts.map((post) => (
            <a
              key={post.href}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
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
                  Devamını oku →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
