"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GENRES } from "@/lib/constants";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function FilterBar({
  genre,
  q,
  count,
  sort,
  onGenreChange,
  onSortChange,
}: {
  genre?: string;
  q?: string;
  count: number;
  sort?: string;
  onGenreChange?: (genre: string) => void;
  onSortChange?: (sort: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeLabel = genre ?? "All";

  const pillClass = (active: boolean) =>
    `shrink-0 px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 border ${
      active
        ? "bg-[#0c2a4d] text-white border-[#0c2a4d] shadow-sm"
        : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary hover:bg-orange-50/30"
    }`;

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (onSortChange) {
      onSortChange(val);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    if (val && val !== "best") {
      params.set("sort", val);
    } else {
      params.delete("sort");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={`sticky top-4 z-30 mb-8 transition-all duration-300
                  bg-white/95 backdrop-blur-md border border-gray-200
                  ${
                    scrolled
                      ? "mx-2 sm:mx-6 rounded-xl shadow-md"
                      : "rounded-xl shadow-sm"
                  }`}
    >
      {/* Main row */}
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3">

        {/* Desktop pills */}
        <div className="hidden sm:flex items-center gap-2 flex-wrap flex-1 min-w-0">
          <span
            className="shrink-0 text-xs px-2.5 py-1 rounded-md bg-gray-100
                       text-gray-600 border border-gray-200 tabular-nums font-medium"
          >
            {count} {count === 1 ? "item" : "items"}
          </span>

          <div className="shrink-0 w-px h-4 bg-gray-200 mx-1" />

          <Link
            href={(() => {
              const params = new URLSearchParams();
              if (q) params.set("q", q);
              if (sort) params.set("sort", sort);
              const qs = params.toString();
              return qs ? `/shop?${qs}` : "/shop";
            })()}
            className={pillClass(!genre)}
            onClick={(e) => {
              if (onGenreChange) {
                e.preventDefault();
                onGenreChange("");
              }
            }}
          >
            All
          </Link>

          {GENRES.map((g) => {
            const params = new URLSearchParams();
            params.set("genre", g);
            if (q) params.set("q", q);
            if (sort) params.set("sort", sort);
            return (
              <Link
                key={g}
                href={`/shop?${params.toString()}`}
                className={pillClass(genre === g)}
                onClick={(e) => {
                  if (onGenreChange) {
                    e.preventDefault();
                    onGenreChange(g);
                  }
                }}
              >
                {g}
              </Link>
            );
          })}
        </div>

        {/* Mobile: active category + toggle */}
        <button
          className="sm:hidden flex items-center gap-2 flex-1"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className="text-xs text-gray-500 font-medium">{count} items</span>
          <div className="w-px h-4 bg-gray-200 mx-1" />
          <span
            className="px-3 py-1 rounded-md text-xs font-semibold bg-[#0c2a4d] text-white border border-[#0c2a4d]"
          >
            {activeLabel}
          </span>
          <svg
            width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            className={`ml-auto text-gray-400 transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {/* Sort — always visible */}
        <div className="shrink-0 relative">
          <select
            className="appearance-none bg-gray-50 border border-gray-200 rounded-md
                       pl-3.5 pr-8 py-1.5 text-xs text-gray-700 font-medium cursor-pointer
                       hover:border-primary focus:border-primary focus:outline-none transition-colors"
            value={sort || "best"}
            onChange={handleSortChange}
          >
            <option value="best">Best selling</option>
            <option value="new">New arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="sm:hidden px-4 pb-4 flex flex-wrap gap-2 border-t border-gray-100 pt-3">
          <Link
            href={(() => {
              const params = new URLSearchParams();
              if (q) params.set("q", q);
              if (sort) params.set("sort", sort);
              const qs = params.toString();
              return qs ? `/shop?${qs}` : "/shop";
            })()}
            className={pillClass(!genre)}
            onClick={(e) => {
              setMobileOpen(false);
              if (onGenreChange) {
                e.preventDefault();
                onGenreChange("");
              }
            }}
          >
            All
          </Link>
          {GENRES.map((g) => {
            const params = new URLSearchParams();
            params.set("genre", g);
            if (q) params.set("q", q);
            if (sort) params.set("sort", sort);
            return (
              <Link
                key={g}
                href={`/shop?${params.toString()}`}
                className={pillClass(genre === g)}
                onClick={(e) => {
                  setMobileOpen(false);
                  if (onGenreChange) {
                    e.preventDefault();
                    onGenreChange(g);
                  }
                }}
              >
                {g}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}