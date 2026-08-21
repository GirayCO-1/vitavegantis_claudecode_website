"use client";

import { useEffect } from "react";

/**
 * <html lang> kök layout'ta sabit (tr). İngilizce alt ağaçta ekran okuyucular
 * ve tarayıcı çevirisi için lang'i istemci tarafında günceller; arama motoru
 * eşleşmesi hreflang üzerinden sağlanır.
 */
export default function SetHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = prev;
    };
  }, [lang]);

  return null;
}
