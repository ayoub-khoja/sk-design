import { jwtVerify, SignJWT } from "jose";
import { SESSION_SECRET } from "@/lib/db/config";

// Fonctions sans dépendance serveur : utilisées par proxy.ts et requireAdmin.

export const SESSION_COOKIE = "sk_admin_session";
export const SESSION_DURATION_S = 60 * 60 * 24 * 7; // 7 jours

export type SessionPayload = { adminId: string; email: string };

function key() {
  return new TextEncoder().encode(SESSION_SECRET);
}

export async function signSession(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_S}s`)
    .sign(key());
}

/** Vérifie le jeton de session ; renvoie null s'il est absent, faux ou expiré. */
export async function readSession(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token || !SESSION_SECRET) return null;
  try {
    const { payload } = await jwtVerify(token, key(), { algorithms: ["HS256"] });
    if (typeof payload.adminId !== "string" || typeof payload.email !== "string") {
      return null;
    }
    return { adminId: payload.adminId, email: payload.email };
  } catch {
    return null;
  }
}
