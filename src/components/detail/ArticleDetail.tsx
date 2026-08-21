import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/lib/blogArticles";
import SalesPointsCta from "@/components/SalesPointsCta";
import { href, type Locale } from "@/lib/i18n";

const BACK = { tr: "← Blog", en: "← Blog" } as const;

export default function ArticleDetail({
  article,
  locale = "tr",
}: {
  article: BlogArticle;
  locale?: Locale;
}) {
  return (
    <article className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href={href("blog", locale)}
          className="text-sm font-medium text-coral hover:underline"
        >
          {BACK[locale]}
        </Link>

        <h1 className="font-display mt-4 text-3xl leading-tight font-semibold text-forest sm:text-4xl md:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-forest/70">
          {article.description}
        </p>

        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[32px] shadow-lg shadow-forest/10">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(min-width: 768px) 768px, 90vw"
            className="object-cover"
            priority
          />
        </div>

        {/* İçerik build sırasında markdown'dan üretiliyor; dış girdi yok. */}
        <div
          className="article-body mt-12"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
      </div>

      <SalesPointsCta locale={locale} />
    </article>
  );
}
