"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/lib/i18n";

const TEXT = {
  tr: {
    name: "Ad Soyad",
    email: "E-posta",
    message: "Mesajınız",
    send: "Mesajı Gönder",
    note: "Gönder butonuna bastığınızda, mesajınızla birlikte e-posta uygulamanız açılır.",
    subject: (name: string) => `Web sitesi mesajı — ${name}`,
  },
  en: {
    name: "Full Name",
    email: "Email",
    message: "Your Message",
    send: "Send Message",
    note: "When you press send, your email app opens with the message ready to go.",
    subject: (name: string) => `Website message — ${name}`,
  },
} as const;

export default function ContactForm({ locale = "tr" }: { locale?: Locale }) {
  const t = TEXT[locale];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(t.subject(name));
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:info@vitavegantis.com?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-forest">
          {t.name}
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-xl border border-forest/20 bg-white/70 px-4 py-3 text-sm text-forest outline-none focus:border-coral"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-forest">
          {t.email}
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-xl border border-forest/20 bg-white/70 px-4 py-3 text-sm text-forest outline-none focus:border-coral"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-forest">
          {t.message}
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 w-full rounded-xl border border-forest/20 bg-white/70 px-4 py-3 text-sm text-forest outline-none focus:border-coral"
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
