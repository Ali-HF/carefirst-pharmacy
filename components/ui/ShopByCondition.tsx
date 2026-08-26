import Link from "next/link";
import { Stethoscope, Baby, Pill, Heart, Activity, Apple, ShieldPlus, Eye } from "lucide-react";

const conditions = [
  { name: "Fever & Pain", icon: Activity, slug: "fever-pain", color: "text-red-500", bg: "bg-red-50" },
  { name: "Cold & Cough", icon: Stethoscope, slug: "cold-cough", color: "text-blue-500", bg: "bg-blue-50" },
  { name: "Stomach Care", icon: Apple, slug: "stomach-care", color: "text-green-500", bg: "bg-green-50" },
  { name: "First Aid", icon: ShieldPlus, slug: "first-aid", color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Baby Care", icon: Baby, slug: "baby-mother-care", color: "text-pink-500", bg: "bg-pink-50" },
  { name: "Heart Health", icon: Heart, slug: "heart-health", color: "text-rose-500", bg: "bg-rose-50" },
  { name: "Vitamins", icon: Pill, slug: "multivitamins", color: "text-yellow-600", bg: "bg-yellow-50" },
  { name: "Eye Care", icon: Eye, slug: "eye-ear", color: "text-teal-500", bg: "bg-teal-50" },
];

export function ShopByCondition() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-primary-dark mb-6">Shop by Condition</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {conditions.map((c, i) => {
            const Icon = c.icon;
            return (
              <Link key={i} href={`/category/${c.slug}`} className="group flex flex-col items-center">
                <div className={`w-20 h-20 rounded-full ${c.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm border border-transparent group-hover:border-primary/20`}>
                  <Icon className={`w-8 h-8 ${c.color}`} />
                </div>
                <span className="text-sm font-medium text-center text-foreground group-hover:text-primary transition-colors">
                  {c.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
