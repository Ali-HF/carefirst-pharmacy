import { PromoBannerCarousel } from "@/components/ui/PromoBannerCarousel";
import { ShopByCondition } from "@/components/ui/ShopByCondition";
import { ProductCarousel } from "@/components/ui/ProductCarousel";
import { CategoryTile } from "@/components/ui/CategoryTile";
import { getFeaturedProducts, getNewArrivals, getBestSellers } from "@/lib/services/products";
import Image from "next/image";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const newArrivals = await getNewArrivals();
  const bestSellers = await getBestSellers();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Promo Carousel */}
        <section className="container mx-auto px-4 py-6">
          <PromoBannerCarousel />
        </section>

        {/* Shop by Condition */}
        <ShopByCondition />

        {/* Product Carousel: Best Sellers */}
        <ProductCarousel title="Best Sellers" products={bestSellers} />

        {/* Product Carousel: New Arrivals */}
        <ProductCarousel title="New Arrivals" products={newArrivals} />

        {/* Product Carousel: Featured */}
        <ProductCarousel title="Featured Products" products={featuredProducts} />

        {/* Category Tile Grid */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-primary-dark mb-8">Shop by Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <CategoryTile name="Beauty Care" slug="skin-care" image="/logo.jpg.jpeg" color="bg-pink-50" />
              <CategoryTile name="Multivitamins" slug="multivitamins" image="/logo.jpg.jpeg" color="bg-yellow-50" />
              <CategoryTile name="Baby Care" slug="baby-mother-care" image="/logo.jpg.jpeg" color="bg-blue-50" />
              <CategoryTile name="Devices" slug="devices-support" image="/logo.jpg.jpeg" color="bg-teal-50" />
              <CategoryTile name="Herbal" slug="herbal" image="/logo.jpg.jpeg" color="bg-green-50" />
              <CategoryTile name="Personal Care" slug="personal-care" image="/logo.jpg.jpeg" color="bg-purple-50" />
            </div>
          </div>
        </section>

        {/* Brand Logo Strip */}
        <section className="py-12 border-t border-border/50">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-xl font-semibold text-muted-foreground mb-8">Trusted by Top Brands</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
              {/* Placeholders for brand logos */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="relative w-24 h-12">
                  <Image src="/logo.jpg.jpeg" alt={`Brand ${i}`} fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
