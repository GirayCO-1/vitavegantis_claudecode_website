"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import HoverLabelImage from "./HoverLabelImage";

gsap.registerPlugin(ScrollTrigger, SplitText);

// NOT: Aşağıdaki metinler yer tutucudur (sitenin marka hikayesi metinlerinden
// alınmıştır). Gerçek "kimiz / vizyonumuz / misyonumuz" anlatısı iletildiğinde
// bu diziyi güncelleyin — sahne yapısı ve animasyonlar aynı kalır.
const scenes = [
  {
    kicker: "Kimiz",
    heading: "Doğaya ve Bedene Bir Söz",
    body: "VitaVegantis'te bitkisel proteini sadece bir alternatif değil, bedenimizi beslemenin ve gezegeni korumanın bir yolu olarak görüyoruz. Her ürünümüz, sofralarınıza yalnızca lezzet değil; daha temiz bir gelecek, daha sağlıklı bir yaşam biçimi getirme sözüyle çıkıyor.",
  },
  {
    kicker: "Vizyonumuz",
    heading: "Yüksek Besin Değeri, İnanılmaz Lezzet",
    body: "Bitki bazlı beslenmeye geçişin önündeki en büyük engelin lezzetten ödün vermek olduğunu biliyoruz — biz de tam tersini yapıyoruz. Katkı maddesi yok, sır yok — sadece doğanın kendisi.",
  },
] as const;

const showcaseImages = [
  { src: "/products/vegan-sosis.jpg", label: "Vegan Sosis Tadında" },
  { src: "/ingredients/tofu.png", label: "Tofu" },
  { src: "/hero-basket/aycicek-saksi.png", label: "Ayçiçeği" },
  { src: "/products/vegan-sucuk.webp", label: "Vegan Sucuk" },
];

export default function StoryHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
    });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const splitInstances: SplitText[] = [];

    const ctx = gsap.context(() => {
      // Giriş sahnesi: karakter bazlı wordmark reveal
      const introSplit = new SplitText(".story-intro-title", { type: "chars" });
      splitInstances.push(introSplit);
      gsap.set(introSplit.chars, { yPercent: 120, opacity: 0 });
      gsap
        .timeline({ delay: 0.2 })
        .to(introSplit.chars, {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.035,
        })
        .from(".story-intro-tagline", { opacity: 0, y: 12, duration: 0.6 }, "-=0.3")
        .from(".story-intro-hint", { opacity: 0, duration: 0.6 }, "-=0.2");

      // Her metin sahnesi için pin + scroll-scrub reveal
      gsap.utils.toArray<HTMLElement>(".story-scene").forEach((scene) => {
        const heading = scene.querySelector(".story-scene-heading");
        const split = heading ? new SplitText(heading, { type: "words" }) : null;
        if (split) splitInstances.push(split);

        if (split) gsap.set(split.words, { opacity: 0, yPercent: 60 });
        gsap.set(scene.querySelectorAll(".story-scene-fade"), { opacity: 0, y: 24 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scene,
            start: "top top",
            end: "+=100%",
            scrub: 0.6,
            pin: true,
            pinSpacing: true,
          },
        });

        if (split) {
          tl.to(split.words, {
            opacity: 1,
            yPercent: 0,
            stagger: 0.04,
            duration: 0.6,
            ease: "power2.out",
          });
        }
        tl.to(
          scene.querySelectorAll(".story-scene-fade"),
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 },
          "-=0.3",
        );
        tl.to({}, { duration: 0.4 });
        if (split) {
          tl.to(split.words, { opacity: 0, yPercent: -40, duration: 0.4, stagger: 0.02 });
        }
        tl.to(
          scene.querySelectorAll(".story-scene-fade"),
          { opacity: 0, y: -16, duration: 0.4 },
          "<",
        );
      });

      // Kapanış sahnesi: görseller + CTA
      gsap.from(".story-closing-fade", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".story-closing",
          start: "top 70%",
        },
      });
    }, rootRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      splitInstances.forEach((split) => split.revert());
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative bg-cream">
      {/* Giriş sahnesi */}
      <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-forest to-[#0e2116] px-6 text-center">
        <h1 className="story-intro-title font-display overflow-hidden text-6xl font-semibold text-cream sm:text-8xl">
          VitaVegantis
        </h1>
        <p className="story-intro-tagline font-accent mt-6 text-3xl text-sun sm:text-4xl">
          Enjoy Nature
        </p>
        <div className="story-intro-hint pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 text-cream/50">
          <span className="text-xs tracking-widest uppercase">Kaydırın</span>
          <span className="h-8 w-px animate-pulse bg-cream/40" />
        </div>
      </section>

      {/* Anlatı sahneleri */}
      {scenes.map((scene) => (
        <section
          key={scene.heading}
          className="story-scene relative flex h-screen flex-col items-center justify-center overflow-hidden bg-cream px-6 text-center"
        >
          <p className="story-scene-fade font-accent text-2xl text-plum">
            {scene.kicker}
          </p>
          <h2 className="story-scene-heading font-display mt-3 max-w-3xl text-4xl font-semibold text-forest sm:text-5xl md:text-6xl">
            {scene.heading}
          </h2>
          <p className="story-scene-fade mt-6 max-w-xl text-base leading-relaxed text-forest/75 sm:text-lg">
            {scene.body}
          </p>
        </section>
      ))}

      {/* Kapanış: görsel dokunuşlar + CTA */}
      <section className="story-closing relative flex min-h-screen flex-col items-center justify-center gap-12 bg-gradient-to-b from-cream to-sage/15 px-6 py-24 text-center">
        <div className="story-closing-fade">
          <p className="font-accent text-2xl text-plum">Enjoy Nature</p>
          <h2 className="font-display mt-2 max-w-2xl text-3xl font-semibold text-forest sm:text-4xl">
            Doğanın en lezzetli halini sizlere getiriyoruz.
          </h2>
        </div>

        <div className="story-closing-fade grid w-full max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {showcaseImages.map((img) => (
            <HoverLabelImage
              key={img.src}
              src={img.src}
              label={img.label}
              className="aspect-square"
              sizes="200px"
            />
          ))}
        </div>

        <a
          href="#urunler-vitrini"
          className="story-closing-fade rounded-full bg-forest px-8 py-3 text-sm font-semibold text-cream transition-transform hover:scale-105 hover:bg-coral"
        >
          Ürünlerimizi Keşfet ↓
        </a>
      </section>
    </div>
  );
}
