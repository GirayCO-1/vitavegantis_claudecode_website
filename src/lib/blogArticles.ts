import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

/**
 * Eski sitedeki blog yazıları. İçerikler src/content/blog altında markdown
 * olarak duruyor ve build sırasında (SSG) HTML'e çevriliyor — yani yazının
 * tamamı, JavaScript çalışmadan da sayfanın kaynağında yer alıyor.
 *
 * urlSlug, eski sitedeki adresin birebir aynısıdır; SEO devamlılığı buna bağlı.
 */
export type BlogArticle = {
  urlSlug: string;
  title: string;
  /** Arama sonucunda kesilmemesi için kısaltılmış başlık; yoksa title kullanılır. */
  seoTitle?: string;
  description: string;
  image: string;
  /** Markdown'dan üretilmiş HTML gövde. */
  html: string;
};

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

/** Basit frontmatter ayrıştırıcı: `---` blokları arasındaki `anahtar: değer`. */
function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error("Frontmatter bulunamadı");
  }
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    data[line.slice(0, sep).trim()] = line.slice(sep + 1).trim();
  }
  return { data, body: match[2] };
}

function load(): BlogArticle[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const { data, body } = parseFrontmatter(raw);
      return {
        urlSlug: file.replace(/\.md$/, ""),
        title: data.title,
        ...(data.seoTitle && { seoTitle: data.seoTitle }),
        description: data.description,
        image: data.image,
        html: marked.parse(body, { async: false }) as string,
      };
    });
}

export const blogArticles: BlogArticle[] = load();

export function getArticleByUrl(urlSlug: string) {
  return blogArticles.find((a) => a.urlSlug === urlSlug);
}
