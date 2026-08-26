"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, User, MapPin, Phone, Download } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { MegaMenu } from "./MegaMenu";
import { useCart } from "@/lib/services/cart-context";
import { useEffect, useState } from "react";

export function Header() {
  const { cartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full flex flex-col relative z-40 bg-white">
      {/* Top Utility Bar */}
      <div className="bg-muted text-muted-foreground py-1.5 text-xs">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="flex items-center hover:text-primary transition-colors">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              <span>Select Delivery Location</span>
            </button>
            <span className="hidden sm:inline-block w-px h-3 bg-border"></span>
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
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative w-48 h-12">
              <Image
                src="/logo.jpg.jpeg"
                alt="CareFirst Pharmacy"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Search Bar - Center */}
          <div className="flex-1 min-w-[280px] px-4 md:px-8 order-3 md:order-2">
            <SearchBar />
          </div>

          {/* Action Icons - Right */}
          <div className="flex items-center space-x-6 flex-shrink-0 order-2 md:order-3">
            <Link href="/account" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
              <User className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium uppercase mt-1">Account</span>
            </Link>
            <Link href="/wishlist" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors relative">
              <Heart className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium uppercase mt-1">Wishlist</span>
            </Link>
            <Link href="/cart" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors relative">
              <ShoppingCart className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium uppercase mt-1">Cart</span>
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation - Bottom */}
      <MegaMenu />
    </header>
  );
}
