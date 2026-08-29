"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GENRES } from "@/lib/constants";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-100 mt-auto border-t border-gray-800">
      {/* Main Footer Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-gray-800">
          
          {/* Column 1: About Carefirst Pharmacy (Logo & Story) - Span 5 */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary">
              <div className="relative h-12 w-48 shrink-0">
                <Image
                  src="/logo-transparent.png"
                  alt="Carefirst Pharmacy Logo"
                  fill
                  priority
                  className="object-contain object-left"
                  style={{ filter: "brightness(0) invert(0.95)" }}
                />
              </div>
            </Link>
            
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-wider text-primary uppercase">
                About Carefirst
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-md">
                Carefirst Pharmacy is committed to delivering authentic healthcare products right to your doorstep. We curate a wide selection of medicines, personal care items, and wellness devices to help you and your family stay healthy.
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links (Browse Categories) - Span 2 */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-bold tracking-widest uppercase text-primary">
              Browse
            </h3>
            <ul className="space-y-2 text-sm text-parchment/80">
              {GENRES.slice(0, 5).map((g) => (
                <li key={g}>
                  <Link href={`/shop?genre=${encodeURIComponent(g)}`} className="hover:text-primary transition-colors text-gray-400">
                    {g}
                  </Link>
                </li>
              ))}
              {GENRES.length > 5 && (
                <li>
                  <Link href="/shop" className="hover:text-primary transition-colors font-medium text-primary">
                    View All Categories →
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Customer Care / Info - Span 2 */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-bold tracking-widest uppercase text-primary">
              Shop & Info
            </h3>
            <ul className="space-y-2 text-sm text-gray-400 font-body">
              <li>
                <Link href="/shop" className="hover:text-primary transition-colors">All products</Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-primary transition-colors">Your Cart</Link>
              </li>
              <li>
                <span className="text-gray-600 cursor-not-allowed">FAQ & Help</span>
              </li>
              <li>
                <span className="text-gray-600 cursor-not-allowed">Shipping & Returns</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact - Span 3 */}
          <div className="md:col-span-3 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-widest uppercase text-primary">
                Stay Inspired
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Subscribe for health tips, exclusive offers, and updates on new wellness products.
              </p>
              
              {subscribed ? (
                <div className="bg-green-900/50 border border-green-800 text-green-100 text-xs p-3 rounded-md">
                  ✓ Thank you! You've been subscribed to our newsletter.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                  <input
                    type="email"
                    required
                    placeholder="your.email@address.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs bg-gray-800 text-gray-100 border border-gray-700 px-3 py-2 rounded focus:outline-none focus:border-primary placeholder:text-gray-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full text-xs uppercase bg-primary hover:bg-primary-dark text-white font-semibold py-2 rounded transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-2 text-xs text-gray-500">
              <p>Email: <a href="mailto:care@carefirst.pk" className="hover:text-primary transition-colors">care@carefirst.pk</a></p>
              <p>Store: North Nazimabad, Karachi</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div>
            © {new Date().getFullYear()} Carefirst Pharmacy. Your health, our priority.
          </div>
          <div className="text-center sm:text-right">
            Delivered with care.
          </div>
        </div>
      </div>
    </footer>
  );
}
