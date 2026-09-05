"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "@/lib/i18n";

/**
 * İletişim formu.
 *
 * Düz bir HTML form POST'u yapar; sunucu mesajı info@vitavegantis.com
 * adresine yollar ve ziyaretçiyi ?durum= ile bu sayfaya geri gönderir.
 * JavaScript kapalıyken de çalışır.
 *
 * Gönderim adresi yayın hedefine göre değişir ve derleme anında forma
 * gömülür (bkz. next.config.ts → env.ILETISIM_ACTION):
 *   - Vercel: /api/iletisim/   (src/app/api/iletisim/route.node.ts)
 *   - IHS   : /iletisim-gonder.php
 * İkisi de aynı alanları bekler ve aynı ?durum= değerlerini döndürür.
 */
const ACTION = process.env.ILETISIM_ACTION ?? "/api/iletisim/";
const TEXT = {
  tr: {
    name: "Ad Soyad",
    email: "E-posta",
    message: "Mesajınız",
    send: "Mesajı Gönder",
    note: "Mesajınız doğrudan info@vitavegantis.com adresine iletilir.",
    ok: "Mesajınız bize ulaştı. En kısa sürede size döneceğiz.",
    eksik: "Mesaj gönderilemedi: lütfen ad, e-posta ve mesaj alanlarını kontrol edin.",
    hata: "Mesaj gönderilemedi. Doğrudan info@vitavegantis.com adresine yazabilirsiniz.",
  },
  en: {
    name: "Full Name",
    email: "Email",
    message: "Your Message",
    send: "Send Message",
    note: "Your message goes straight to info@vitavegantis.com.",
    ok: "Your message reached us. We'll get back to you shortly.",
    eksik: "Message not sent: please check the name, email and message fields.",
    hata: "Message could not be sent. You can email info@vitavegantis.com directly.",
  },
} as const;

type Durum = "ok" | "eksik" | "hata";

/** Adres çubuğundaki ?durum= değeri; sayfa açıldıktan sonra değişmiyor. */
const abone = () => () => {};
const istemciDegeri = () => new URLSearchParams(window.location.search).get("durum");
const sunucuDegeri = () => null;

export default function ContactForm({ locale = "tr" }: { locale?: Locale }) {
  const t = TEXT[locale];
  // PHP, gönderim sonrası ?durum=... ile bu sayfaya geri döndürüyor.
  // Sunucuda null, istemcide gerçek değer — hidrasyon uyuşmazlığı olmuyor.
  const ham = useSyncExternalStore(abone, istemciDegeri, sunucuDegeri);
  const durum: Durum | null =
    ham === "ok" || ham === "eksik" || ham === "hata" ? ham : null;

  const inputClass =
    "mt-1 w-full rounded-xl border border-forest/20 bg-white/70 px-4 py-3 text-sm text-forest outline-none focus:border-coral";

  return (
    <form action={ACTION} method="post" className="space-y-5">
      {/* Gönderimden sonra dönülecek sayfa; İngilizce form /en/contact/'a döner. */}
      <input
        type="hidden"
        name="donus"
        value={locale === "en" ? "/en/contact/" : "/iletisim/"}
      />
      {durum && (
        <p
          role="status"
          className={
            durum === "ok"
              ? "rounded-xl border border-forest/20 bg-mint/60 px-4 py-3 text-sm text-forest"
              : "rounded-xl border border-coral/40 bg-coral/10 px-4 py-3 text-sm text-forest"
          }
        >
          {t[durum]}
        </p>
      )}

      {/* Bal küpü — ekranda görünmez, yalnızca botlar doldurur. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div>
        <label htmlFor="ad" className="text-sm font-medium text-forest">
          {t.name}
        </label>
        <input id="ad" name="ad" required maxLength={100} className={inputClass} />
      </div>
      <div>
        <label htmlFor="eposta" className="text-sm font-medium text-forest">
          {t.email}
        </label>
        <input
          id="eposta"
          name="eposta"
          type="email"
          required
          maxLength={200}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="mesaj" className="text-sm font-medium text-forest">
          {t.message}
        </label>
        <textarea
          id="mesaj"
          name="mesaj"
          required
          rows={5}
          maxLength={5000}
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-forest px-8 py-3 text-sm font-semibold text-cream transition-colors hover:bg-coral sm:w-auto"
      >
        {t.send}
      </button>
      <p className="text-xs text-forest/50">{t.note}</p>
    </form>
  );
}
