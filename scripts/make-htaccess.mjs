import fs from "node:fs";
import path from "node:path";
import { redirectPairs } from "../config/redirects.mjs";

/**
 * Statik çıktı için Apache kuralları üretir (out/.htaccess).
 *
 * Vercel'de bu işleri Next.js yapıyordu; IHS'de Apache yapacak.
 *
 * Tasarım notları (ikisi de gerçek hata kaynağıydı):
 *
 *  1) Apache'nin `Redirect` yönergesi ÖNEK eşleştirir: "Redirect /magaza"
 *     kuralı /magaza-baska-sey adresini de yakalayıp bozuk hedef üretir.
 *     Bu yüzden tam eşleşmeli RewriteRule kullanıyoruz.
 *
 *  2) .htaccess içinde mod_rewrite, mod_alias'tan (Redirect) ÖNCE çalışır.
 *     Yönlendirmeler eğik çizgi kuralından sonra kalsaydı /magaza önce
 *     /magaza/ olur, sonra önek eşleşmesiyle /urunler// gibi çift eğik
 *     çizgili adres çıkardı. Bu yüzden eski adres kuralları en başta.
 *
 * Klasör adreslerinin sonuna eğik çizgi eklemeyi Apache'nin kendi
 * DirectorySlash özelliği zaten yapıyor; ayrıca kural yazmıyoruz ki
 * yönlendirme döngüsü riski oluşmasın.
 */
const OUT = "out";

if (!fs.existsSync(OUT)) {
  console.error(`${OUT}/ klasörü yok. Önce "npm run build:static" çalıştırın.`);
  process.exit(1);
}

// Tam eşleşme: ^adres/?$ — sonda eğik çizgi olsa da olmasa da yakalar,
// ama /adres-baskasey adresine bulaşmaz.
const legacyRules = redirectPairs
  .map(({ from, to }) => {
    const pattern = from.replace(/^\//, "");
    return `  RewriteRule "^${pattern}/?$" ${to}/ [R=301,L]`;
  })
  .join("\n");

const htaccess = `# VitaVegantis — otomatik üretildi (scripts/make-htaccess.mjs).
# Elle düzenlemeyin; yönlendirmeler config/redirects.mjs dosyasından gelir.

Options -Indexes
DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On

  # --- Eski adreslerin kalıcı yönlendirmeleri ---------------------------
  # SEO devamlılığı için kritik. Diğer tüm kurallardan ÖNCE çalışmalı.
${legacyRules}
</IfModule>

# --- Hata sayfası -------------------------------------------------------
ErrorDocument 404 /404.html

# --- Sıkıştırma ---------------------------------------------------------
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml
  AddOutputFilterByType DEFLATE application/javascript application/json
  AddOutputFilterByType DEFLATE image/svg+xml
</IfModule>

# --- Önbellek -----------------------------------------------------------
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 6 months"
  ExpiresByType image/png "access plus 6 months"
  ExpiresByType image/jpeg "access plus 6 months"
  ExpiresByType image/svg+xml "access plus 6 months"
  ExpiresByType video/mp4 "access plus 6 months"
  ExpiresByType font/woff2 "access plus 1 year"
  # HTML tazelensin ki içerik güncellemesi ziyaretçiye hemen ulaşsın.
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

<IfModule mod_headers.c>
  <FilesMatch "\\.(css|js|webp|png|jpe?g|svg|mp4|woff2)$">
    Header set Cache-Control "public, max-age=15552000"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache, must-revalidate"
  </FilesMatch>
</IfModule>

# --- MIME türleri -------------------------------------------------------
<IfModule mod_mime.c>
  AddType image/webp .webp
  AddType application/manifest+json .webmanifest
  AddType font/woff2 .woff2
</IfModule>
`;

fs.writeFileSync(path.join(OUT, ".htaccess"), htaccess);
console.log(`out/.htaccess yazıldı — ${redirectPairs.length} yönlendirme kuralı.`);
