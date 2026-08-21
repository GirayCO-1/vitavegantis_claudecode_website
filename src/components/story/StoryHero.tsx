"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import type { Locale } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger, SplitText);

// NOT: Anlatı metinleri buradan güncellenir; sahne yapısı ve animasyonlar aynı kalır.
const TEXT = {
  tr: {
    tagline: "Enjoy Nature",
    hint: "Kaydırın",
    canvasAlt: "Suya düşen taze sebzeler",
    scrubKicker: "Saf ve katkısız",
    scrubHeading: "Özü doğadan, formülü bizden",
    scenes: [
      {
        kicker: "Kimiz",
        heading: "Doğaya Bir Söz",
        body: "VitaVegantis'te bitkisel ürünleri sadece bir alternatif değil, bedenimizi beslemenin ve gezegeni korumanın bir yolu olarak görüyoruz. Her ürünümüz, sofralarınıza yalnızca lezzet değil; daha temiz bir gelecek, daha sağlıklı bir yaşam biçimi getirme sözüyle çıkıyor.",
      },
    ],
  },
  en: {
    tagline: "Enjoy Nature",
    hint: "Scroll",
    canvasAlt: "Fresh vegetables falling into water",
    scrubKicker: "Pure and additive-free",
    scrubHeading: "Rooted in nature, crafted by us",
    scenes: [
      {
        kicker: "Who We Are",
        heading: "A Promise to Nature",
        body: "At VitaVegantis, we see plant-based foods not merely as an alternative, but as a way to nourish our bodies and protect the planet. Every product we make comes to your table with a promise: not just flavour, but a cleaner future and a healthier way of living.",
      },
    ],
  },
} as const;

// Scroll ile ilerleyen sahne, videodan çıkarılmış kare dizisi olarak oynatılır.
// MP4'te her seek yeniden çözümleme gerektirdiği için hızlı kaydırmada takılıyordu;
// önceden yüklenmiş kareleri canvas'a çizmek akıcı sonuç veriyor.
const FRAME_COUNT = 121;
const framePath = (i: number) =>
  `/frames/f${String(i + 1).padStart(3, "0")}.webp`;

export default function StoryHero({ locale = "tr" }: { locale?: Locale }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const t = TEXT[locale];
  const scenes = t.scenes;

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const splitInstances: SplitText[] = [];
    const cleanupFns: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // --- Giriş sahnesi: video üzerinde logo girişi ---
      // Harf harf SplitText yerine logonun kendisi süzülerek gelir; böylece
      // overflow-hidden'a gerek kalmaz ve alt uzantılı harfler ("g") kırpılmaz.
      gsap.set(".story-intro-logo", { opacity: 0, y: 36, scale: 0.94 });
      gsap
        .timeline({ delay: 0.3 })
        .to(".story-intro-logo", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
        })
        .from(".story-intro-tagline", { opacity: 0, y: 12, duration: 0.6 }, "-=0.4")
        .from(".story-intro-hint", { opacity: 0, duration: 0.6 }, "-=0.2");

      // Giriş videosu scroll ile yukarı süzülüp kararsın
      gsap.to(".story-intro-inner", {
        yPercent: -12,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".story-intro",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // --- Scroll ile ilerleyen kare dizisi ---
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext("2d");
        const images: HTMLImageElement[] = [];
        const state = { frame: 0 };

        const draw = () => {
          const img = images[Math.round(state.frame)];
          if (!context || !img || !img.complete || !img.naturalWidth) return;

          const cw = canvas.width;
          const ch = canvas.height;
          const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
          const w = img.naturalWidth * scale;
          const h = img.naturalHeight * scale;
          context.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
        };

        const resize = () => {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = Math.floor(window.innerWidth * dpr);
          canvas.height = Math.floor(window.innerHeight * dpr);
          draw();
        };

        resize();
        window.addEventListener("resize", resize);

        for (let i = 0; i < FRAME_COUNT; i++) {
          // next/image'ın Image adını gölgelememesi için window.Image
          const img = new window.Image();
          img.src = framePath(i);
          if (i === 0) img.onload = draw;
          images.push(img);
        }

        gsap.to(state, {
          frame: FRAME_COUNT - 1,
          ease: "none",
          onUpdate: draw,
          scrollTrigger: {
            trigger: ".story-scrub",
            start: "top top",
            end: "+=220%",
            scrub: 0.3,
            pin: true,
            pinSpacing: true,
          },
        });

        gsap.fromTo(
          ".story-scrub-caption",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".story-scrub",
              start: "top top",
              end: "+=60%",
              scrub: true,
            },
          },
        );

        cleanupFns.push(() => window.removeEventListener("resize", resize));
      }

      // --- Anlatı sahneleri ---
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
        tl.to({}, { duration: 0.5 });
      });
    }, rootRef);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      splitInstances.forEach((s) => s.revert());
      cleanupFns.forEach((fn) => fn());
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative bg-cream">
      {/* 1) Giriş: otomatik oynayan tarla videosu */}
      <section className="story-intro relative h-screen overflow-hidden bg-forest">
        <div className="story-intro-inner absolute inset-0">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/video/intro.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-forest/40 to-forest/80" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <h1 className="story-intro-logo">
              <Image
                src="/brand/logo-cream.webp"
                alt="VitaVegantis"
                width={2000}
                height={333}
                priority
                className="h-auto w-[82vw] max-w-xl md:max-w-2xl"
              />
            </h1>
            <p className="story-intro-tagline font-accent mt-6 text-3xl text-sun sm:text-4xl">
              {t.tagline}
            </p>
          </div>

          <div className="story-intro-hint pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 text-cream/60">
            <span className="text-xs tracking-widest uppercase">{t.hint}</span>
            <span className="h-8 w-px animate-pulse bg-cream/40" />
          </div>
        </div>
      </section>

      {/* 2) Scroll ile ilerleyen video */}
      <section className="story-scrub relative h-screen overflow-hidden bg-[#0e2116]">
        <canvas
          ref={canvasRef}
          aria-label={t.canvasAlt}
          role="img"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e2116]/50 via-transparent to-[#0e2116]/70" />

        <div className="story-scrub-caption absolute inset-x-0 bottom-24 px-6 text-center">
          <p className="font-accent text-2xl text-sun sm:text-3xl">
            {t.scrubKicker}
          </p>
          <h2 className="font-display mx-auto mt-2 max-w-2xl text-3xl font-medium text-cream sm:text-5xl">
            {t.scrubHeading}
          </h2>
        </div>
      </section>

      {/* 3) Anlatı sahneleri */}
      {scenes.map((scene) => (
        <section
          key={scene.heading}
          className="story-scene relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[#0e2116] px-6 text-center"
        >
          {/* Mangalda cızırdayan sosis. Sessiz ve döngüsel — dekoratif arka
              plan. Hareketi azaltılmış tercihlerde poster karesi kalır. */}
          <video
            className="story-scene-video absolute inset-0 h-full w-full object-cover"
            src="/video/grill.mp4"
            poster="/video/grill-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          {/* Video canlı kalsın diye perde olabildiğince ince; okunabilirlik
              ağırlıklı olarak metin gölgesinden geliyor. */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 58% 34% at 50% 47%, rgba(11,28,18,0.58) 0%, rgba(11,28,18,0.26) 60%, rgba(11,28,18,0) 100%)",
            }}
          />

          <div
            className="relative flex flex-col items-center"
            style={{ textShadow: "0 2px 18px rgba(0,0,0,0.65), 0 1px 4px rgba(0,0,0,0.5)" }}
          >
            <p className="story-scene-fade font-accent text-2xl text-sun">
              {scene.kicker}
            </p>
            <h2 className="story-scene-heading font-display mt-3 max-w-3xl text-4xl font-semibold text-cream sm:text-5xl md:text-6xl">
              {scene.heading}
            </h2>
            <p className="story-scene-fade mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
              {scene.body}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
