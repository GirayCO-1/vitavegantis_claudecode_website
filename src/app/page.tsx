import ScrollHero from "@/components/hero/ScrollHero";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const storyBlocks = [
  {
    title: "Doğaya ve Bedene Bir Söz",
    body: "VitaVegantis'te bitkisel proteini sadece bir alternatif değil, bedenimizi beslemenin ve gezegeni korumanın bir yolu olarak görüyoruz. Her ürünümüz, sofralarınıza yalnızca lezzet değil; daha temiz bir gelecek, daha sağlıklı bir yaşam biçimi getirme sözüyle çıkıyor. Doğanın sunduklarına inanıyor, onu olduğu gibi, katkısız ve saf haliyle sizlere ulaştırıyoruz.",
    accent: "text-sun",
  },
  {
    title: "Yüksek Besin Değeri, İnanılmaz Lezzet",
    body: "Bitki bazlı beslenmeye geçişin önündeki en büyük engelin lezzetten ödün vermek olduğunu biliyoruz — biz de tam tersini yapıyoruz. Ürünlerimizi, yüksek besin değerleri ve inanılmaz lezzetiyle sofralarınızın vazgeçilmezi olacak şekilde geliştiriyoruz. Katkı maddesi yok, sır yok — sadece doğanın kendisi.",
    accent: "text-coral",
  },
  {
    title: "Enjoy Nature",
    body: "Doğanın en lezzetli halini sizlere getiriyoruz. VitaVegantis ile her lokma, doğaya duyulan bir saygı, bedeninize verilen bir hediye. Açık fikirli olun, doğayı keşfedin, tadını çıkarın — Enjoy Nature.",
    accent: "text-plum",
  },
];

export default function Home() {
  return (
    <>
      <ScrollHero />

      <section className="bg-cream px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-3">
          {storyBlocks.map((block) => (
            <div key={block.title} className="text-center md:text-left">
              <h2 className={`font-display text-2xl font-semibold ${block.accent}`}>
                {block.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-forest/75">
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sage/10 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-accent text-2xl text-plum">Vitrinimiz</p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-forest sm:text-4xl">
              Bitki bazlı sofranın yeni klasikleri
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl bg-forest px-8 py-16 text-center text-cream">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            En yakın satış noktanızı bulun
          </h2>
          <p className="max-w-xl text-cream/80">
            VitaVegantis ürünlerini şehrinizdeki market ve şarküterilerde
            keşfedin.
          </p>
          <a
            href="https://vitavegantis.com/satisnoktalari/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 rounded-full bg-sun px-8 py-3 text-sm font-semibold text-forest transition-transform hover:scale-105"
          >
            Satış Noktalarını Gör
          </a>
        </div>
      </section>
    </>
  );
}
