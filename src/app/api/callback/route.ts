import { type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

/** Paneldeki açılır pencereye sonucu bildiren küçük sayfa. */
function postMessagePage(message: string, origin: string) {
  const payload = JSON.stringify(message);
  const target = JSON.stringify(origin);
  return new Response(
    `<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>Giriş</title></head>
<body style="font-family:system-ui;padding:2rem">
<p>Giriş tamamlanıyor…</p>
<script>
(function () {
  var message = ${payload};
  function send(e) { window.opener.postMessage(message, ${target}); }
  if (!window.opener) { document.body.innerHTML = "<p>Bu pencereyi kapatabilirsiniz.</p>"; return; }
  // Panel önce "authorizing" el sıkışmasını bekler, sonra sonucu alır.
  window.addEventListener("message", send, false);
  window.opener.postMessage("authorizing:github", ${target});
})();
</script>
</body></html>`,
    { headers: { "content-type": "text/html; charset=utf-8" } },
  );
}

/**
 * GitHub'dan dönen yetki kodunu erişim anahtarına çevirip panele iletir.
 * Anahtar yalnızca tarayıcıdaki panele gider; sunucuda saklanmaz.
 */
export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get("cms_oauth_state")?.value;

  const fail = (reason: string) =>
    postMessagePage(
      `authorization:github:error:${JSON.stringify({ message: reason })}`,
      origin,
    );

  if (!code) return fail("GitHub yetki kodu alınamadı.");
  if (!state || !expectedState || state !== expectedState) {
    return fail("Oturum doğrulaması başarısız. Lütfen tekrar deneyin.");
  }

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return fail("Sunucuda GitHub anahtarları tanımlı değil.");
  }

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${origin}/api/callback`,
      }),
    },
  );

  const data = (await tokenResponse.json()) as {
    access_token?: string;
    error_description?: string;
  };

  if (!data.access_token) {
    return fail(data.error_description ?? "Erişim anahtarı alınamadı.");
  }

  return postMessagePage(
    `authorization:github:success:${JSON.stringify({
      token: data.access_token,
      provider: "github",
    })}`,
    origin,
  );
}
