import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FilterSidebar } from "@/components/ui/FilterSidebar";
import { ProductCard } from "@/components/ui/ProductCard";
import { getProductsByCategory } from "@/lib/services/products";
import { categories } from "@/data/categories";

export async function generateStaticParams() {
  const slugs: { slug: string }[] = [];
  categories.forEach(c => {
    slugs.push({ slug: c.slug });
    if (c.children) {
      c.children.forEach(sub => slugs.push({ slug: sub.slug }));
    }
  });
  // Add some fallback slugs for the products we seeded
  slugs.push({ slug: 'protein' });
  slugs.push({ slug: 'oral-care' });
  slugs.push({ slug: 'bp-monitors' });
  return slugs;
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let categoryName = slug;
  for (const cat of categories) {
    if (cat.slug === slug) {
      categoryName = cat.name;
      break;
    }
    if (cat.children) {
      const sub = cat.children.find(c => c.slug === slug);
      if (sub) {
        categoryName = sub.name;
        break;
      }
    }
  }

  const products = await getProductsByCategory(slug);

  return (
    <div className="bg-muted/30 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs 
          items={[
            { label: "Categories", href: "#" },
            { label: categoryName, href: `/category/${slug}` }
          ]} 
        />
        
        <div className="flex flex-col md:flex-row gap-8 mt-6">
          <aside className="w-full md:w-64 shrink-0">
            <FilterSidebar />
          </aside>
          
          <div className="flex-1">
            <div className="bg-white p-4 rounded-lg border border-border mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-primary-dark">{categoryName}</h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select className="border border-border rounded p-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-lg border border-border">
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">No products found</h3>
                <p className="text-sm text-gray-500">We couldn't find any products in this category right now.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
