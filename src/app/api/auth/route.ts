import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Admin panelinin GitHub girişini başlatan uç.
 * Panel bu adresi açar, biz kullanıcıyı GitHub'ın onay ekranına gönderiyoruz.
 * Dönüş adresi /api/callback ile karşılanır.
 */
export function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "GITHUB_OAUTH_CLIENT_ID tanımlı değil." },
      { status: 500 },
    );
  }

  const origin = request.nextUrl.origin;
  // CSRF koruması: rastgele state üretip çerezde saklıyoruz, dönüşte
  // GitHub'ın gönderdiğiyle karşılaştırıyoruz.
  const state = crypto.randomUUID();

  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("redirect_uri", `${origin}/api/callback`);
  authorize.searchParams.set("scope", "repo,user");
  authorize.searchParams.set("state", state);

  const response = NextResponse.redirect(authorize.toString());
  response.cookies.set("cms_oauth_state", state, {
    httpOnly: true,
    secure: origin.startsWith("https://"),
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return response;
}
