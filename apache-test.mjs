import { redirectPairs } from "./config/redirects.mjs";

const BASE = "http://localhost:8099";
let fail = 0;

/** Yönlendirmeyi takip etmeden tek adımlık sonucu döner. */
async function once(url) {
  const r = await fetch(BASE + url, { redirect: "manual" });
  return { status: r.status, location: r.headers.get("location") };
}

/** Yönlendirmeleri sonuna kadar takip eder. */
async function follow(url) {
  const r = await fetch(BASE + url);
  return { status: r.status, url: r.url.replace(BASE, "") };
}

console.log("=== 1) Eski adresler doğru sayfaya gidiyor mu ===");
for (const { from, to } of redirectPairs) {
  for (const variant of [from, `${from}/`]) {
    const step = await once(variant);
    const final = await follow(variant);
    const ok = final.status === 200 && final.url === `${to}/`;
    if (!ok) {
      console.log(`  HATA ${variant} → ${step.status} ${step.location} → son: ${final.status} ${final.url} (beklenen ${to}/)`);
      fail++;
    }
    // Çift eğik çizgi hatası kontrolü
    if (step.location && step.location.includes("//") && !step.location.startsWith("http")) {
      console.log(`  HATA çift eğik çizgi: ${variant} → ${step.location}`);
      fail++;
    }
  }
}
if (fail === 0) console.log(`  ${redirectPairs.length} yönlendirme, eğik çizgili ve çizgisiz hâlleriyle doğru ✓`);

console.log("\n=== 2) Önek eşleştirme hatası geri geldi mi ===");
// Bu adresler HİÇBİR kurala takılmamalı; 404 dönmeli.
const mustNotRedirect = [
  "/magaza-baska-sey/",
  "/urunler/vegan-sosis-eski/",
  "/vizyon-misyon-2/",
  "/sepetim/",
];
for (const u of mustNotRedirect) {
  const step = await once(u);
  if (step.status >= 300 && step.status < 400) {
    console.log(`  HATA: ${u} yönlendirildi → ${step.location} (yönlendirilmemeliydi)`);
    fail++;
  }
}
if (fail === 0) console.log("  Benzer adresler kurallara bulaşmıyor ✓");

console.log("\n=== 3) Gerçek sayfalar ===");
const pages = ["/", "/urunler/", "/tarifler/", "/blog/", "/satisnoktalari/", "/hakkimizda/",
  "/vita-vegantis-vegan-sucuk/", "/vegan-iskender-tarifi/", "/veganlik-nedir/",
  "/en/", "/en/products/", "/en/about/", "/en/veganlik-nedir/", "/admin/",
  "/sitemap.xml", "/robots.txt", "/manifest.webmanifest"];
for (const p of pages) {
  const r = await follow(p);
  if (r.status !== 200) { console.log(`  HATA ${r.status} ${p}`); fail++; }
}
console.log(`  ${pages.length} adres kontrol edildi`);

console.log("\n=== 4) Eğik çizgisiz adres (Apache kendi ekliyor mu) ===");
for (const p of ["/urunler", "/en/products", "/vita-vegantis-vegan-sucuk"]) {
  const r = await follow(p);
  const ok = r.status === 200 && r.url === `${p}/`;
  console.log(`  ${ok ? "OK " : "HATA"} ${p} → ${r.status} ${r.url}`);
  if (!ok) fail++;
}

console.log("\n=== 5) 404 sayfası ===");
const nf = await fetch(BASE + "/boyle-bir-sayfa-yok/");
const body = await nf.text();
const has404 = nf.status === 404 && body.length > 200;
console.log(`  ${has404 ? "OK " : "HATA"} durum ${nf.status}, özel sayfa ${body.length} bayt`);
if (!has404) fail++;

console.log("\n=== 6) Önbellek ve sıkıştırma başlıkları ===");
const css = await fetch(BASE + "/sitemap.xml");
const img = await fetch(BASE + "/products/scenes/vegan-sucuk-scene-2.webp");
console.log("  WebP content-type :", img.headers.get("content-type"));
console.log("  WebP cache-control:", img.headers.get("cache-control"));
const html = await fetch(BASE + "/", { headers: { "Accept-Encoding": "gzip" } });
console.log("  HTML cache-control:", html.headers.get("cache-control"));
if (img.headers.get("content-type") !== "image/webp") { console.log("  HATA: WebP MIME yanlış"); fail++; }

console.log(fail === 0 ? "\nTÜM APACHE TESTLERİ GEÇTİ ✓" : `\n${fail} SORUN VAR`);
process.exit(fail === 0 ? 0 : 1);
