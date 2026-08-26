"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-1 items-center max-w-2xl w-full relative"
    >
      <input
        type="text"
        placeholder="Search for medicines, wellness products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2.5 rounded-l-md border border-r-0 border-border focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
      />
      <button
        type="submit"
        className="bg-primary hover:bg-primary-light text-white px-5 py-2.5 rounded-r-md transition-colors flex items-center justify-center"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
}
