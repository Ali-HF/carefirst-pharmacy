"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/data/categories";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function MegaMenu() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <nav className="bg-primary-dark text-white hidden md:block">
      <div className="container mx-auto px-4">
        <ul className="flex items-center space-x-1">
          {categories.map((category) => (
            <li
              key={category.id}
              className="relative group"
              onMouseEnter={() => setActiveCategory(category.id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link
                href={`/category/${category.slug}`}
                className="flex items-center px-4 py-3 text-sm font-medium hover:bg-primary transition-colors"
              >
                {category.name}
                {category.children && category.children.length > 0 && (
                  <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
                )}
              </Link>

              {/* Dropdown Panel */}
              {category.children && category.children.length > 0 && (
                <div
                  className={cn(
                    "absolute left-0 top-full w-[600px] bg-white text-foreground shadow-lg border border-border rounded-b-md z-50 p-6 transition-all duration-200 origin-top",
                    activeCategory === category.id
                      ? "opacity-100 scale-y-100 visible"
                      : "opacity-0 scale-y-95 invisible"
                  )}
                >
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.children.map((sub) => (
                      <div key={sub.id} className="flex flex-col space-y-2">
                        <Link
                          href={`/category/${sub.slug}`}
                          className="font-semibold text-primary hover:text-accent transition-colors"
                        >
                          {sub.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
