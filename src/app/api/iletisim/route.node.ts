import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * İletişim formu — Vercel tarafındaki gönderici.
 *
 * Site Vercel'de yayınlanınca PHP çalışmıyor (public/iletisim-gonder.php
 * yalnızca IHS'de çalışır), bu yüzden mesajı bu rota yolluyor. İkisi de
 * aynı işi yapıyor: forma gelen alanları doğrular ve info@vitavegantis.com
 * adresine e-posta olarak iletir.
 *
 * Mail, IHS'deki kendi hesabımızın SMTP'si üzerinden gidiyor — üçüncü bir
 * servise veri aktarılmıyor. Bağlantı bilgileri ortam değişkeninden okunur;
 * parola koda ASLA yazılmaz (bkz. .env.example).
 *
 * Statik çıktıda (BUILD_TARGET=static) bu dosya derlemeye girmez;
 * next.config.ts içindeki pageExtensions ayarı onu dışarıda bırakır.
 */

export const runtime = "nodejs";
// Form her istekte çalışmalı; önbelleğe alınmamalı.
export const dynamic = "force-dynamic";

const ALICI = process.env.CONTACT_TO ?? "info@vitavegantis.com";
const GONDEREN = process.env.SMTP_USER ?? ALICI;

/**
 * Formun döneceği sayfa. Açık yönlendirme (open redirect) olmaması için
 * serbest metin kabul edilmiyor; yalnızca bu iki sayfa geçerli.
 */
const DONUS_SAYFALARI = new Set(["/iletisim/", "/en/contact/"]);

function geriDon(istekUrl: string, sayfa: string, durum: string) {
  const hedef = DONUS_SAYFALARI.has(sayfa) ? sayfa : "/iletisim/";
  // 303: tarayıcı POST'u GET'e çevirerek sayfayı yeniden yükler; böylece
  // ziyaretçi yenilediğinde form ikinci kez gönderilmez.
  return NextResponse.redirect(new URL(`${hedef}?durum=${durum}`, istekUrl), 303);
}

/** Başlık enjeksiyonu koruması: e-posta başlığına girecek alanda satır sonu olamaz. */
const satirSonuVar = (deger: string) => /[\r\n]/.test(deger);

const epostaGecerli = (deger: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(deger);

export async function POST(request: Request) {
  const url = request.url;
  let sayfa = "/iletisim/";

  try {
    const form = await request.formData();
    const al = (ad: string) => String(form.get(ad) ?? "").trim();

    sayfa = al("donus") || "/iletisim/";

    // Bal küpü: gerçek ziyaretçi bu alanı görmez ve boş bırakır, botlar doldurur.
    // Bota "gönderildi" deyip sessizce atıyoruz ki tekrar denemesin.
    if (al("website") !== "") {
      return geriDon(url, sayfa, "ok");
    }

    const ad = al("ad");
    const eposta = al("eposta");
    const mesaj = al("mesaj");

    if (!ad || !mesaj || !epostaGecerli(eposta)) {
      return geriDon(url, sayfa, "eksik");
    }
    if (ad.length > 100 || eposta.length > 200 || mesaj.length > 5000) {
      return geriDon(url, sayfa, "eksik");
    }
    if (satirSonuVar(ad) || satirSonuVar(eposta)) {
      return geriDon(url, sayfa, "hata");
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.error("İletişim formu: SMTP ortam değişkenleri eksik.");
      return geriDon(url, sayfa, "hata");
    }

    const port = Number(SMTP_PORT ?? 465);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      // 465 doğrudan SSL; 587 önce düz bağlanıp STARTTLS'e geçer.
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const tarih = new Date().toLocaleString("tr-TR", {
      timeZone: "Europe/Istanbul",
    });
    // Vercel ziyaretçinin adresini bu başlıkta veriyor; ilki gerçek istemci.
    const ip = (request.headers.get("x-forwarded-for") ?? "-").split(",")[0].trim();

    await transporter.sendMail({
      to: ALICI,
      // From kendi alan adımız olmalı; ziyaretçinin adresini From'a yazmak
      // SPF/DKIM'e takılır ve mesaj spam'e düşer. Ziyaretçiye "Yanıtla" ile
      // dönebilmek için Reply-To kullanılıyor.
      from: `"VitaVegantis Web" <${GONDEREN}>`,
      replyTo: eposta,
      subject: `Web sitesi mesajı — ${ad}`,
      text:
        "Web sitesindeki iletişim formundan yeni mesaj:\n\n" +
        `Ad Soyad : ${ad}\n` +
        `E-posta  : ${eposta}\n` +
        `Tarih    : ${tarih}\n` +
        `IP       : ${ip}\n\n` +
        `Mesaj:\n${mesaj}\n`,
    });

    return geriDon(url, sayfa, "ok");
  } catch (hata) {
    console.error("İletişim formu gönderilemedi:", hata);
    return geriDon(url, sayfa, "hata");
  }
}
