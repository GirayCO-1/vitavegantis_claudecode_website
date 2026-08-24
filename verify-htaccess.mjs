import fs from "node:fs";
import { redirectPairs } from "./config/redirects.mjs";

/**
 * .htaccess doğrulaması (Apache olmadan yapılabilen kısım):
 *
 *  1) Her kural kalıbı, hedeflediği adresi (eğik çizgili ve çizgisiz)
 *     yakalıyor mu?
 *  2) Kalıp, benzeyen ama farklı bir adrese BULAŞIYOR mu? (Apache'nin
 *     Redirect yönergesindeki önek eşleştirme hatası buydu.)
 *  3) Her yönlendirme hedefi statik çıktıda gerçekten var mı?
 */
const htaccess = fs.readFileSync("out/.htaccess", "utf8");

let fail = 0;

console.log("=== 1) Kural kalıpları doğru eşleşiyor mu ===");
for (const { from, to } of redirectPairs) {
  const pattern = from.replace(/^\//, "");
  // .htaccess'teki kuralın aynısı
  const re = new RegExp(`^${pattern}/?$`);

  const shouldMatch = [pattern, `${pattern}/`];
  const shouldNotMatch = [
    `${pattern}-baska-sey`,
    `${pattern}x`,
    `${pattern}/alt-sayfa`,
  ];

  for (const s of shouldMatch) {
    if (!re.test(s)) {
      console.log(`  HATA: "${s}" eşleşmeli ama eşleşmiyor (${from})`);
      fail++;
    }
  }
  for (const s of shouldNotMatch) {
    if (re.test(s)) {
      console.log(`  HATA: "${s}" eşleşMEmeli ama eşleşiyor (${from})`);
      fail++;
    }
  }

  // Kural gerçekten dosyada var mı?
  if (!htaccess.includes(`"^${pattern}/?$"`)) {
    console.log(`  HATA: kural .htaccess'te yok: ${from}`);
    fail++;
  }
}
if (fail === 0) console.log(`  ${redirectPairs.length} kuralın hepsi doğru ✓`);

console.log("\n=== 2) Yönlendirme hedefleri statik çıktıda var mı ===");
for (const { from, to } of redirectPairs) {
  const target = `out${to}/index.html`;
  if (!fs.existsSync(target)) {
    console.log(`  HATA: hedef yok → ${to}/ (${from} buraya gidiyor)`);
    fail++;
  }
}
if (fail === 0) console.log("  Tüm hedefler mevcut ✓");

console.log("\n=== 3) Zorunlu dosyalar ===");
for (const f of ["out/404.html", "out/.htaccess", "out/sitemap.xml", "out/robots.txt", "out/index.html", "out/en/index.html", "out/admin/index.html"]) {
  const ok = fs.existsSync(f);
  console.log(`  ${ok ? "VAR" : "YOK"}  ${f}`);
  if (!ok) fail++;
}

console.log(fail === 0 ? "\nTÜM KONTROLLER GEÇTİ ✓" : `\n${fail} SORUN VAR`);
process.exit(fail === 0 ? 0 : 1);
