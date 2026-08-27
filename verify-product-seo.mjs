// Ürün SEO bloklarını üretilen HTML üzerinde doğrular.
// Kullanım: node verify-product-seo.mjs
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
const SEO_DIR = path.join(process.cwd(), "src", "content", "product-seo");

// products.ts'ten slug -> urlSlug eşlemesini kaynaktan okuyoruz.
const src = fs.readFileSync(path.join(process.cwd(), "src", "lib", "products.ts"), "utf8");
const pairs = [...src.matchAll(/slug:\s*"([^"]+)",\s*\n\s*\/\/[^\n]*\n?\s*urlSlug:\s*"([^"]+)"/g)];
const simple = [...src.matchAll(/\bslug:\s*"([^"]+)",\s*\n\s*(?:\/\/[^\n]*\n\s*)?urlSlug:\s*"([^"]+)"/g)];
const map = new Map(simple.map((m) => [m[1], m[2]]));
if (map.size === 0) throw new Error("slug eşlemesi çıkarılamadı");

const decode = (s) =>
  s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\\u0022/g, '"');

let fail = 0;
const rows = [];

for (const [slug, urlSlug] of map) {
  const file = path.join(SEO_DIR, `${slug}.json`);
  const hasContent = fs.existsSync(file);
  const raw = hasContent ? JSON.parse(fs.readFileSync(file, "utf8")) : null;

  for (const locale of ["tr", "en"]) {
    const pagePath =
      locale === "tr"
        ? path.join(OUT, urlSlug, "index.html")
        : path.join(OUT, "en", urlSlug, "index.html");

    if (!fs.existsSync(pagePath)) {
      rows.push([slug, locale, "SAYFA YOK", "", "", ""]);
      fail++;
      continue;
    }

    const html = decode(fs.readFileSync(pagePath, "utf8"));

    // 1) FAQPage şeması ve Question sayısı
    const hasFaqPage = /"@type":"FAQPage"/.test(html);
    const qCount = (html.match(/"@type":"Question"/g) || []).length;

    // 2) Tek h1
    const h1Count = (html.match(/<h1\b/g) || []).length;

    // 3) Blok başlıkları ve KAPALI son SSS cevabı HTML'de mi
    let headingsOk = true;
    let closedAnswerOk = true;
    if (hasContent) {
      const en = locale === "en";
      for (const s of raw.sections) {
        const h = en ? s.headingEn : s.heading;
        if (!html.includes(h)) {
          headingsOk = false;
          console.log(`   eksik başlık [${slug}/${locale}]: ${h}`);
        }
      }
      // ilk soru açık geliyor; sondaki kesinlikle kapalı — yine de HTML'de olmalı
      const last = raw.faq[raw.faq.length - 1];
      const lastA = (en ? last.aEn : last.a).slice(0, 60);
      if (!html.includes(lastA)) {
        closedAnswerOk = false;
        console.log(`   kapalı cevap HTML'de yok [${slug}/${locale}]`);
      }
    }

    const expectedQ = hasContent ? raw.faq.length : 0;
    const ok =
      h1Count === 1 &&
      headingsOk &&
      closedAnswerOk &&
      (hasContent ? hasFaqPage && qCount === expectedQ : !hasFaqPage);
    if (!ok) fail++;

    rows.push([
      slug,
      locale,
      ok ? "OK" : "HATA",
      `h1:${h1Count}`,
      hasContent ? `FAQPage:${hasFaqPage ? "var" : "YOK"}` : "icerik yok",
      hasContent ? `soru:${qCount}/${expectedQ}` : "",
    ]);
  }
}

console.log("");
for (const r of rows) console.log(r.map((c, i) => String(c).padEnd([26, 4, 6, 6, 14, 12][i])).join(" "));
console.log("");
console.log(fail === 0 ? `TAMAM — ${rows.length} sayfanın hepsi geçti.` : `${fail} sayfada sorun var.`);
process.exit(fail === 0 ? 0 : 1);
