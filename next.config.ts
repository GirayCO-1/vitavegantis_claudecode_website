import type { NextConfig } from "next";
import { redirectPairs } from "./config/redirects.mjs";

/**
 * İki yayın hedefi var:
 *
 *  - Vercel (varsayılan): Next.js sunucusu çalışır. Yönlendirmeler, görsel
 *    optimizasyonu ve /admin yeniden yazması Next tarafından yapılır.
 *
 *  - IHS (BUILD_TARGET=static): tamamen statik dosya üretilir, FTP ile
 *    yüklenir. Sunucu tarafı kod çalışmadığı için yönlendirmeler .htaccess
 *    dosyasına taşınır (bkz. scripts/make-htaccess.mjs) ve görseller
 *    olduğu gibi sunulur — bu yüzden kaynaklar WebP'ye çevrildi.
 */
const isStatic = process.env.BUILD_TARGET === "static";

const nextConfig: NextConfig = {
  // Eski site WordPress varsayılanı olan sonda eğik çizgiyi kullanıyordu.
  // Adreslerin birebir aynı kalması için aynı biçimi sürdürüyoruz.
  trailingSlash: true,

  ...(isStatic
    ? {
        output: "export" as const,
        // Statik çıktıda next/image sunucusu yok; görseller kaynaktan sunulur.
        images: { unoptimized: true },
      }
    : {
        // İçerik paneli public/admin altında düz bir HTML dosyası; Next.js
        // klasör adresini kendiliğinden index.html'e bağlamadığı için elle
        // eşliyoruz. Statik çıktıda bunu Apache'nin DirectoryIndex'i yapar.
        async rewrites() {
          return [{ source: "/admin", destination: "/admin/index.html" }];
        },
        async redirects() {
          return redirectPairs.map(({ from, to }) => ({
            source: from,
            destination: to,
            permanent: true,
          }));
        },
      }),
};

export default nextConfig;
