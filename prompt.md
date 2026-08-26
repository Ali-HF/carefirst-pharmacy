PROJECT: CareFirst Pharmacy — Online Pharmacy & Healthcare Storefront (Frontend Only, Phase 1)

GOAL
Build a production-quality Next.js frontend for an online pharmacy/health-and-wellness
e-commerce store called "CareFirst Pharmacy", matching the reference site www.dvago.pk
as closely as possible in LAYOUT, STRUCTURE, and INTERACTION DESIGN: the same header/
mega-menu arrangement, the same homepage section order and rhythm (utility bar, hero
carousel, "shop by condition" grid, multiple product carousels, category tile grid,
brand strip, footer), the same spacing scale, grid density, card layout, breadcrumb
and filter patterns on listing pages, and the same PDP/cart/checkout structure. Rebuild
these as original code — do not copy dvago.pk's actual HTML/CSS/JS or fetch its assets
— but the finished layout should feel structurally like a near-1:1 clone.

Where this does NOT extend: brand identity. Use CareFirst Pharmacy's own name, its own
placeholder logo/wordmark, and its own color palette (see BRANDING below) rather than
dvago's brand green or logo shape — copying a live competitor's exact visual identity
in the same market risks trade dress / passing-off issues on top of being an easy way
for the site to get taken down. Everything else — spacing, layout, component behavior,
page flow — should track the reference site tightly.

This is Phase 1: frontend only, statically deployed to GitHub Pages. Phase 2 (later,
not now) will bolt on a real backend, database-driven catalog, authentication, and a
live order/payment flow — so architect the frontend now with clean seams for that.

TECH STACK
- Next.js (latest stable), App Router, TypeScript
- Tailwind CSS for styling
- next/image for image handling (configure for static export — unoptimized: true)
- React Context (or Zustand) for cart + wishlist state — client-side only for now
- next.config.js set up for static export: output: 'export', trailingSlash: true,
  images.unoptimized: true, and a basePath/assetPrefix if the GitHub Pages repo is
  served from a /repo-name/ subpath
- Include a GitHub Actions workflow (.github/workflows/deploy.yml) that builds and
  publishes the `out/` directory to the gh-pages branch / GitHub Pages on push to main
- ESLint + Prettier configured
- Mock data lives in a typed /data or /lib/mock-data directory as JSON/TS modules,
  accessed only through a thin service layer (e.g. /lib/services/products.ts) so
  swapping mock data for real API calls later means editing one file per domain,
  not every component

BRANDING
- Site name: CareFirst Pharmacy
- Tagline (placeholder, feel free to refine): "Your Trusted Health Partner"
- Color palette: pick an original palette distinct from any real pharmacy brand —
  suggest a calm clinical teal/blue as primary with a warm accent (e.g. coral or
  amber) for CTAs and badges. Define this as Tailwind theme tokens, not hardcoded hex.
- Logo: use a simple original text/wordmark placeholder logo (e.g. a rounded cross
  or leaf icon + "CareFirst Pharmacy" wordmark) built in SVG/React — I will swap in
  a final logo file later. Do not attempt to reproduce any other pharmacy's logo.
- Typography: a clean, accessible sans-serif (e.g. Inter or similar via next/font)

LAYOUT FIDELITY TARGETS (match these structurally, restyle with CareFirst's palette)
- Header: two-row structure — slim top utility bar, then main row with logo left,
  full-width search center, account/wishlist/cart icons right, mega-menu row below
- Mega-menu: hover/click-to-expand multi-column panel per top-level category, with
  a third-level flyout for subcategories that have their own children
- Homepage section order: promo carousel → "shop by condition" icon row → first
  product carousel → second product carousel → third product carousel → category
  tile grid → brand logo strip → footer — same order, same carousel arrow/dot style
- Product card: image, category eyebrow tag, name (2-line clamp), strikethrough
  original price next to discounted price, quantity/add-to-cart control in the
  same position (bottom of card, full-width on hover/mobile)
- Listing page: left filter rail + breadcrumb + sort bar above a dense grid,
  matching column counts at each breakpoint
- Footer: same multi-column sitemap layout, app-badge row, payment-icon row,
  bottom copyright bar

SITE MAP / PAGES
1. Home (/)
   - Top utility bar: delivery location selector, help/contact line, download-app CTA
   - Sticky header: logo, search bar (with placeholder autocomplete), account icon,
     wishlist icon, cart icon with item-count badge
   - Mega-menu category navigation (multi-level: Category > Subcategory > Condition),
     mirroring a real pharmacy taxonomy — e.g. Medicine, Baby & Mother Care,
     Nutrition & Supplements, Foods & Beverages, Devices & Support, Personal Care,
     OTC & Health Needs — each with nested subcategories (build this as a config-driven
     tree in /data/categories.ts so it's easy to edit)
   - Hero/promo banner carousel (image placeholders, dummy links)
   - "Shop by Condition" icon grid
   - Multiple horizontal product carousels ("Featured Products", "New Arrivals",
     "Best Sellers", etc.), each product card showing image, name, category tag,
     price with strikethrough original price + discount %, "Add to Cart" button
   - Category tile grid (Beauty Care, New Arrival, Under Rs.499, Multivitamins, etc.)
   - Brand logo strip
   - Footer: sitemap-style link columns, social links, app download badges,
     payment method icons, copyright

2. Category / Listing page (/category/[slug])
   - Left sidebar filters (price range, brand, in-stock) — UI only for now
   - Breadcrumb trail
   - Sort dropdown (price, popularity, newest)
   - Responsive product grid with pagination or "load more"

3. Product Detail page (/product/[slug])
   - Image gallery, name, brand, pack size/variant selector, price + discount,
     stock status, quantity stepper, Add to Cart + Buy Now, tabs for
     Description / How to Use / Safety Info, related products carousel

4. Search results page (/search?q=)

5. Cart page (/cart)
   - Line items with quantity controls, remove, price summary, promo code input
     (UI only), delivery threshold messaging ("Free delivery over Rs. X"),
     checkout CTA

6. Wishlist page (/wishlist)

7. Checkout flow skeleton (/checkout)
   - Multi-step UI: delivery address form, delivery slot selection, payment method
     selection (cash on delivery / card placeholder), order review, place-order
     confirmation screen (/checkout/confirmation) — no real payment processing yet,
     just the UI and client-side state flow, structured so a real payment gateway
     and order API can be dropped in later

8. Auth placeholder pages (/login, /signup, /account)
   - Forms with client-side validation only for now (no real backend auth yet)
   - /account should have a stubbed dashboard shell: order history (empty state),
     saved addresses (empty state), profile info — built so it's obvious where
     real session data will later be injected

9. Static informational pages: /about, /contact, /prescription-upload (UI only,
   file-picker placeholder)

CART & WISHLIST STATE
- Implement with React Context + useReducer (or Zustand if you prefer), persisted
  to localStorage for now so it survives refresh
- Expose a clean hook API (useCart(), useWishlist()) so components never touch
  the store directly — this is the seam that gets swapped for real backend cart
  sync in Phase 2

COMPONENT LIST (build as reusable, typed components)
Header, MegaMenu, SearchBar, Footer, ProductCard, ProductCarousel, CategoryTile,
PromoBannerCarousel, PriceTag (handles discount display), QuantityStepper,
Breadcrumbs, FilterSidebar, EmptyState, Badge, Button, Input, Modal/Drawer
(for mobile cart preview)

RESPONSIVE / MOBILE
Mobile-first. Header collapses to hamburger + mega-menu becomes a slide-out drawer.
Product grids reflow to 2 columns on mobile. This matters — assume most traffic
will be mobile, same as real pharmacy e-commerce traffic in Pakistan.

DELIVERABLE STRUCTURE
/app
  /(storefront)/page.tsx            → home
  /(storefront)/category/[slug]/page.tsx
  /(storefront)/product/[slug]/page.tsx
  /(storefront)/search/page.tsx
  /(storefront)/cart/page.tsx
  /(storefront)/wishlist/page.tsx
  /(storefront)/checkout/page.tsx
  /(storefront)/checkout/confirmation/page.tsx
  /(storefront)/login/page.tsx
  /(storefront)/signup/page.tsx
  /(storefront)/account/page.tsx
  /(storefront)/about/page.tsx
  /(storefront)/contact/page.tsx
/components/...
/data/categories.ts, /data/products.ts (typed mock data, 30-50 realistic
  placeholder SKUs across the category tree so pages don't look empty)
/lib/services/... (data-access layer, cart context, hooks)
/public/... (placeholder logo, icons, banner images — use free/original SVGs or
  simple generated placeholders, not scraped images)

DO
- Keep every "backend-shaped" seam obvious (service layer functions, typed
  interfaces for Product/Category/CartItem/Order/User) so plugging in a real
  API or database in Phase 2 is a matter of implementing those functions, not
  rewriting components
- Write clean, typed, componentized code — this needs to survive a backend
  migration, not be throwaway
- Make it deploy cleanly to GitHub Pages via `next build` static export on first try

DON'T
- Don't copy dvago.pk's actual source code, CSS, or fetch/hotlink its image
  assets — rebuild the layout as original code
- Don't reuse dvago's logo, brand green, or exact page copy — layout structure
  should track the reference closely, brand identity should not
- Don't wire up any real payment, SMS, or auth provider yet — Phase 1 is UI +
  client-side state only
- Don't hardcode data inline in components — always go through /data + the
  service layer