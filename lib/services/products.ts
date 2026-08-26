import { products, Product } from "@/data/products";

export const getFeaturedProducts = async (): Promise<Product[]> => {
  return products.filter((p) => p.isFeatured);
};

export const getNewArrivals = async (): Promise<Product[]> => {
  return products.filter((p) => p.isNew);
};

export const getBestSellers = async (): Promise<Product[]> => {
  return products.filter((p) => p.isBestSeller);
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  return products.filter((p) => p.categoryId === categoryId);
};

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
  return products.find((p) => p.slug === slug);
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.brand.toLowerCase().includes(lowercaseQuery) ||
      p.categoryName.toLowerCase().includes(lowercaseQuery)
  );
};

export const getAllProducts = async (): Promise<Product[]> => {
  return products;
};
