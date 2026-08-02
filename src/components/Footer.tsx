import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-forest/10 bg-forest text-cream">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-3xl">VitaVegantis</p>
            <p className="font-accent mt-2 text-2xl text-sun">Enjoy Nature</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/75">
              Bitkisel proteini bedeninizi beslemenin ve gezegeni korumanın
              bir yolu olarak görüyoruz. Katkı maddesi yok, sır yok — sadece
              doğanın kendisi.
            </p>
            <a
              href="https://instagram.com/vitavegantis"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-medium underline decoration-sun decoration-2 underline-offset-4 hover:text-sun"
            >
              @vitavegantis
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold text-sun">Keşfet</p>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              <li><Link href="/urunler" className="hover:text-sun">Ürünler</Link></li>
              <li><Link href="/tarifler" className="hover:text-sun">Tarifler</Link></li>
              <li><Link href="/blog" className="hover:text-sun">Blog</Link></li>
              <li><Link href="/iletisim" className="hover:text-sun">İletişim</Link></li>
              <li>
                <a
                  href="https://vitavegantis.com/satisnoktalari/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sun"
                >
                  Satış Noktaları
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-sun">İletişim</p>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              <li>
                Seyran Bağları Mahallesi Seyran Caddesi No:42/A,
                Çankırı / Ankara
              </li>
              <li>
                <a href="tel:08503074990" className="hover:text-sun">
                  0850 307 49 90
                </a>
              </li>
              <li>
                <a href="mailto:info@vitavegantis.com" className="hover:text-sun">
                  info@vitavegantis.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Vita Vegantis Gıda Sanayi ve Ticaret Limited Şirketi</p>
          <p>Doğadan sofranıza — tek bir katkı maddesi olmadan.</p>
        </div>
      </div>
    </footer>
  );
}
