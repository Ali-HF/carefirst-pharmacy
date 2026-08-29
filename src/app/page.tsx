import { listBooksWithSales } from "@/lib/db";
import ShopClient from "@/components/ShopClient";
import Link from "next/link";
import Image from "next/image";
import { Pill, Sparkles, HeartPulse, Baby, Stethoscope, Leaf, ShieldCheck, Zap, PhoneCall, ArrowRight } from "lucide-react";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; genre?: string; sort?: string }>;
}) {
  const { q, genre, sort } = (await searchParams) ?? {};
  const initialBooks = await listBooksWithSales();

  const categories = [
    {
      name: "Medicine",
      icon: Pill,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50 group-hover:bg-blue-600",
      borderColor: "hover:border-blue-300",
      badgeColor: "group-hover:text-white",
    },
    {
      name: "Vitamins",
      icon: Sparkles,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50 group-hover:bg-amber-600",
      borderColor: "hover:border-amber-300",
      badgeColor: "group-hover:text-white",
    },
    {
      name: "Personal Care",
      icon: HeartPulse,
      iconColor: "text-rose-600",
      bgColor: "bg-rose-50 group-hover:bg-rose-600",
      borderColor: "hover:border-rose-300",
      badgeColor: "group-hover:text-white",
    },
    {
      name: "Baby & Mother",
      icon: Baby,
      iconColor: "text-pink-600",
      bgColor: "bg-pink-50 group-hover:bg-pink-600",
      borderColor: "hover:border-pink-300",
      badgeColor: "group-hover:text-white",
    },
    {
      name: "Devices",
      icon: Stethoscope,
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-50 group-hover:bg-indigo-600",
      borderColor: "hover:border-indigo-300",
      badgeColor: "group-hover:text-white",
    },
    {
      name: "Herbal",
      icon: Leaf,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50 group-hover:bg-emerald-600",
      borderColor: "hover:border-emerald-300",
      badgeColor: "group-hover:text-white",
    },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16">
      {/* Modern Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0c2a4d] via-[#103661] to-[#081d36] text-white py-12 md:py-16">
        {/* Subtle background glow accents */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-orange-300 text-xs font-semibold tracking-wide shadow-sm">
                <ShieldCheck className="w-4 h-4 text-orange-400" />
                <span>100% Authentic Medicines • Licensed Pharmacy</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
                Your Health, <br />
                <span className="text-orange-400">Our Priority.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-blue-100/90 max-w-xl leading-relaxed">
                Order genuine prescription medicines, vitamins, and clinical health devices delivered safely to your doorstep with express delivery.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 active:scale-95"
                >
                  <span>Explore Pharmacy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://wa.me/923001234567?text=Hi%20Carefirst%20Pharmacy,%20I%20would%20like%20to%20order%20medicines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Order via WhatsApp</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 text-xs text-blue-100">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified Stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-blue-300 shrink-0" />
                  <span>Qualified Care</span>
                </div>
              </div>
            </div>

            {/* Right Banner Visual Column */}
            <div className="lg:col-span-6 w-full">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/20 border border-white/10 bg-[#0a2340]">
                <Image
                  src="/images/pharmacy_hero_banner.jpg"
                  alt="Carefirst Pharmacy Store & Clinical Care"
                  fill
                  priority
                  unoptimized={true}
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c2a4d]/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-3.5 border border-white/40 shadow-lg flex items-center justify-between text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight text-[#0c2a4d]">1,650+ Healthcare Products</p>
                      <p className="text-[11px] text-gray-600">Prescriptions & Wellness in Stock</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                    Active Catalog
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0c2a4d] tracking-tight">Shop by Category</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Browse through our specialized healthcare departments</p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                href={`/shop?genre=${encodeURIComponent(cat.name)}`}
                key={cat.name}
                className="group block"
              >
                <div
                  className={`bg-white rounded-2xl p-5 flex flex-col items-center justify-center gap-3.5 border border-gray-200/80 ${cat.borderColor} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-36`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${cat.bgColor} flex items-center justify-center transition-all duration-300 shadow-sm`}
                  >
                    <Icon
                      className={`w-7 h-7 ${cat.iconColor} ${cat.badgeColor} transition-colors duration-300`}
                      strokeWidth={2}
                    />
                  </div>
                  <span className="font-bold text-xs sm:text-sm text-center text-gray-800 group-hover:text-[#0c2a4d] transition-colors">
                    {cat.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products / Storefront Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0c2a4d] tracking-tight">
              {genre ? `${genre} Catalog` : "Featured Medicines & Healthcare"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              {genre ? `All authentic items in ${genre}` : "Top-rated authentic medicines and daily wellness essentials"}
            </p>
          </div>
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
