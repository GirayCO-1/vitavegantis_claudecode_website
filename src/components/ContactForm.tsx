"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Web sitesi mesajı — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:info@vitavegantis.com?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-forest">
          Ad Soyad
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
          E-posta
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
          Mesajınız
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
        Mesajı Gönder
      </button>
      <p className="text-xs text-forest/50">
        Gönder butonuna bastığınızda, mesajınızla birlikte e-posta uygulamanız
        açılır.
      </p>
    </form>
  );
}
