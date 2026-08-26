"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductCard } from "@/components/ui/ProductCard";
import { FilterSidebar } from "@/components/ui/FilterSidebar";
import { searchProducts } from "@/lib/services/products";
import { Product } from "@/data/products";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      setIsLoading(true);
      if (query) {
        const data = await searchProducts(query);
        setResults(data);
      } else {
        setResults([]);
      }
      setIsLoading(false);
    }
    fetchResults();
  }, [query]);

  return (
    <div className="bg-muted/30 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs 
          items={[
            { label: "Search Results", href: "/search" }
          ]} 
        />
        
        <div className="flex flex-col md:flex-row gap-8 mt-6">
          <aside className="w-full md:w-64 shrink-0">
            <FilterSidebar />
          </aside>
          
          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg border border-border mb-6">
              <h1 className="text-xl font-bold text-primary-dark">
                Search Results for &quot;{query}&quot;
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {isLoading ? "Searching..." : `Found ${results.length} products`}
              </p>
            </div>

            {!isLoading && results.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {results.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : !isLoading ? (
              <div className="bg-white p-12 text-center rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">No matching products found</h3>
                <p className="text-sm text-gray-500">Try checking your spelling or using more general terms.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}

// Wait, search page cannot be fully static if it relies on searchParams.
// Next.js static export does not support searchParams in page.tsx unless it's a client component using useSearchParams().
