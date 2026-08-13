"use client";

import { useState } from "react";
import Image from "next/image";

export type IngredientHotspot = {
  name: string;
  /** Görsel genişliğine oranla yatay merkez (%) */
  x: number;
  /** Görsel yüksekliğine oranla dikey merkez (%) */
  y: number;
};

export default function IngredientsMap({
  image,
  ingredients,
  alt = "Ürünün içindekileri",
}: {
  image: string;
  ingredients: IngredientHotspot[];
  alt?: string;
}) {
  const [active, setActive] = useState<IngredientHotspot | null>(null);

  return (
    <figure className="w-full">
      {/* Dış katman kırpmaz; etiket görselin dışına taşabilsin diye */}
      <div className="relative aspect-square w-full">
        <div className="absolute inset-0 overflow-hidden rounded-[24px] shadow-xl shadow-forest/15">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 768px) 45vw, 90vw"
            className="object-cover select-none"
          />

          {/* Seçili malzemeyi aydınlatan, gerisini karartan perde */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: active ? 1 : 0,
              background: active
                ? // `circle <yüzde>` geçersiz CSS; kare kapsayıcıda ellipse aynı sonucu verir
                  `radial-gradient(ellipse 22% 22% at ${active.x}% ${active.y}%, rgba(0,0,0,0) 0%, rgba(11,74,40,.55) 60%)`
                : undefined,
            }}
          />

          {ingredients.map((ing) => {
            const isActive = active?.name === ing.name;

            return (
              <button
                key={ing.name}
                type="button"
                aria-label={ing.name}
                className="absolute h-[16%] w-[16%] -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none"
                style={{ left: `${ing.x}%`, top: `${ing.y}%` }}
                onMouseEnter={() => setActive(ing)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(ing)}
                onBlur={() => setActive(null)}
              >
                <span
                  aria-hidden
                  className={`absolute inset-0 rounded-full ring-2 ring-cream/70 transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Etiket — kırpılmayan katmanda */}
        {active && (
          <div
            aria-hidden
            className="pointer-events-none absolute z-10 -translate-x-1/2 text-center whitespace-nowrap"
            style={{
              left: `${active.x}%`,
              top: `${active.y}%`,
              transform: `translate(-50%, ${active.y < 26 ? "40%" : "-130%"})`,
            }}
          >
            <div className="vv-fade-up">
              <p className="mb-1 text-[10px] tracking-[0.28em] text-cream/80 uppercase">
                %100 Bitkisel
              </p>
              <span className="font-display inline-block rounded-full bg-forest px-4 py-2 text-sm text-cream shadow-lg sm:text-base">
                {active.name}
              </span>
              <span className="mx-auto mt-1.5 block h-4 w-px bg-cream/70" />
            </div>
          </div>
        )}
      </div>

      <figcaption className="mt-4 text-center text-xs tracking-wide text-forest/50 uppercase">
        Malzemelerin üzerine gelin
      </figcaption>
    </figure>
  );
}
