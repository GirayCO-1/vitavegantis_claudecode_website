import type { Metadata } from "next";
import { SITE_URL, canonical } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/structuredData";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Contributing to a better, healthier world: VitaVegantis' vision, mission and values.",
  alternates: {
    canonical: canonical("en/about"),
    languages: {
      "tr-TR": canonical("hakkimizda"),
      en: canonical("en/about"),
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: canonical("en/about"),
    title: "About Us — Our Vision & Mission | VitaVegantis",
    description:
      "Contributing to a better, healthier world: VitaVegantis' vision, mission and values.",
    images: [`${SITE_URL}/lifestyle/kahvalti-sofrasi.webp`],
  },
};

const values = [
  {
    title: "No Additives",
    body: "Whatever is in our products is on the label. We use no preservatives, no hidden additives, no ingredient we couldn't explain.",
  },
  {
    title: "No Compromise on Flavour",
    body: "The biggest barrier to plant-based eating is assumed to be lost flavour. We develop our products to be chosen because they're delicious — not because they're an alternative.",
  },
  {
    title: "Accessibility",
    body: "We believe healthy, plant-based eating should be an everyday option within everyone's reach — not a privilege.",
  },
  {
    title: "Respect for the Planet",
    body: "Every choice at the table has a consequence for the world. We see plant protein as a way to lighten that load.",
  },
];

export default function AboutPageEn() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "en" },
          { name: "About Us", path: "en/about" },
        ])}
      />
      <section className="relative overflow-hidden bg-forest px-6 py-24 text-cream">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-accent text-2xl text-sun">Our Vision &amp; Mission</p>
          <h1 className="font-display mt-3 text-4xl leading-tight font-semibold sm:text-5xl md:text-6xl">
            Contributing to a better, healthier world
          </h1>
          <p className="mt-6 text-base leading-relaxed text-cream/80 sm:text-lg">
            VitaVegantis set out seeing plant protein not merely as a product
            category, but as two connected paths: nourishing our bodies and
            protecting the planet.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2">
          <div>
            <p className="font-accent text-2xl text-plum">Our Vision</p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-forest">
              Tables where plant-based is the habit, not the exception
            </h2>
            <p className="mt-5 leading-relaxed text-forest/75">
              We imagine a future where a plant-based product sits on the
              table not as a &quot;special choice&quot; but as an everyday
              flavour everyone reaches for. That&apos;s why we want our
              products to be talked about first for their taste, then for
              what&apos;s inside them.
            </p>
          </div>

          <div>
            <p className="font-accent text-2xl text-coral">Our Mission</p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-forest">
              Bringing what nature offers to the table, as it is
            </h2>
            <p className="mt-5 leading-relaxed text-forest/75">
              We develop foods that combine high nutritional values, and an
              incredible taste — rebuilding familiar flavours by plant-based
              means, with nothing artificial added. Our measure for every
              production decision is the same: would we put this on our own
              table?
            </p>
          </div>
        </div>
      </section>

      <section className="bg-sage/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-center text-3xl font-semibold text-forest">
            Our Values
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl border border-forest/10 bg-white/60 p-8"
              >
                <h3 className="font-display text-xl font-semibold text-forest">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-forest/75">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] shadow-lg shadow-forest/10">
            <Image
              src="/lifestyle/kahvalti-sofrasi.webp"
              alt="A crowded Turkish breakfast table"
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-accent text-2xl text-plum">Deliciously Plant Based</p>
            <h2 className="font-display mt-2 text-3xl font-semibold text-forest">
              Every bite, a nod of respect to nature
            </h2>
            <p className="mt-5 leading-relaxed text-forest/75">
              With VitaVegantis, every bite is a mark of respect for nature
              and a gift to your body. Be open-minded, explore nature, enjoy
              it.
            </p>
            <Link
              href="/en/products"
              className="mt-8 inline-block rounded-full bg-forest px-8 py-3 text-sm font-semibold text-cream transition-transform hover:scale-105 hover:bg-coral"
            >
              Explore Our Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
