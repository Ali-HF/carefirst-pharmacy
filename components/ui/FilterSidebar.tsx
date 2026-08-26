"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function FilterSidebar() {
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);

  return (
    <div className="w-full bg-white border border-border rounded-lg p-4 space-y-6">
      <h3 className="font-bold text-lg border-b border-border pb-4">Filters</h3>

      {/* Price Filter */}
      <div>
        <button
          className="flex items-center justify-between w-full font-semibold mb-4"
          onClick={() => setIsPriceOpen(!isPriceOpen)}
        >
          <span>Price Range</span>
          {isPriceOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {isPriceOpen && (
          <div className="space-y-3">
            {["Under Rs. 500", "Rs. 500 - Rs. 1000", "Rs. 1000 - Rs. 5000", "Above Rs. 5000"].map((range, i) => (
              <label key={i} className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded text-primary focus:ring-primary accent-primary" />
                <span className="text-sm text-gray-700">{range}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div>
        <button
          className="flex items-center justify-between w-full font-semibold mb-4"
          onClick={() => setIsBrandOpen(!isBrandOpen)}
        >
          <span>Brands</span>
          {isBrandOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {isBrandOpen && (
          <div className="space-y-3">
            {["GSK", "Pfizer", "Abbott", "Panadol", "Sensodyne"].map((brand, i) => (
              <label key={i} className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded text-primary focus:ring-primary accent-primary" />
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* In Stock Filter */}
      <div className="pt-4 border-t border-border">
        <label className="flex items-center space-x-2 cursor-pointer font-semibold">
          <input type="checkbox" className="rounded text-primary focus:ring-primary accent-primary" />
          <span>In Stock Only</span>
        </label>
      </div>
    </div>
  );
}
