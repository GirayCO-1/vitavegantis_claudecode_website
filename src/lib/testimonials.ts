import fs from "node:fs";
import path from "node:path";

/**
 * "Sizden Gelenler" şeridindeki Instagram gönderi kareleri.
 *
 * Kartlarda yalnızca fotoğraf gösterilir — yorum, kullanıcı adı veya beğeni
 * sayısı yoktur. Bu yüzden veri dile bağlı değil; tek bir görsel listesi.
 */
export type Testimonial = {
  image: string;
};

const FILE = path.join(process.cwd(), "src", "content", "testimonials.json");

type File = {
  items: { image?: string }[];
};

const data = JSON.parse(fs.readFileSync(FILE, "utf8")) as File;

/** Görseli girilmemiş kayıtlar atlanır; boş kart basmanın anlamı yok. */
export const testimonials: Testimonial[] = data.items
  .filter((t): t is { image: string } => Boolean(t.image))
  .map((t) => ({ image: t.image }));
