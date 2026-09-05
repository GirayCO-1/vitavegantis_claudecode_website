<?php
/**
 * VitaVegantis iletişim formu — sunucu tarafı gönderici.
 *
 * Site statik HTML olarak yayınlanıyor; sunucuda çalışan tek dosya bu.
 * IHS paketinde PHP açık (mevcut WordPress kurulumu onunla çalışıyordu),
 * mail da aynı pakette olduğu için mesaj kendi sunucumuzdan gidiyor —
 * üçüncü bir servise veri aktarılmıyor.
 *
 * Form buraya POST eder, bu dosya da ziyaretçiyi /iletisim/ sayfasına
 * durum bilgisiyle geri gönderir.
 *
 * NOT: Bu dosyaya ASLA parola/anahtar yazmayın. Vercel'de PHP çalışmadığı
 * için dosya orada düz metin olarak sunulur; içeriği herkese açıktır.
 */

$ALICI = 'info@vitavegantis.com';

/**
 * Formun döneceği sayfa. Açık yönlendirme (open redirect) olmaması için
 * serbest metin kabul edilmiyor; yalnızca bu iki sayfa geçerli.
 */
$DONUS_SAYFALARI = array('/iletisim/', '/en/contact/');

function geri_don($durum)
{
    global $DONUS_SAYFALARI;
    $istenen = isset($_POST['donus']) ? $_POST['donus'] : '';
    $sayfa = in_array($istenen, $DONUS_SAYFALARI, true) ? $istenen : '/iletisim/';
    header('Location: ' . $sayfa . '?durum=' . $durum, true, 303);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    geri_don('hata');
}

// Bal küpü: gerçek ziyaretçi bu alanı görmez ve boş bırakır, botlar doldurur.
// Bota "gönderildi" deyip sessizce atıyoruz ki tekrar denemesin.
if (isset($_POST['website']) && $_POST['website'] !== '') {
    geri_don('ok');
}

$ad     = isset($_POST['ad']) ? trim($_POST['ad']) : '';
$eposta = isset($_POST['eposta']) ? trim($_POST['eposta']) : '';
$mesaj  = isset($_POST['mesaj']) ? trim($_POST['mesaj']) : '';

if ($ad === '' || $mesaj === '' || !filter_var($eposta, FILTER_VALIDATE_EMAIL)) {
    geri_don('eksik');
}
if (mb_strlen($ad) > 100 || mb_strlen($eposta) > 200 || mb_strlen($mesaj) > 5000) {
    geri_don('eksik');
}

// Başlık enjeksiyonu koruması: başlığa girecek alanlarda satır sonu olamaz.
if (preg_match('/[\r\n]/', $ad) || preg_match('/[\r\n]/', $eposta)) {
    geri_don('hata');
}

$konu = '=?UTF-8?B?' . base64_encode('Web sitesi mesajı — ' . $ad) . '?=';

$govde = "Web sitesindeki iletişim formundan yeni mesaj:\n\n"
    . "Ad Soyad : " . $ad . "\n"
    . "E-posta  : " . $eposta . "\n"
    . "Tarih    : " . date('d.m.Y H:i') . "\n"
    . "IP       : " . (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '-') . "\n\n"
    . "Mesaj:\n" . $mesaj . "\n";

// From kendi alan adımız olmalı; ziyaretçinin adresini From'a yazmak
// SPF/DKIM'e takılır ve mesaj spam'e düşer. Ziyaretçiye "Yanıtla" ile
// dönebilmek için Reply-To kullanılıyor.
$basliklar = implode("\r\n", array(
    'From: VitaVegantis Web <' . $ALICI . '>',
    'Reply-To: ' . $eposta,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: VitaVegantis-Form',
));

$gonderildi = @mail($ALICI, $konu, $govde, $basliklar, '-f' . $ALICI);

geri_don($gonderildi ? 'ok' : 'hata');
