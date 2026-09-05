"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { switchLocalePath, type Locale } from "@/lib/i18n";

const NAV = {
  tr: {
    links: [
      { href: "/", label: "Ana Sayfa" },
      { href: "/hakkimizda", label: "Hakkımızda" },
      { href: "/urunler", label: "Ürünler" },
      { href: "/tarifler", label: "Tarifler" },
      { href: "/blog", label: "Blog" },
      { href: "/iletisim", label: "İletişim" },
    ],
    sales: { href: "/satisnoktalari", label: "Satış Noktaları" },
    menuToggle: "Menüyü aç/kapat",
    home: "/",
  },
  en: {
    links: [
      { href: "/en", label: "Home" },
      { href: "/en/about", label: "About Us" },
      { href: "/en/products", label: "Products" },
      { href: "/en/recipes", label: "Recipes" },
      { href: "/en/blog", label: "Blog" },
      { href: "/en/contact", label: "Contact" },
    ],
    sales: { href: "/en/sales-points", label: "Where to Buy" },
    menuToggle: "Toggle menu",
    home: "/en",
  },
} as const;

function LocaleSwitch({
  locale,
  className = "",
  onNavigate,
}: {
  locale: Locale;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() ?? "/";
  return (
    <div
      className={`flex items-center gap-1 rounded-full border border-forest/15 p-0.5 text-xs font-semibold ${className}`}
    >
      <Link
        href={switchLocalePath(pathname, "tr")}
        onClick={onNavigate}
        aria-current={locale === "tr" ? "true" : undefined}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === "tr"
            ? "bg-forest text-cream"
            : "text-forest/70 hover:text-coral"
        }`}
      >
        TR
      </Link>
      <Link
        href={switchLocalePath(pathname, "en")}
        onClick={onNavigate}
        aria-current={locale === "en" ? "true" : undefined}
        className={`rounded-full px-2.5 py-1 transition-colors ${
          locale === "en"
            ? "bg-forest text-cream"
            : "text-forest/70 hover:text-coral"
        }`}
      >
        EN
      </Link>
    </div>
  );
}

export default function Navbar({ locale = "tr" }: { locale?: Locale }) {
  const [open, setOpen] = useState(false);
  const nav = NAV[locale];

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href={nav.home} onClick={() => setOpen(false)} className="shrink-0">
          <Image
            src="/brand/logo.webp"
            alt="VitaVegantis"
            width={1600}
            height={267}
            priority
            className="h-6 w-auto sm:h-7"
          />
        </Link>

        {/* Bulunulan sayfanın bağlantısı ayrıca renklendirilmiyor; tüm
            başlıklar aynı yeşilde duruyor. */}
        <ul className="hidden items-center gap-7 md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-forest transition-colors hover:text-coral"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitch locale={locale} />
          <Link
            href={nav.sales.href}
            className="rounded-full bg-forest px-5 py-2 text-sm font-medium text-cream transition-colors hover:bg-coral"
          >
            {nav.sales.label}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LocaleSwitch locale={locale} />
          <button
            type="button"
            aria-label={nav.menuToggle}
            aria-expanded={open}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-0.5 w-6 bg-forest transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-forest transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-forest transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-forest/10 bg-cream px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-base font-medium text-forest"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={nav.sales.href}
                className="mt-2 inline-block rounded-full bg-forest px-5 py-2 text-sm font-medium text-cream"
                onClick={() => setOpen(false)}
              >
                {nav.sales.label}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
