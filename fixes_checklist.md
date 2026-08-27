# Notebloom Audit Remediation Checklist

This checklist tracks the fixes required for the Notebloom application, grouped by priority.

## 🚨 Phase 1: Critical Security & Authorization Fixes (Launch Blocking)

- [ ] **1.1 Restrict Anonymous Order Enumeration & Guest Access Cookie Grant**
  - **File:** `src/app/api/orders/[id]/status/route.ts` (Lines 30–42)
  - **Issue:** Ownership check only runs if a session exists. Unauthenticated requests bypass the checks entirely and get a guest cookie.
  - **Fix:** Update authorization logic to reject unauthenticated requests that lack a valid guest cookie or admin session.

- [ ] **1.2 Remove or Secure Unauthenticated Order Confirmation GET Route**
  - **File:** `src/app/api/orders/[id]/confirm/route.ts` (Lines 17–21)
  - **Issue:** GET route confirms orders and grants cookies with no verification.
  - **Fix:** Delete the route or add session verification to ensure only admins can confirm orders manually.

- [ ] **1.3 Enforce Webhook Signature Verification & Secure Order Matching**
  - **File:** `src/app/api/webhook/whatsapp/route.ts` (Lines 58–95)
  - **Issue:** Twilio signature checks can be skipped if missing credentials/headers. Orders are matched solely by phone number, allowing order spoofing/cancellations.
  - **Fix:** Enforce verification in production, and require order codes (e.g. `confirm NB-XXXX`) instead of simple yes/no.

- [ ] **1.4 Prevent Overselling with Atomic Stock Decrementing**
  - **File:** `src/lib/db.ts` (Lines 954–983)
  - **Issue:** Non-atomic stock decrementing allows race conditions under concurrent load.
  - **Fix:** Update db decrement query:
    ```sql
    UPDATE books SET stock = stock - ${it.quantity} WHERE id = ${it.book_id} AND stock >= ${it.quantity} RETURNING id
    ```

---

## ⚠️ Phase 2: High-Severity Validation, Race Conditions & Dependency Fixes

- [ ] **2.1 Validate Guest Cart Cookie Quantities**
  - **File:** `src/app/actions/cart-actions.ts` (Lines 236–265)
  - **Issue:** Cookies can be modified client-side to order negative or non-integer amounts.
  - **Fix:** Validate parsed quantities to verify they are positive integers and don't exceed stock.

- [ ] **2.2 Eliminate Race Condition in Add-to-Cart Stock Capping**
  - **File:** `src/lib/db.ts` (Lines 779–815)
  - **Issue:** Stock capping uses static pre-fetched available stock value in the conflict clause.
  - **Fix:** Use subqueries to read current stock atomically during conflict updates.

- [ ] **2.3 Prevent Server Crashes on Invalid (NaN) Product IDs**
  - **File:** `src/app/shop/[id]/page.tsx` (Lines 18–20)
  - **Issue:** Non-numeric IDs trigger database errors causing 500 crashes instead of 404.
  - **Fix:** Check `Number.isInteger(bookId)` and return `notFound()` if invalid.

- [ ] **2.4 Upgrade Vulnerable next and postcss Dependencies**
  - **File:** `package.json`
  - **Issue:** Known security vulnerabilities in Next.js Server Actions (SSRF/DoS) and PostCSS.
  - **Fix:** Run `npm install next@latest` and `npm update postcss sharp`.

---

## 🛠️ Phase 3: Medium-Severity Robustness, UI & Hygiene Fixes

- [ ] **3.1 Secure & Sign Guest Order Access Cookies**
  - **File:** `src/app/api/orders/[id]/status/route.ts` and `src/app/actions/cart-actions.ts`
  - **Issue:** Guest cookies store plain text values, making them trivial to forge.
  - **Fix:** Store signed HMAC tokens to authenticate guest order access.

- [ ] **3.2 Sanitize File Upload Slugs against Path Traversal**
  - **File:** `src/app/actions/admin-actions.ts` (Line 42)
  - **Issue:** Media slug generator does not remove path traversal characters.
  - **Fix:** Apply alphanumeric regex sanitization to the filename slug.

- [ ] **3.3 Fix Mobile Text Overlap & Touch Targets on Admin Order Rows**
  - **File:** `src/app/admin/orders/page.tsx` (Lines 30–59)
  - **Issue:** Table columns overlap on 375px widths and touch targets are under 44px.
  - **Fix:** Use responsive column wrapping classes and increase padding.

- [ ] **3.4 Implement Background Error Handling for Notifications**
  - **File:** `src/app/actions/cart-actions.ts` and `src/lib/db.ts`
  - **Issue:** Failed notifications are swallowed without retry mechanisms.
  - **Fix:** Use a transaction outbox queue or background scheduler (like Inngest) with automated retries.

- [ ] **3.5 Add Startup Environment Variable Validation**
  - **File:** `src/lib/db.ts` and `src/lib/whatsapp.ts`
  - **Issue:** Missing API secrets or DB credentials fall back to defaults, failing silently at runtime.
  - **Fix:** Use Zod schemas to parse and validate required keys on server boot.

---

## 🎨 Phase 4: UI Enhancements & Polish (Low Severity)

- [ ] **4.1 Add Form Disable & Pending Spinners on Checkout Action**
  - **File:** `src/app/checkout/CheckoutClient.tsx`
  - **Issue:** Form buttons remain active and clickable while submit actions run.
  - **Fix:** Disable submit controls and display spinners using React 19 `useFormStatus()`.


Notebloom Remediation & Fixes Checklist
This document is a comprehensive, prioritized checklist of every issue identified in the audit that needs to be fixed in the Notebloom Next.js 16 e-commerce app. Each task includes checkboxes, severity ratings, target file paths, and exact remediation instructions.

🚨 Phase 1: Critical Security & Authorization Fixes (Launch Blocking)
 1.1 Restrict Anonymous Order Enumeration & Guest Access Cookie Grant

Severity: CRITICAL
File: 
route.ts
Issue: if (session?.user?.id && Number(session.user.id) !== order.user_id) skips authorization for unauthenticated users (!session?.user?.id) and grants a guest access cookie on any request.
Fix: Replace lines 30-37 with explicit authorization checks:
typescript

const session = await auth();
const cookieStore = await cookies();
const hasGuestAccess = cookieStore.get(`guest_order_access_${order.id}`)?.value === "true";
const isOwner = session?.user?.id && Number(session.user.id) === order.user_id;
const isAdmin = session?.user?.isAdmin;
if (!isOwner && !isAdmin && !hasGuestAccess) {
  return NextResponse.json({ error: "Forbidden: Unauthorized access to order details" }, { status: 403 });
}
 1.2 Remove or Secure Unauthenticated Order Confirmation GET Route

Severity: CRITICAL
File: 
route.ts
Issue: /api/orders/[id]/confirm is publicly accessible via GET and immediately confirms any order ID while granting a guest access cookie.
Fix: Either remove /api/orders/[id]/confirm/route.ts entirely (relying solely on admin actions or WhatsApp webhook confirmation) or protect it with an admin session guard:
typescript

const session = await auth();
if (!session?.user?.isAdmin) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
 1.3 Enforce WhatsApp Webhook Signature Verification & Secure Order Matching

Severity: CRITICAL
File: 
route.ts
Issue: Twilio signature verification can be bypassed if tokens are unset, and orders are matched solely by the last 10 digits of the sender's phone number, allowing attackers to cancel others' orders.
Fix:
Make signature verification mandatory in production:
typescript

if (process.env.NODE_ENV === "production" && !isValid) {
  return NextResponse.json({ error: "Invalid Twilio signature" }, { status: 403 });
}
Require users to reply with an order code (e.g., confirm NB-1234 or cancel NB-1234) rather than just confirm or cancel.
 1.4 Prevent Overselling with Atomic Stock Decrementing

Severity: CRITICAL
File: 
db.ts
Issue: Stock check and stock decrement occur in separate queries without conditional transaction guards, enabling concurrent overselling.
Fix: Modify the stock update query inside placeOrder to check available stock atomically:
typescript

const updateRes = await sql`
  UPDATE books 
  SET stock = stock - ${it.quantity} 
  WHERE id = ${it.book_id} AND stock >= ${it.quantity}
  RETURNING id
`;
if (updateRes.length === 0) {
  throw new Error(`Insufficient stock for "${it.title}" during checkout.`);
}
⚠️ Phase 2: High-Severity Validation, Race Conditions & Dependency Fixes
 2.1 Validate Guest Cart Cookie Quantities

Severity: HIGH
File: 
cart-actions.ts
Issue: Guest cart items parsed from the notebloom_cart cookie accept arbitrary or negative quantities without server-side validation.
Fix: Validate parsed cookie quantities in checkoutAction before calculating totals:
typescript

const cleanQuantity = Number.isInteger(item.quantity) && item.quantity > 0 
  ? Math.min(item.quantity, book.stock) 
  : 1;
 2.2 Eliminate Race Condition in Add-to-Cart Stock Capping

Severity: HIGH
File: 
db.ts
Issue: addToCart calculates availableStock before the query and uses static LEAST(${availableStock}, ...) in INSERT ON CONFLICT.
Fix: Reference the database row directly in the update clause:
sql

ON CONFLICT (user_id, book_id, color) 
DO UPDATE SET quantity = LEAST((SELECT stock FROM books WHERE id = EXCLUDED.book_id), cart_items.quantity + EXCLUDED.quantity)
 2.3 Prevent Server Crashes on Invalid (NaN) Product IDs

Severity: HIGH
File: 
page.tsx
Issue: Number(id) is passed to PostgreSQL without validation, causing a 500 database syntax crash when visiting non-numeric URLs like /shop/abc.
Fix: Add a validation guard before querying the database:
typescript

const bookId = Number(id);
if (!Number.isInteger(bookId) || bookId <= 0) {
  notFound();
}
 2.4 Upgrade Vulnerable Next.js & PostCSS Dependencies

Severity: HIGH
File: 
package.json
Issue: npm audit reveals 6 high-severity vulnerabilities in next (<16.2.12), postcss (<8.5.17), and sharp.
Fix: Run the following terminal commands to update packages:
bash

npm install next@latest
npm update postcss sharp
🛠️ Phase 3: Medium-Severity Robustness, UI & Hygiene Fixes
 3.1 Secure & Sign Guest Order Access Cookies

Severity: MEDIUM
File: 
route.ts
 and 
cart-actions.ts
Issue: guest_order_access_${orderId} cookies store "true" in plaintext, making them forgeable.
Fix: Use an HMAC-signed token as the cookie value and enable security flags:
typescript

const token = crypto.createHmac("sha256", process.env.AUTH_SECRET!).update(String(orderId)).digest("hex");
cookieStore.set(`guest_order_access_${orderId}`, token, {
  maxAge: 86400 * 7,
  path: "/",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
});
 3.2 Sanitize File Upload Slugs against Path Traversal

Severity: MEDIUM
File: 
admin-actions.ts
Issue: Upload filename generation allows special characters that could introduce path traversal in Blob storage.
Fix: Use a strict alphanumeric regex replace:
typescript

const sanitizedSlug = titleSlug.replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase();
 3.3 Fix Mobile Text Overlap & Touch Targets on Admin Order Rows

Severity: MEDIUM
File: 
page.tsx
 and 
page.tsx
Issue: On 375px mobile screens, order rows overlap because they lack responsive flex stacking, and back links are smaller than 44x44px.
Fix:
Update order rows to stack on small screens: className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
Ensure interactive links have sufficient touch target dimensions: className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center ..."
 3.4 Implement Background Error Handling for Notifications

Severity: MEDIUM
File: 
cart-actions.ts
 and 
db.ts
Issue: Email and WhatsApp notification failures are swallowed by console.error without retry mechanisms.
Fix: Add a database outbox table (notification_queue) or integrate a background job scheduler (such as Inngest or Upstash QStash) to automatically retry failed transactional alerts.
 3.5 Add Startup Environment Variable Validation

Severity: MEDIUM
File: 
db.ts
 and 
whatsapp.ts
Issue: Missing required API keys or secrets fall back to empty strings, causing silent runtime failures later.
Fix: Create src/lib/env.ts using Zod to validate required environment variables at server boot:
typescript

import { z } from "zod";
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string().min(32),
  TWILIO_AUTH_TOKEN: z.string().optional(),
});
export const env = envSchema.parse(process.env);
🎨 Phase 4: UI Enhancements & Polish (Low Severity)
 4.1 Add Form Disable & Pending Spinners on Checkout Action
Severity: LOW
File: 
CheckoutClient.tsx
Issue: Checkout buttons do not disable interactive controls while the server action is running.
Fix: Wrap the submit button in a component using const { pending } = useFormStatus(); to disable submission and show an inline loading state.