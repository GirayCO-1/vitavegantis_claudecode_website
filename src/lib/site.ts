/** Yayın adresi. Deploy ortamında NEXT_PUBLIC_SITE_URL ile geçersiz kılınabilir. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vitavegantis.com"
).replace(/\/$/, "");

export const SITE_NAME = "VitaVegantis";

export const SITE_DESCRIPTION =
  "Doğadan sofranıza — tek bir katkı maddesi olmadan. Yüksek proteinli, bitki bazlı, katkısız gıda ürünleri.";

/** Eski site trailing slash kullanıyordu; kanonik adresler de öyle. */
export function canonical(path: string) {
  if (path === "/") return `${SITE_URL}/`;
  const clean = path.replace(/^\/|\/$/g, "");
  return `${SITE_URL}/${clean}/`;
}
