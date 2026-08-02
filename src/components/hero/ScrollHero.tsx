"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import IngredientIcon from "@/components/IngredientIcon";
import { heroIngredients, type HeroIngredient } from "./heroIngredients";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const STAGE = 560;
const CENTER = STAGE / 2;

function IngredientOrbit({
  ingredient,
  index,
  total,
  progress,
}: {
  ingredient: HeroIngredient;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = (index / total) * 0.45;
  const end = start + 0.32;
  const half = ingredient.size / 2;

  const x = useTransform(progress, (v) => {
    const t = easeOutCubic(clamp((v - start) / (end - start)));
    const radius = ingredient.startRadius * (1 - t);
    const angle = ((ingredient.startAngle + t * 220) * Math.PI) / 180;
    return CENTER + Math.cos(angle) * radius - half;
  });
  const y = useTransform(progress, (v) => {
    const t = easeOutCubic(clamp((v - start) / (end - start)));
    const radius = ingredient.startRadius * (1 - t);
    const angle = ((ingredient.startAngle + t * 220) * Math.PI) / 180;
    return CENTER + Math.sin(angle) * radius - half;
  });
  const scale = useTransform(progress, [start, end], [1, 0.25]);
  const opacity = useTransform(progress, [start, end - 0.06, end], [1, 1, 0]);
  const rotate = useTransform(progress, [start, end], [0, 200]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: ingredient.size,
        height: ingredient.size,
        x,
        y,
        scale,
        opacity,
        rotate,
      }}
    >
      <IngredientIcon type={ingredient.type} color={ingredient.color} className="h-full w-full drop-shadow-md" />
    </motion.div>
  );
}

function PotVisual({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.48, 0.58], [1, 1, 0]);
  const scale = useTransform(progress, [0, 0.48, 0.58], [1, 1.04, 0.85]);
  const steamOpacity = useTransform(progress, [0.2, 0.4, 0.55], [0, 0.6, 0]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        style={{ opacity: steamOpacity }}
        className="absolute -top-16 left-1/2 flex -translate-x-1/2 gap-3"
      >
        <span className="steam-wisp h-16 w-2 rounded-full bg-cream/70 [animation-delay:0s]" />
        <span className="steam-wisp h-20 w-2 rounded-full bg-cream/60 [animation-delay:0.4s]" />
        <span className="steam-wisp h-14 w-2 rounded-full bg-cream/70 [animation-delay:0.8s]" />
      </motion.div>
      <svg width="180" height="180" viewBox="0 0 180 180" role="img" aria-label="Tencere">
        <ellipse cx="90" cy="150" rx="70" ry="14" fill="#0B4A28" opacity="0.15" />
        <rect x="30" y="60" width="120" height="80" rx="10" fill="#0B4A28" />
        <ellipse cx="90" cy="60" rx="60" ry="14" fill="#8B9A6F" />
        <ellipse cx="90" cy="60" rx="52" ry="10" fill="#0E2116" />
        <rect x="12" y="88" width="18" height="10" rx="5" fill="#0B4A28" />
        <rect x="150" y="88" width="18" height="10" rx="5" fill="#0B4A28" />
      </svg>
    </motion.div>
  );
}

function PackageReveal({ progress }: { progress: MotionValue<number> }) {
  const scale = useTransform(progress, [0.64, 0.85, 1], [0.55, 1.05, 1]);
  const opacity = useTransform(progress, [0.62, 0.78], [0, 1]);
  const glow = useTransform(progress, [0.62, 0.82, 1], [0, 0.9, 0.5]);
  const glowShadow = useMotionTemplate`0 0 120px 40px rgba(242,183,5,${glow})`;

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        style={{ boxShadow: glowShadow }}
        className="relative flex h-40 w-64 flex-col items-center justify-center gap-1 rounded-3xl bg-white px-6"
      >
        <span className="font-display text-3xl font-semibold text-forest">VitaVegantis</span>
        <span className="font-accent text-xl text-plum">Enjoy Nature</span>
      </motion.div>
    </motion.div>
  );
}

function HeroHeadline({ progress }: { progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [0, -60]);
  const opacity = useTransform(progress, [0, 0.6, 0.85], [1, 1, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="pointer-events-none absolute inset-x-0 top-14 z-10 px-6 text-center sm:top-20"
    >
      <h1 className="font-display mx-auto max-w-3xl text-4xl leading-tight font-medium text-forest sm:text-5xl md:text-6xl">
        Doğadan sofranıza <span className="text-coral">—</span> tek bir katkı
        maddesi olmadan.
      </h1>
      <p className="font-accent mt-4 text-2xl text-plum sm:text-3xl">Enjoy Nature</p>
    </motion.div>
  );
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.08], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-2 text-forest/60"
    >
      <span className="text-xs tracking-widest uppercase">Kaydırın</span>
      <span className="h-8 w-px animate-pulse bg-forest/40" />
    </motion.div>
  );
}

function StaticHero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-cream to-sage/15 px-6 py-24 text-center">
      <h1 className="font-display max-w-3xl text-4xl leading-tight font-medium text-forest sm:text-5xl md:text-6xl">
        Doğadan sofranıza — tek bir katkı maddesi olmadan.
      </h1>
      <p className="font-accent mt-4 text-2xl text-plum sm:text-3xl">Enjoy Nature</p>
      <div className="mt-12 flex h-40 w-64 flex-col items-center justify-center gap-1 rounded-3xl bg-white shadow-xl">
        <span className="font-display text-3xl font-semibold text-forest">VitaVegantis</span>
        <span className="font-accent text-xl text-plum">Enjoy Nature</span>
      </div>
    </section>
  );
}

export default function ScrollHero() {
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
      className="relative h-[220vh] sm:h-[300vh] md:h-[420vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-cream to-sage/15">
        <HeroHeadline progress={scrollYProgress} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative scale-[0.5] sm:scale-[0.72] md:scale-100"
            style={{ width: STAGE, height: STAGE }}
          >
            <PotVisual progress={scrollYProgress} />
            {heroIngredients.map((ingredient, i) => (
              <IngredientOrbit
                key={ingredient.type}
                ingredient={ingredient}
                index={i}
                total={heroIngredients.length}
                progress={scrollYProgress}
              />
            ))}
            <PackageReveal progress={scrollYProgress} />
          </div>
        </div>
        <ScrollHint progress={scrollYProgress} />
      </div>
    </section>
  );
}
