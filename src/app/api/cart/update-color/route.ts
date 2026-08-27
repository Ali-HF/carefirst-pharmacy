import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import { updateCartItemColor } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { bookId, oldColor, newColor, qty } = await request.json();
    const cleanQty = Number.isFinite(qty) ? qty : 1;
    const cleanOldColor = oldColor || "";
    const cleanNewColor = newColor || "";

    if (!bookId || !Number.isFinite(bookId)) {
      return NextResponse.json({ error: "Invalid bookId" }, { status: 400 });
    }

    if (cleanOldColor === cleanNewColor) {
      return NextResponse.json({ ok: true });
    }

    const session = await auth();

    if (session?.user?.id) {
      await updateCartItemColor(Number(session.user.id), bookId, cleanOldColor, cleanNewColor, cleanQty);
    } else {
      const cookieStore = await cookies();
      const cartCookie = cookieStore.get("notebloom_cart")?.value;
      if (cartCookie) {
        try {
          const cart: Array<{ book_id: number; quantity: number; color?: string | null }> = JSON.parse(cartCookie);
          if (Array.isArray(cart)) {
            // Find the item with oldColor
            const existingIdx = cart.findIndex((it) => it.book_id === bookId && (it.color || "") === cleanOldColor);
            
            if (existingIdx >= 0) {
              // Check if newColor already exists
              const targetIdx = cart.findIndex((it) => it.book_id === bookId && (it.color || "") === cleanNewColor);
              
              if (targetIdx >= 0 && targetIdx !== existingIdx) {
                // Merge into the target item
                cart[targetIdx].quantity += cleanQty;
                // Remove the old item
                cart.splice(existingIdx, 1);
              } else {
                // Just update the color
                cart[existingIdx].color = cleanNewColor;
              }
              
              cookieStore.set("notebloom_cart", JSON.stringify(cart), { maxAge: 86400 * 30, path: "/" });
            }
          }
        } catch (_e) {
          // ignore parse errors
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Cart update-color error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
