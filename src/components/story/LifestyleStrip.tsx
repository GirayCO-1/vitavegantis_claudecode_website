import Image from "next/image";

const scenes = [
  {
    src: "/lifestyle/hotdog-cart.webp",
    alt: "Sokak arabasından VitaVegantis hot dog alan bir müşteri",
    caption: "Sokakta",
    offset: "md:mt-16",
  },
  {
    src: "/lifestyle/kahvalti-sofrasi.webp",
    alt: "Kalabalık Türk kahvaltı sofrasında sahanda vegan sucuk",
    caption: "Evde",
    offset: "md:mt-0",
  },
  {
    src: "/lifestyle/fine-dining.webp",
    alt: "Fine dining restoranda servis edilen bitki bazlı İsveç köfte",
    caption: "Restoranda",
    offset: "md:mt-24",
  },
];

export default function LifestyleStrip() {
  return (
    <section className="bg-cream px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-accent text-2xl text-plum">Sofralarda</p>
          <h2 className="font-display mt-2 text-3xl font-semibold text-forest sm:text-4xl">
            Nerede olursanız olun, doğal kalın
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {scenes.map((scene) => (
            <figure key={scene.src} className={`group ${scene.offset}`}>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] shadow-lg shadow-forest/10">
                <Image
                  src={scene.src}
                  alt={scene.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 90vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <figcaption className="font-accent mt-4 text-center text-2xl text-plum">
                {scene.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
