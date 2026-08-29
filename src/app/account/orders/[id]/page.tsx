import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getOrdersForUser, getOrderItems, formatPrice, getOrder } from "@/lib/db";
import BookCover from "@/components/BookCover";
import BloomMark from "@/components/BloomMark";
import { cookies } from "next/headers";
import { hasValidGuestOrderAccess } from "@/lib/security";
import Confetti from "@/components/Confetti";
import CancelOrderButton from "@/components/CancelOrderButton";
import SaveGuestOrder from "@/components/SaveGuestOrder";

export default async function OrderDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ new?: string }>;
}) {
  const session = await auth();
  const { id } = await params;
  const orderId = Number(id);

  const { new: isNew } = await searchParams;
  const showConfetti = isNew === "true";

  const cookieStore = await cookies();
  const hasGuestAccess = hasValidGuestOrderAccess(cookieStore, orderId);

  let order;

  if (session?.user?.id) {
    const userOrders = await getOrdersForUser(Number(session.user.id));
    order = userOrders.find((o) => o.id === orderId);
  } else if (hasGuestAccess) {
    order = await getOrder(orderId);
  }

  if (!order) redirect("/orders");

  const isGuest = !session?.user?.id;
  const items = await getOrderItems(orderId);
  const orderCode = (order as any).order_code ?? `#${order.id}`;

  const statusConfig: Record<string, { color: string; bg: string; icon: string; heading: string }> = {
    Pending: { color: "text-amber-700", bg: "bg-amber-100", icon: "⏳", heading: "We've received your order!" },
    Confirmed: { color: "text-emerald-700", bg: "bg-emerald-100", icon: "✅", heading: "Order confirmed — it's on its way to you." },
    Processing: { color: "text-blue-700", bg: "bg-blue-100", icon: "📦", heading: "Your order is being processed." },
    Shipped: { color: "text-indigo-700", bg: "bg-indigo-100", icon: "🚚", heading: "Your order is on the way!" },
    "Out for Delivery": { color: "text-purple-700", bg: "bg-purple-100", icon: "🛵", heading: "Out for delivery!" },
    Delivered: { color: "text-emerald-700", bg: "bg-emerald-100", icon: "💊", heading: "Delivered — thank you for choosing Carefirst!" },
    Cancelled: { color: "text-red-700", bg: "bg-red-100", icon: "❌", heading: "This order was cancelled." },
  };

  const cfg = statusConfig[order.status] || statusConfig.Pending;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      {showConfetti && <Confetti />}
      <SaveGuestOrder orderId={orderId} orderCode={orderCode} clearCart={showConfetti} />

      <div className="text-center mb-10">
        <p
          className="text-xs tracking-[0.22em] uppercase text-primary font-bold mb-2"
        >
          Order {orderCode}
        </p>
        <h1
          className="text-3xl font-bold text-gray-900"
        >
          {cfg.heading}
        </h1>
        <p className="text-gray-500 mt-2">
          {new Date(order.created_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-xs uppercase text-gray-500 font-semibold">Status:</span>
          <span
            className={`text-xs uppercase font-bold px-3 py-1 rounded-full ${cfg.color} ${cfg.bg}`}
          >
            {cfg.icon} {order.status}
          </span>
        </div>
      </div>

      {order.status === "Pending" && (
        <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">📞</span>
            <div className="flex-1">
              <p className="font-semibold text-amber-900 mb-1">
                We'll be in touch soon!
              </p>
              <p className="text-sm text-amber-800 leading-relaxed">
                Our team will give you a call shortly to confirm your prescription and arrange delivery. Please keep your phone handy.
              </p>
              <p className="text-xs text-amber-600 mt-2">
                If you have urgent inquiries, feel free to reach our pharmacist support.
              </p>
              <div className="mt-3 border-t border-amber-200/50 pt-3">
                <CancelOrderButton orderId={orderId} isGuest={isGuest} />
              </div>
            </div>
          </div>
        </div>
      )}

      {order.status === "Confirmed" && (
        <div className="mb-8 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">🎉</span>
            <div>
              <p className="font-semibold text-emerald-900 mb-1">
                Order confirmed!
              </p>
              <p className="text-sm text-emerald-800 leading-relaxed">
                Thank you! Your medicines are now being packed and prepared for dispatch. We'll notify you when they are dispatched.
              </p>
            </div>
          </div>
        </div>
      )}

      {order.status === "Cancelled" && (
        <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">❌</span>
            <div>
              <p className="font-semibold text-red-900 mb-1">
                Order cancelled
              </p>
              <p className="text-sm text-red-800 leading-relaxed">
                This order was cancelled. If this was a mistake, you can place a new order from our store.
              </p>
            </div>
          </div>
        </div>
      )}

      {order.status === "Processing" && (
        <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">📦</span>
            <div>
              <p className="font-semibold text-blue-900 mb-1">
                Order processing
              </p>
              <p className="text-sm text-blue-800 leading-relaxed">
                Our pharmacy team is carefully packing your items. You'll receive tracking updates once it's on the road!
              </p>
            </div>
          </div>
        </div>
      )}

      {order.status === "Shipped" && (
        <div className="mb-8 rounded-lg border border-indigo-200 bg-indigo-50 p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">🚚</span>
            <div>
              <p className="font-semibold text-indigo-900 mb-1">
                Order shipped!
              </p>
              <p className="text-sm text-indigo-800 leading-relaxed">
                Your order is on the way with our express courier service.
              </p>
            </div>
          </div>
        </div>
      )}

      {order.status === "Out for Delivery" && (
        <div className="mb-8 rounded-lg border border-purple-200 bg-purple-50 p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">🛵</span>
            <div>
              <p className="font-semibold text-purple-900 mb-1">
                Out for delivery!
              </p>
              <p className="text-sm text-purple-800 leading-relaxed">
                Your medicines are out with the rider today. Please ensure someone is available at the delivery address.
              </p>
            </div>
          </div>
        </div>
      )}

      {order.status === "Delivered" && (
        <div className="mb-8 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">💊</span>
            <div>
              <p className="font-semibold text-emerald-900 mb-1">
                Order delivered!
              </p>
              <p className="text-sm text-emerald-800 leading-relaxed">
                Your order has been delivered. Thank you for choosing Carefirst Pharmacy for your healthcare needs!
              </p>
            </div>
          </div>
        </div>
      )}

      <ul className="divide-y divide-ink/10 mb-8">
        {items.map((item) => (
          <li key={item.id} className="py-4 flex gap-4">
            <div className="w-12 shrink-0">
              <BookCover
                title={item.title}
                author={item.author}
                genre=""
                seed={item.cover_seed}
                className="w-full h-auto rounded-xl ring-1 ring-ink/10"
                sizes="48px"
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold leading-snug" style={{ fontFamily: "var(--font-body)" }}>
                {item.title}
              </p>
              <p className="text-sm text-ink-soft">
                {item.author} · Qty {item.quantity} {item.color ? `· Color: ${item.color}` : ""}
              </p>
              {order.status === "Delivered" && item.book_id && (
                <div className="mt-2">
                  <Link
                    href={`/shop/${item.book_id}/review?orderId=${order.id}&code=${order.order_code}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-moss/10 hover:bg-moss/20 text-moss text-xs font-semibold uppercase tracking-wider transition-colors"
                    style={{ fontFamily: "var(--font-stamp)" }}
                  >
                    ✍️ Review Product
                  </Link>
                </div>
              )}
            </div>
            <div style={{ fontFamily: "var(--font-stamp)" }}>
              {formatPrice(item.price_cents * item.quantity)}
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between text-lg font-semibold pt-4 border-t border-ink/10 mb-10">
        <span>Total</span>
        <span style={{ fontFamily: "var(--font-stamp)" }}>{formatPrice(order.total_cents)}</span>
      </div>

      <div className="text-center">
        <Link href="/shop" className="trail-link text-oxblood">
          Keep browsing
        </Link>
      </div>
    </div>
  );
}