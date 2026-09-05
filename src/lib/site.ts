/** Yayın adresi. Deploy ortamında NEXT_PUBLIC_SITE_URL ile geçersiz kılınabilir. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vitavegantis.com"
).replace(/\/$/, "");

export const SITE_NAME = "VitaVegantis";

export const SITE_DESCRIPTION =
  "Doğadan sofranıza — en lezzetli haliyle. Yüksek proteinli, bitki bazlı vegan gıda ürünleri: vegan sosis, sucuk, döner, köfte ve besin mayası.";

export const SITE_DESCRIPTION_EN =
  "From nature to your table — at its most delicious. High-protein, plant-based vegan foods: vegan sausage, sucuk, döner, meatballs and nutritional yeast.";

/** Eski site trailing slash kullanıyordu; kanonik adresler de öyle. */
export function canonical(path: string) {
  if (path === "/") return `${SITE_URL}/`;
  const clean = path.replace(/^\/|\/$/g, "");
  return `${SITE_URL}/${clean}/`;
}
