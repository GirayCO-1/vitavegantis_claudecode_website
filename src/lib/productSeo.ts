import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/lib/i18n";

/**
 * Ürün sayfalarının altındaki SEO içerik bloğu.
 *
 * Her ürün için src/content/product-seo/<slug>.json dosyası olabilir;
 * dosyası olmayan üründe blok hiç render edilmez. Yeni bir ürüne içerik
 * eklemek için tek yapılması gereken o slug adıyla bir dosya koymak.
 */
export type SeoBullet = { label: string; text: string };

export type SeoSection = {
  heading: string;
  paragraphs: string[];
  bullets?: SeoBullet[];
  closing?: string;
  link?: { before: string; label: string; section: string; after: string };
};

export type SeoFaq = {
  q: string;
  a: string;
  link?: { section: string; label: string };
};

export type ProductSeo = {
  sceneAlt?: string;
  mapAlt?: string;
  sections: SeoSection[];
  faqHeading: string;
  faq: SeoFaq[];
};

type RawBullet = { label: string; labelEn: string; text: string; textEn: string };
type RawSection = {
  heading: string;
  headingEn: string;
  paragraphs: string[];
  paragraphsEn: string[];
  bullets?: RawBullet[];
  closing?: string;
  closingEn?: string;
  link?: {
    before: string;
    beforeEn: string;
    label: string;
    labelEn: string;
    section: string;
    after: string;
    afterEn: string;
  };
};
type RawFaq = {
  q: string;
  qEn: string;
  a: string;
  aEn: string;
  link?: { section: string; label: string; labelEn: string };
};
type RawFile = {
  sceneAlt?: string;
  sceneAltEn?: string;
  mapAlt?: string;
  mapAltEn?: string;
  sections: RawSection[];
  faqHeading: string;
  faqHeadingEn: string;
  faq: RawFaq[];
};

const DIR = path.join(process.cwd(), "src", "content", "product-seo");

function load(): Record<string, RawFile> {
  if (!fs.existsSync(DIR)) return {};
  const out: Record<string, RawFile> = {};
  for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith(".json"))) {
    out[file.replace(/\.json$/, "")] = JSON.parse(
      fs.readFileSync(path.join(DIR, file), "utf8"),
    ) as RawFile;
  }
  return out;
}

const files = load();

export function productSeoFor(
  slug: string,
  locale: Locale,
): ProductSeo | undefined {
  const raw = files[slug];
  if (!raw) return undefined;
  const en = locale === "en";

  return {
    ...(en ? raw.sceneAltEn && { sceneAlt: raw.sceneAltEn } : raw.sceneAlt && { sceneAlt: raw.sceneAlt }),
    ...(en ? raw.mapAltEn && { mapAlt: raw.mapAltEn } : raw.mapAlt && { mapAlt: raw.mapAlt }),
    sections: raw.sections.map((s) => ({
      heading: en ? s.headingEn : s.heading,
      paragraphs: en ? s.paragraphsEn : s.paragraphs,
      ...(s.bullets && {
        bullets: s.bullets.map((b) => ({
          label: en ? b.labelEn : b.label,
          text: en ? b.textEn : b.text,
        })),
      }),
      ...((en ? s.closingEn : s.closing) && {
        closing: (en ? s.closingEn : s.closing) as string,
      }),
      ...(s.link && {
        link: {
          before: en ? s.link.beforeEn : s.link.before,
          label: en ? s.link.labelEn : s.link.label,
          section: s.link.section,
          after: en ? s.link.afterEn : s.link.after,
        },
      }),
    })),
    faqHeading: en ? raw.faqHeadingEn : raw.faqHeading,
    faq: raw.faq.map((f) => ({
      q: en ? f.qEn : f.q,
      a: en ? f.aEn : f.a,
      ...(f.link && {
        link: {
          section: f.link.section,
          label: en ? f.link.labelEn : f.link.label,
        },
      }),
    })),
  };
}
