import Link from "next/link";
import { auth } from "@/lib/auth";
import { cartCount } from "@/lib/db";
import Logo from "./Logo";
import { logoutAction } from "@/app/actions/auth-actions";
import LogoutButton from "./LogoutButton";
import { cookies } from "next/headers";
import MobileMenu from "./MobileMenu";
import CartBadge from "./CartBadge";
import { MapPin, Phone, Download, Search, User } from "lucide-react";
import MarqueeBanner from "./MarqueeBanner";

export default async function Header() {
  const session = await auth();

  let count = 0;
  if (session?.user?.id) {
    count = await cartCount(Number(session.user.id));
  } else {
    try {
      const cookieStore = await cookies();
      const cartCookie = cookieStore.get("carefirst_cart")?.value;
      if (cartCookie) {
        const parsed = JSON.parse(cartCookie);
        if (Array.isArray(parsed)) {
          count = parsed.reduce((sum, item: any) => sum + (Number(item.quantity) || 0), 0);
        }
      }
    } catch (e) {
      // ignore
    }
  }

  return (
    <header className="w-full flex flex-col relative z-40 bg-white">
      <MarqueeBanner />
      {/* Top Utility Bar */}
      <div className="bg-gray-100 text-gray-500 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="flex items-center hover:text-primary transition-colors">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              <span>Select Delivery Location</span>
            </button>
            <span className="hidden sm:inline-block w-px h-3 bg-gray-300"></span>
            <a href="tel:111-222-333" className="hidden sm:flex items-center hover:text-primary transition-colors">
              <Phone className="w-3.5 h-3.5 mr-1" />
              <span>Help & Support: 111-222-333</span>
            </a>
          </div>
          <div className="flex items-center">
            <a href="#" className="flex items-center text-primary font-medium hover:text-primary-dark transition-colors">
              <Download className="w-3.5 h-3.5 mr-1" />
              <span>Download App</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Search Bar - Center */}
          <form action="/shop" className="flex-1 min-w-[280px] px-4 md:px-8 order-3 md:order-2">
            <div className="relative flex items-center w-full">
              <label htmlFor="header-search" className="sr-only">
                Search for medicines, vitamins...
              </label>
              <input
                id="header-search"
                name="q"
                type="search"
                placeholder="Search for medicines, vitamins..."
                className="w-full rounded-md border border-gray-300 bg-gray-50 pl-4 pr-12 py-2.5 text-sm
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <button 
                type="submit" 
                className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Action Icons - Right */}
          <nav className="flex items-center space-x-6 flex-shrink-0 order-2 md:order-3">
            
            {session?.user ? (
              <Link href="/account" className="flex flex-col items-center text-gray-500 hover:text-primary transition-colors">
                <User className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium uppercase mt-1">Account</span>
              </Link>
            ) : (
              <Link href="/signup" className="flex flex-col items-center text-gray-500 hover:text-primary transition-colors">
                <User className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium uppercase mt-1">Sign In</span>
              </Link>
            )}

            {/* Cart — desktop */}
            <Link href="/cart" className="relative hidden sm:flex flex-col items-center text-gray-500 hover:text-primary transition-colors" aria-label="Cart">
              <CartIcon />
              <span className="text-[10px] font-medium uppercase mt-1">Cart</span>
              <CartBadge initialCount={count} />
            </Link>

            {/* Cart icon — mobile only */}
            <Link href="/cart" className="relative sm:hidden flex flex-col items-center text-gray-500" aria-label="Cart">
              <CartIcon />
              <div className="absolute -top-2 -right-2">
                <CartBadge initialCount={count} />
              </div>
            </Link>

            <MobileMenu session={session} />
          </nav>
        </div>
      </div>

      {/* Navigation - Bottom */}
      <nav className="bg-[#0c2a4d] text-white hidden md:block border-t border-[#163c66]">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-2">
            {["Medicine", "Vitamins", "Personal Care", "Devices", "Baby & Mother", "Herbal"].map(cat => (
              <li key={cat}>
                <Link
                  href={`/shop?genre=${encodeURIComponent(cat)}`}
                  className="flex items-center py-2.5 px-3.5 text-sm font-semibold tracking-wide text-gray-100 hover:text-primary hover:bg-[#163c66] rounded-md transition-colors"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 8h14l-1.2 10.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M9 8a3 3 0 0 1 6 0" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}