import { listBooksWithSales } from "@/lib/db";
import ShopClient from "@/components/ShopClient";
import Link from "next/link";
import { Search } from "lucide-react";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; genre?: string; sort?: string }>;
}) {
  const { q, genre, sort } = (await searchParams) ?? {};
  const initialBooks = await listBooksWithSales();

  const categories = [
    { name: "Medicine", icon: "💊", color: "bg-blue-100" },
    { name: "Vitamins", icon: "🍋", color: "bg-orange-100" },
    { name: "Personal Care", icon: "🧴", color: "bg-teal-100" },
    { name: "Baby & Mother", icon: "🍼", color: "bg-pink-100" },
    { name: "Devices", icon: "🩺", color: "bg-gray-100" },
    { name: "Herbal", icon: "🌿", color: "bg-green-100" },
  ];

  return (
    <div className="bg-background min-h-screen pb-12">
      {/* Hero Banner Area */}
      <section className="bg-primary-light py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark tracking-tight">
              Your Health, <br /> Our Priority.
            </h1>
            <p className="text-lg text-text-light max-w-lg">
              Get genuine medicines, vitamins, and healthcare devices delivered directly to your door within 60 minutes.
            </p>
            <div className="relative max-w-md w-full sm:hidden">
              <input
                type="text"
                placeholder="Search for medicines..."
                className="w-full rounded-full border border-gray-300 bg-white pl-4 pr-12 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-full">
                <Search className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-4">
              <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-semibold transition-colors">
                Order Prescription
              </button>
            </div>
          </div>
          <div className="flex-1 w-full relative h-64 md:h-80 rounded-2xl overflow-hidden bg-primary/10 border-4 border-white shadow-xl flex items-center justify-center">
            {/* Placeholder for Hero Graphic */}
            <span className="text-6xl">🏥</span>
          </div>
        </div>
      </section>

      {/* Categories Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-primary-dark mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link href={`/shop?category=${cat.name.toLowerCase()}`} key={cat.name} className="group">
              <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-3 border border-border hover:border-primary hover:shadow-md transition-all h-32">
                <div className={`w-14 h-14 rounded-full ${cat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <span className="font-semibold text-sm text-center text-text">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products / Shop */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary-dark">
            {genre ? `${genre} Products` : "Featured Products"}
          </h2>
        </div>
        <ShopClient
          initialBooks={initialBooks}
          initialGenre={genre}
          initialSort={sort}
          q={q}
        />
      </section>
    </div>
  );
}
