import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group border border-border rounded-lg bg-white overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full relative">
      {product.discountPercentage && (
        <div className="absolute top-2 left-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded z-10">
          {product.discountPercentage}% OFF
        </div>
      )}
      
      <Link href={`/product/${product.slug}`} className="block relative h-48 p-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </Link>

      <div className="p-4 flex flex-col flex-1 border-t border-border/50">
        <div className="text-xs text-primary font-medium mb-1">
          {product.categoryName}
        </div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mb-4">{product.packSize}</p>
        
        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="text-lg font-bold text-foreground">
              Rs. {product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-muted-foreground line-through">
                Rs. {product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
          <button className="bg-primary/10 hover:bg-primary text-primary hover:text-white p-2 rounded-full transition-colors" aria-label="Add to cart">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
