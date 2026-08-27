import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/lib/i18n";

export type Testimonial = {
  /** Gerçek gönderi karesi varsa yolu; yoksa emoji + renk gösterilir. */
  image?: string;
  emoji?: string;
  bg?: string;
  caption: string;
  handle: string;
  likes: string;
};

const FILE = path.join(process.cwd(), "src", "content", "testimonials.json");

type File = {
  /** true ise içerik yer tutucudur; gerçek gönderilerle değiştirilmeli. */
  placeholder?: boolean;
  items: {
    image?: string;
    emoji?: string;
    bg?: string;
    caption: string;
    captionEn?: string;
    handle: string;
    likes: string;
  }[];
};

const data = JSON.parse(fs.readFileSync(FILE, "utf8")) as File;

export function testimonialsFor(locale: Locale): Testimonial[] {
  return data.items.map((t) => ({
    ...(t.image ? { image: t.image } : {}),
    ...(t.emoji ? { emoji: t.emoji } : {}),
    ...(t.bg ? { bg: t.bg } : {}),
    caption: locale === "en" ? (t.captionEn ?? t.caption) : t.caption,
    handle: t.handle,
    likes: t.likes,
  }));
}
