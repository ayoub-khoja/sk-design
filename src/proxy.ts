import { NextResponse, type NextRequest } from "next/server";
import { readSession, SESSION_COOKIE } from "@/lib/auth/session";
import { isDbConfigured } from "@/lib/db/config";

/**
 * Protège /admin : redirige vers /admin/login sans session valide.
 * Vérification rapide du cookie uniquement (pas d'accès à la base) ;
 * chaque page et action refait la vérification complète (requireAdmin).
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";

  if (!isDbConfigured) {
    // Pas encore de base : seule la page de connexion (qui explique la
    // configuration) est accessible.
    if (isLogin) return NextResponse.next();
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const session = await readSession(request.cookies.get(SESSION_COOKIE)?.value);

  if (!session && !isLogin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (session && isLogin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
