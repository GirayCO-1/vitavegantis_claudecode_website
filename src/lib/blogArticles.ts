import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { load as parseYaml } from "js-yaml";
import type { Locale } from "@/lib/i18n";

/**
 * Eski sitedeki blog yazıları. İçerikler src/content/blog altında markdown
 * olarak duruyor ve build sırasında (SSG) HTML'e çevriliyor — yani yazının
 * tamamı, JavaScript çalışmadan da sayfanın kaynağında yer alıyor.
 *
 * urlSlug, eski sitedeki adresin birebir aynısıdır; SEO devamlılığı buna bağlı.
 * İngilizce çeviriler src/content/blog/en altında aynı slug ile durur.
 */
export type BlogArticle = {
  urlSlug: string;
  title: string;
  /** Arama sonucunda kesilmemesi için kısaltılmış başlık; yoksa title kullanılır. */
  seoTitle?: string;
  description: string;
  image: string;
  /** Panelden eklenen yazılarda yayın tarihi (YYYY-AA-GG); listede sıralar. */
  date?: string;
  /** Markdown'dan üretilmiş HTML gövde. */
  html: string;
};

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

/**
 * `---` blokları arasındaki YAML frontmatter. Admin paneli değerleri tırnak
 * içinde veya çok satırlı yazabildiği için gerçek YAML ayrıştırıcı kullanılıyor.
 */
function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error("Frontmatter bulunamadı");
  }
  const data = (parseYaml(match[1]) ?? {}) as Record<string, string>;
  return { data, body: match[2] };
}

function load(dir: string): BlogArticle[] {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, body } = parseFrontmatter(raw);
      return {
        urlSlug: file.replace(/\.md$/, ""),
        title: data.title,
        ...(data.seoTitle && { seoTitle: data.seoTitle }),
        description: data.description,
        image: data.image,
        ...(data.date && { date: String(data.date).slice(0, 10) }),
        html: marked.parse(body, { async: false }) as string,
      };
    });
}

const byLocale: Record<Locale, BlogArticle[]> = {
  tr: load(CONTENT_DIR),
  en: load(path.join(CONTENT_DIR, "en")),
};

export function articlesFor(locale: Locale): BlogArticle[] {
  return byLocale[locale];
}

export function getArticleByUrl(urlSlug: string, locale: Locale = "tr") {
  return articlesFor(locale).find((a) => a.urlSlug === urlSlug);
}
