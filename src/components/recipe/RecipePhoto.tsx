import Image from "next/image";

/**
 * Tarif fotoğrafı.
 *
 * Kap kendi en-boy oranını taşır ve fotoğraf object-cover ile onu doldurur;
 * bu yüzden ÇAĞIRAN TARAF max-height ile kırpmamalı. Detay sayfasında öyle
 * yapılıyordu ve 16:9 fotoğrafların altı kesiliyordu.
 *
 * ratio: kart listesinde 4:3 (varsayılan), detay sayfasında 16:9.
 * sizes: fotoğrafın ekranda kaplayacağı genişlik; yanlış verilirse next/image
 * gereğinden küçük dosya seçip bulanık gösteriyor.
 */
export default function RecipePhoto({
  src,
  alt,
  priority = false,
  ratio = "4/3",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  ratio?: "4/3" | "16/9";
  sizes?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-forest ${
        ratio === "16/9" ? "aspect-[16/9]" : "aspect-[4/3]"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
