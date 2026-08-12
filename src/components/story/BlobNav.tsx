import Link from "next/link";
import Image from "next/image";

// Organik "blob" köşe yarıçapları — referanstaki damla formunu marka
// paletiyle yeniden yorumluyor.
const BLOB_A = "58% 42% 46% 54% / 48% 44% 56% 52%";
const BLOB_B = "46% 54% 58% 42% / 54% 48% 52% 46%";
const BLOB_C = "52% 48% 42% 58% / 44% 56% 44% 56%";

export default function BlobNav() {
  return (
    <section className="bg-mint px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-3">
        {/* 1) Vizyon & Misyon */}
        <Link
          href="/vizyon-misyon"
          className="group relative flex min-h-[320px] flex-col justify-center gap-4 bg-forest p-10 text-cream transition-transform duration-500 ease-out hover:scale-[1.02]"
          style={{ borderRadius: BLOB_A }}
        >
          <span className="w-fit rounded-full bg-cream px-4 py-1.5 text-xs font-semibold tracking-wide text-forest uppercase">
            Vizyonumuz &amp; Misyonumuz
          </span>
          <h3 className="font-display text-3xl leading-tight font-semibold sm:text-4xl">
            Daha iyi ve daha sağlıklı bir dünyaya katkı
          </h3>
          <span className="text-sm font-medium text-sun group-hover:underline">
            Keşfet →
          </span>
        </Link>

        {/* 2) Tarifler */}
        <Link
          href="/tarifler"
          className="group relative flex min-h-[320px] items-center justify-center overflow-hidden transition-transform duration-500 ease-out hover:scale-[1.02]"
          style={{ borderRadius: BLOB_B }}
        >
          <Image
            src="/recipes/vegan-iskender.jpg"
            alt="VitaVegantis tarifleri"
            fill
            sizes="(min-width: 768px) 33vw, 90vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-forest/55" />
          <div className="relative flex flex-col items-center gap-4 px-8 text-center">
            <h3 className="font-display text-2xl leading-tight font-semibold text-cream sm:text-3xl">
              Bugün ne pişirsem?
            </h3>
            <span className="rounded-full bg-cream px-5 py-2 text-sm font-semibold text-forest">
              Tarifini bul
            </span>
          </div>
        </Link>

        {/* 3) Neden bitki bazlı */}
        <Link
          href="/neden-bitki-bazli"
          className="group relative flex min-h-[320px] flex-col items-center justify-center gap-4 bg-sage/45 p-10 text-center transition-transform duration-500 ease-out hover:scale-[1.02]"
          style={{ borderRadius: BLOB_C }}
        >
          <h3 className="font-display text-2xl leading-tight font-semibold text-forest sm:text-3xl">
            Neden bitki bazlı?
          </h3>
          <p className="max-w-xs text-sm leading-relaxed text-forest/75">
            Bedeniniz ve gezegen için ne anlama geldiğini anlatıyoruz.
          </p>
          <span className="rounded-full bg-forest px-5 py-2 text-sm font-semibold text-cream">
            Nedenini öğren
          </span>
        </Link>
      </div>
    </section>
  );
}
