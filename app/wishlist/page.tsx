import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  return (
    <div className="bg-muted/30 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: "My Wishlist", href: "/wishlist" }]} />
        <h1 className="text-2xl font-bold text-primary-dark mt-6 mb-8">My Wishlist</h1>
        
        <div className="bg-white p-12 text-center rounded-lg border border-border max-w-2xl mx-auto mt-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-primary-dark mb-4">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-8">Save items you love by clicking the heart icon on products.</p>
          <Link href="/" className="bg-primary hover:bg-primary-light text-white font-bold py-3 px-8 rounded-md transition-colors inline-block">
            Explore Products
          </Link>
        </div>
      </div>
    </div>
  );
}
