"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  rollingVeggies,
  decorativeItems,
  heroBasketTravelSpan,
  type RollingVeg,
} from "./basketHeroData";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function RollingVegItem({
  veg,
  progress,
}: {
  veg: RollingVeg;
  progress: MotionValue<number>;
}) {
  const start = veg.delay;
  const end = start + Math.max(veg.reach, 0.05) * heroBasketTravelSpan;

  const left = useTransform(progress, (v) => {
    const t = easeOutCubic(clamp((v - start) / (end - start)));
    return `${veg.startX + (veg.restX - veg.startX) * t}%`;
  });
  const top = useTransform(progress, (v) => {
    const t = easeOutCubic(clamp((v - start) / (end - start)));
    return `${veg.startY + (veg.restY - veg.startY) * t}%`;
  });
  const rotate = useTransform(progress, (v) => {
    const t = clamp((v - start) / (end - start));
    return veg.spin * t;
  });
  const opacity = useTransform(progress, [start, start + 0.03], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.14], [0.45, 1]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left,
        top,
        translateX: "-50%",
        translateY: "-50%",
        width: veg.size,
        height: veg.size,
        rotate,
        opacity,
        scale,
      }}
    >
      <Image
        src={veg.photo}
        alt={veg.label}
        fill
        sizes="100px"
        className="object-contain drop-shadow-lg"
      />
    </motion.div>
  );
}

function HandBasketCard({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.02, 0.1], [0, 1]);
  const x = useTransform(progress, [0.02, 0.16], [-28, 0]);
  const y = useTransform(progress, [0.02, 0.16], [-20, 0]);
  const rotate = useTransform(progress, [0.02, 0.22], [-11, -5]);

  return (
    <motion.div
      style={{ opacity, x, y, rotate }}
      className="absolute top-2 -left-6 w-[46%] max-w-[220px] overflow-hidden rounded-[28px] shadow-2xl sm:top-4 sm:w-[32%] sm:max-w-[280px]"
    >
      <div className="relative aspect-[4/5] w-full bg-cream">
        <Image
          src="/hero-basket/hand-basket.png"
          alt="Taze sebzeler sepetten dökülüyor"
          fill
          sizes="280px"
          className="object-cover"
          priority
        />
      </div>
    </motion.div>
  );
}

function ProductBasketCard({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.22, 0.42], [0, 1]);
  const scale = useTransform(progress, [0.22, 0.46], [0.82, 1]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute top-[20%] -right-4 w-[52%] max-w-[240px] sm:right-4 sm:w-[36%] sm:max-w-[380px]"
    >
      <div className="basket-float overflow-hidden rounded-[28px] shadow-2xl">
        <div className="relative aspect-square w-full bg-cream">
          <Image
            src="/hero-basket/product-basket.png"
            alt="VitaVegantis ürünleriyle dolu sepet"
            fill
            sizes="380px"
            className="object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

function DecorativeRing({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.32, 0.52], [0, 1]);
  const y = useTransform(progress, [0.32, 0.52], [18, 0]);

  return (
    <motion.div style={{ opacity, y }} className="pointer-events-none absolute inset-0 hidden md:block">
      {decorativeItems.map((item) => (
        <div
          key={item.photo}
          className="absolute"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: item.size,
            height: item.size,
            transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
          }}
        >
          <Image
            src={item.photo}
            alt={item.label}
            fill
            sizes="120px"
            className="object-contain drop-shadow-md"
          />
        </div>
      ))}
    </motion.div>
  );
}

function HeroHeadline({ progress }: { progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [0, -50]);
  const opacity = useTransform(progress, [0, 0.55, 0.8], [1, 1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="pointer-events-none absolute inset-x-0 top-8 z-20 px-6 text-center sm:top-12"
    >
      <h1 className="font-display mx-auto max-w-2xl text-3xl leading-tight font-medium text-forest sm:text-5xl md:text-6xl">
        Doğadan sofranıza <span className="text-coral">—</span> tek bir katkı
        maddesi olmadan.
      </h1>
      <p className="font-accent mt-3 text-xl text-plum sm:text-3xl">Enjoy Nature</p>
    </motion.div>
  );
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.06], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-x-0 bottom-8 z-20 flex flex-col items-center gap-2 text-forest/60"
    >
      <span className="text-xs tracking-widest uppercase">Kaydırın</span>
      <span className="h-8 w-px animate-pulse bg-forest/40" />
    </motion.div>
  );
}

function StaticHero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-cream to-sage/15 px-6 py-24 text-center">
      <h1 className="font-display max-w-2xl text-4xl leading-tight font-medium text-forest sm:text-5xl md:text-6xl">
        Doğadan sofranıza — tek bir katkı maddesi olmadan.
      </h1>
      <p className="font-accent mt-4 text-2xl text-plum sm:text-3xl">Enjoy Nature</p>
      <div className="mt-12 flex w-full max-w-3xl items-center justify-between gap-6">
        <div className="relative aspect-[4/5] w-40 shrink-0 overflow-hidden rounded-3xl shadow-xl -rotate-6 sm:w-56">
          <Image src="/hero-basket/hand-basket.png" alt="Taze sebzeler" fill sizes="220px" className="object-cover" />
        </div>
        <div className="relative aspect-square w-40 shrink-0 overflow-hidden rounded-3xl shadow-xl rotate-3 sm:w-56">
          <Image src="/hero-basket/product-basket.png" alt="VitaVegantis ürün sepeti" fill sizes="220px" className="object-cover" />
        </div>
      </div>
    </section>
  );
}

export default function BasketHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (reduceMotion) {
    return <StaticHero />;
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[210vh] sm:h-[280vh] md:h-[360vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-cream via-cream to-sage/20">
        <div
          className="absolute inset-x-0 bottom-0 h-[40%]"
          style={{
            background:
              "linear-gradient(to top, rgba(139,154,111,0.16), rgba(139,154,111,0))",
          }}
        />

        <HeroHeadline progress={scrollYProgress} />

        <div className="absolute inset-0">
          <HandBasketCard progress={scrollYProgress} />
          <ProductBasketCard progress={scrollYProgress} />
          <DecorativeRing progress={scrollYProgress} />
          {rollingVeggies.map((veg) => (
            <RollingVegItem key={veg.photo} veg={veg} progress={scrollYProgress} />
          ))}
        </div>

        <ScrollHint progress={scrollYProgress} />
      </div>
    </section>
  );
}
