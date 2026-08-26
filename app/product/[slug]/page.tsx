import { notFound } from "next/navigation";
import Image from "next/image";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PriceTag } from "@/components/ui/PriceTag";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { ProductCarousel } from "@/components/ui/ProductCarousel";
import { getProductBySlug, getProductsByCategory, getAllProducts } from "@/lib/services/products";
import { ShoppingCart, ShieldCheck, Truck } from "lucide-react";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map(p => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getProductsByCategory(product.categoryId);

  return (
    <div className="bg-muted/30 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs 
          items={[
            { label: product.categoryName, href: `/category/${product.categoryId}` },
            { label: product.name, href: `/product/${slug}` }
          ]} 
        />
        
        <div className="bg-white rounded-xl border border-border p-6 md:p-10 mt-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="relative h-[400px] md:h-[500px] bg-gray-50 rounded-lg flex items-center justify-center p-8">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain mix-blend-multiply"
              priority
            />
            {product.discountPercentage && (
              <div className="absolute top-4 left-4 bg-accent text-white font-bold px-3 py-1 rounded">
                {product.discountPercentage}% OFF
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="text-sm text-primary font-medium mb-2">{product.brand}</div>
            <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
            
            <p className="text-muted-foreground mb-6">Pack Size: <span className="font-semibold text-foreground">{product.packSize}</span></p>
            
            <div className="border-y border-border py-6 mb-6">
              <PriceTag 
                price={product.price} 
                originalPrice={product.originalPrice} 
                size="lg" 
              />
              <div className="mt-2 text-sm text-green-600 font-medium">
                {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-8">
              <QuantityStepper />
              <button className="flex-1 bg-primary hover:bg-primary-light text-white font-bold py-3 px-6 rounded-md transition-colors flex items-center justify-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 text-sm text-muted-foreground bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <ShieldCheck className="w-5 h-5 text-primary mr-3" />
                <span>100% Genuine Products</span>
              </div>
              <div className="flex items-center">
                <Truck className="w-5 h-5 text-primary mr-3" />
                <span>Fast & Reliable Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs section placeholder */}
        <div className="mt-12 bg-white rounded-xl border border-border p-8">
          <h2 className="text-xl font-bold border-b border-border pb-4 mb-6">Product Information</h2>
          <div className="prose max-w-none text-muted-foreground">
            <p>This is a placeholder for detailed product description, safety warnings, and how to use instructions. In a real application, this data would come from the database for {product.name}.</p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 1 && (
          <div className="mt-12">
            <ProductCarousel title="Similar Products" products={relatedProducts.filter(p => p.id !== product.id)} />
          </div>
        )}
      </div>
    </div>
  );
}
