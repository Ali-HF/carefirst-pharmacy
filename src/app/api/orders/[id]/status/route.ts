import { NextResponse } from "next/server";
import { getOrder, getOrderByCode, getOrderItems } from "@/lib/db";
import { auth } from "@/lib/auth";
import { cookies } from "next/headers";
import { hasValidGuestOrderAccess, setGuestOrderCookie } from "@/lib/security";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  let order;
  const isAlphanumericCode = id.toUpperCase().startsWith("NB-");

  if (isAlphanumericCode) {
    order = await getOrderByCode(id);
  } else {
    const orderId = Number(id);
    if (!Number.isNaN(orderId)) {
      order = await getOrder(orderId);
    }
  }

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const session = await auth();
  const cookieStore = await cookies();
  const hasGuestAccess = hasValidGuestOrderAccess(cookieStore, order.id);
  const isOwner = session?.user?.id && Number(session.user.id) === order.user_id;
  const isAdmin = session?.user?.isAdmin;

  if (!isOwner && !isAdmin && !hasGuestAccess) {
    return NextResponse.json({ error: "Forbidden: Unauthorized access to order details" }, { status: 403 });
  }

  const items = await getOrderItems(order.id);

  // Re-issue or refresh signed guest access cookie on this device
  setGuestOrderCookie(cookieStore, order.id);

  return NextResponse.json({
    id: order.id,
    order_code: order.order_code,
    status: order.status,
    total_cents: order.total_cents,
    created_at: order.created_at,
    payment_method: order.payment_method,
    items: items.map((item) => ({
      title: item.title,
      author: item.author,
      quantity: item.quantity,
      price_cents: item.price_cents,
    })),
  });
}
