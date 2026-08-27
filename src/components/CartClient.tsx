"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BookCover from "@/components/BookCover";
import BloomMark from "@/components/BloomMark";
import CartQtyInput from "@/components/CartQtyInput";
import { formatPrice, parseProductMedia, type CartRow } from "@/lib/cart-utils";

export default function CartClient({
  items,
  isGuest,
}: {
  items: CartRow[];
  isGuest: boolean;
}) {
  const [cartItems, setCartItems] = useState<CartRow[]>(items);
  const qtyTimeouts = useRef<Record<number, ReturnType<typeof setTimeout>>>({});
  const router = useRouter();
  const [updatingItemIds, setUpdatingItemIds] = useState<number[]>([]);
  const syncLockRef = useRef<Set<number>>(new Set());

  const handleColorChange = (itemId: number, bookId: number, oldColor: string | null, newColor: string, qty: number) => {
    if (oldColor === newColor) return;
    
    // Immediate synchronous lock to prevent double clicks within the same render cycle
    if (syncLockRef.current.has(itemId)) return;
    syncLockRef.current.add(itemId);
    
    // Also update UI state for the disabled styles
    setUpdatingItemIds((prev) => [...prev, itemId]);
    
    // Instantly update UI state
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(it => it.book_id === bookId && (it.color || "").toLowerCase() === newColor.toLowerCase() && it.id !== itemId);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        return updated.filter(it => it.id !== itemId);
      }
      return prev.map((it) => (it.id === itemId ? { ...it, color: newColor } : it));
    });

    // Fire-and-forget background sync
    fetch("/api/cart/update-color", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId, oldColor, newColor, qty }),
    })
      .then(() => {
        router.refresh();
      })
      .catch((err) => {
        console.error("Failed to sync color:", err);
      })
      .finally(() => {
        syncLockRef.current.delete(itemId);
        setUpdatingItemIds((prev) => prev.filter(id => id !== itemId));
      });
  };

  // Sync state with props when server re-renders (e.g. full page navigation)
  useEffect(() => {
    setCartItems(items);
  }, [items]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(qtyTimeouts.current).forEach(clearTimeout);
    };
  }, []);

  const handleQtyChange = (itemId: number, bookId: number, newQty: number, color?: string | null) => {
    const oldItem = cartItems.find((it) => it.id === itemId);
    const oldQty = oldItem ? oldItem.quantity : 0;
    const delta = newQty - oldQty;

    // Instantly update UI state — zero delay
    setCartItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, quantity: newQty } : it))
    );

    // Update global cart badge instantly
    window.dispatchEvent(new CustomEvent("cart-update", { detail: { delta } }));

    // Debounce the background sync
    if (qtyTimeouts.current[itemId]) {
      clearTimeout(qtyTimeouts.current[itemId]);
    }

    qtyTimeouts.current[itemId] = setTimeout(() => {
      fetch("/api/cart/update-qty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, qty: newQty, color }),
      }).catch((err) => {
        console.error("Failed to sync qty:", err);
      });
    }, 400);
  };

  const handleRemove = (itemId: number, bookId: number, color?: string | null) => {
    const item = cartItems.find((it) => it.id === itemId);
    if (item) {
      // Update global cart badge instantly
      window.dispatchEvent(new CustomEvent("cart-update", { detail: { delta: -item.quantity } }));
    }

    // Instantly remove from UI
    setCartItems((prev) => prev.filter((it) => it.id !== itemId));

    // Fire-and-forget background sync
    fetch("/api/cart/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId, color }),
    }).catch((err) => {
      console.error("Failed to sync remove:", err);
    });
  };

  const computedTotal = cartItems.reduce(
    (sum, it) => sum + it.price_cents * it.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center flex flex-col items-center gap-4">
        <BloomMark size={40} />
        <h1 className="text-3xl" style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>
          Your cart is empty
        </h1>
        <p className="text-ink-soft">Find some lovely stationery products to get started.</p>
        <div className="flex gap-3 mt-2">
          <Link
            href="/shop"
            className="px-5 py-2.5 rounded-full ring-1 ring-ink/20 text-sm hover:ring-oxblood transition-colors"
            style={{ fontFamily: "var(--font-stamp)" }}
          >
            BROWSE STORE
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-4xl mb-8 font-semibold text-ink" style={{ fontFamily: "var(--font-display)" }}>
        Your cart
      </h1>

      <div className="flex flex-col md:grid md:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Cart items */}
        <ul className="divide-y divide-ink/10 border-y border-ink/10 w-full">
          {cartItems.map((item) => {
            const media = parseProductMedia(item.color_images, item.stock);
            const activeCat = media.categories.find(
              (c) => c.name.toLowerCase() === (item.color || "").toLowerCase()
            );
            const activeStock = activeCat ? activeCat.stock : item.stock;
            const currentSeed = activeCat?.images[0] || item.cover_seed;

            return (
              <li key={item.id} className="py-6 flex flex-col sm:flex-row gap-5 sm:gap-6">
                <div className="flex gap-4 sm:gap-6 flex-1">
                  {/* Image */}
                  <Link href={`/shop/${item.book_id}`} className="w-24 h-28 sm:w-28 sm:h-32 shrink-0 overflow-hidden rounded-md border border-ink/10 bg-cream">
                    <BookCover
                      title={item.title}
                      author={item.author}
                      genre=""
                      seed={currentSeed}
                      className="w-full h-full object-cover"
                      sizes="96px"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col">
                    {/* Title + remove */}
                    <div className="flex items-start justify-between gap-3">
                      <Link href={`/shop/${item.book_id}`} className="hover:text-oxblood transition-colors pr-2">
                        <h3 className="font-semibold text-base sm:text-lg text-ink leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                          {item.title}
                        </h3>
                      </Link>
                      <div className="shrink-0">
                        <button
                          type="button"
                          onClick={() => handleRemove(item.id, item.book_id, item.color)}
                          className="p-2 -mr-2 -mt-2 text-ink-soft hover:text-oxblood active:scale-90 active:opacity-75 transition-all cursor-pointer rounded-full"
                          aria-label="Remove item"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-ink-soft mt-1" style={{ fontFamily: "var(--font-stamp)" }}>
                      SKU: NB-00{item.book_id} · {formatPrice(item.price_cents)} each
                    </p>

                    {media.categories.length > 1 && (
                      <div className="mt-3">
                        <span className="text-[9px] tracking-wider text-ink-soft uppercase flex items-center gap-1.5 mb-1 font-bold" style={{ fontFamily: "var(--font-stamp)" }}>
                          Color: {item.color || "None"}
                          {updatingItemIds.includes(item.id) && (
                            <span className="flex items-center ml-1">
                              <svg className="animate-spin h-3 w-3 text-oxblood" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            </span>
                          )}
                        </span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {media.categories.map((ci) => {
                            const isSelected = (item.color || "").toLowerCase() === ci.name.toLowerCase();
                            const isOutOfStock = ci.stock <= 0;
                            const isUpdating = updatingItemIds.includes(item.id);
                            
                            return (
                              <button
                                key={ci.name}
                                type="button"
                                disabled={isOutOfStock || isUpdating}
                                onClick={() => handleColorChange(item.id, item.book_id, item.color || null, ci.name, item.quantity)}
                                className={`px-3 py-1.5 sm:px-2 sm:py-0.5 rounded-full text-[10px] sm:text-[9px] uppercase font-bold tracking-wider transition-all border active:scale-95 touch-manipulation select-none ${
                                  isSelected
                                    ? "bg-oxblood text-cream border-oxblood shadow-sm scale-105"
                                    : isOutOfStock
                                    ? "bg-ink/5 text-ink-soft/40 border-ink/10 line-through cursor-not-allowed opacity-50"
                                    : "bg-cream text-ink-soft border-ink/20 hover:border-ink/40 active:bg-ink/5"
                                } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                                style={{ fontFamily: "var(--font-stamp)", minWidth: "44px", minHeight: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}
                              >
                                {ci.name} {isOutOfStock && "(SOLD OUT)"}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-4">
                      <CartQtyInput
                        bookId={item.book_id}
                        currentQty={item.quantity}
                        stock={activeStock}
                        onChange={(newQty) => handleQtyChange(item.id, item.book_id, newQty, item.color)}
                      />
                      <span className="font-semibold text-base text-ink" style={{ fontFamily: "var(--font-stamp)" }}>
                        {formatPrice(item.price_cents * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Order summary */}
        <aside className="w-full bg-cream border border-[#c8b090] rounded-lg p-6 shadow-sm">
          <h2 className="text-xs font-bold tracking-[0.08em] text-ink uppercase" style={{ fontFamily: "var(--font-stamp)" }}>
            ORDER SUMMARY
          </h2>
          <hr className="border-t border-[#c8b090]/50 my-4" />
          <div className="flex justify-between text-xs text-ink mb-3" style={{ fontFamily: "var(--font-stamp)" }}>
            <span>Subtotal</span>
            <span>{formatPrice(computedTotal)}</span>
          </div>
          <div className="flex justify-between text-xs text-ink mb-4" style={{ fontFamily: "var(--font-stamp)" }}>
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <hr className="border-t border-[#c8b090]/50 my-4" />
          <div className="flex items-baseline justify-between mb-6" style={{ fontFamily: "var(--font-display)" }}>
            <span className="text-2xl font-bold text-ink">Total</span>
            <span className="text-[26px] font-bold text-ink">{formatPrice(computedTotal)}</span>
          </div>
          <Link href="/checkout" className="w-full bg-[#3d1208] text-cream hover:bg-[#2c0d06] transition-colors py-3.5 text-center uppercase tracking-wider text-xs font-bold block rounded-[4px]" style={{ fontFamily: "var(--font-stamp)" }}>
            PROCEED TO CHECKOUT
          </Link>
        </aside>
      </div>
    </div>
  );
}
