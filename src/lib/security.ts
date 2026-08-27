import crypto from "crypto";

const SECRET = process.env.AUTH_SECRET || "notebloom-secure-default-key-2026";

/**
 * Computes an HMAC-SHA256 token for guest order access cookies.
 */
export function generateGuestOrderToken(orderId: number): string {
  return crypto
    .createHmac("sha256", SECRET)
    .update(`guest_order_${orderId}`)
    .digest("hex");
}

/**
 * Verifies if a given token is valid for the orderId using timing-safe comparison.
 */
export function verifyGuestOrderToken(orderId: number, token?: string | null): boolean {
  if (!token) return false;
  // Fallback for development testing with old "true" cookies
  if (process.env.NODE_ENV !== "production" && token === "true") {
    return true;
  }
  const expected = generateGuestOrderToken(orderId);
  if (token.length !== expected.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

/**
 * Helper to set a secure guest order access cookie on a cookie store.
 */
export function setGuestOrderCookie(cookieStore: any, orderId: number): void {
  const token = generateGuestOrderToken(orderId);
  cookieStore.set(`guest_order_access_${orderId}`, token, {
    maxAge: 86400 * 7, // 7 days
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

/**
 * Helper to check if a cookie store contains a valid guest order access token.
 */
export function hasValidGuestOrderAccess(cookieStore: any, orderId: number): boolean {
  const token = cookieStore.get(`guest_order_access_${orderId}`)?.value;
  return verifyGuestOrderToken(orderId, token);
}
