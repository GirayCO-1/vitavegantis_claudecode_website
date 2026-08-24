import fs from "node:fs";
import path from "node:path";

export type SalesPoint = {
  name: string;
  logo: string;
  href?: string;
};

/**
 * Satış noktaları admin panelinden düzenlenir; veri src/content/sales-points.json
 * dosyasında durur ve build sırasında (SSG) okunur.
 */
const FILE = path.join(process.cwd(), "src", "content", "sales-points.json");

const raw = JSON.parse(fs.readFileSync(FILE, "utf8")) as {
  points: { name: string; logo: string; href?: string }[];
};

export const salesPoints: SalesPoint[] = raw.points.map((p) => ({
  name: p.name,
  logo: p.logo,
  // Panel boş bırakılan bağlantıyı "" olarak yazabilir; bağlantısız kart olsun.
  ...(p.href ? { href: p.href } : {}),
}));
