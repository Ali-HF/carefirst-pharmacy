export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  categoryId: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  image: string;
  inStock: boolean;
  packSize: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Panadol Advance 500mg Tablets",
    slug: "panadol-advance-500mg-tablets",
    brand: "GSK",
    categoryId: "fever-pain",
    categoryName: "Fever & Pain Relief",
    price: 350,
    originalPrice: 400,
    discountPercentage: 12,
    image: "/logo.jpg.jpeg",
    inStock: true,
    packSize: "100s",
    isBestSeller: true,
  },
  {
    id: "p2",
    name: "Centrum Silver Adults Multivitamin",
    slug: "centrum-silver-adults-multivitamin",
    brand: "Pfizer",
    categoryId: "multivitamins",
    categoryName: "Multivitamins",
    price: 4500,
    image: "/logo.jpg.jpeg",
    inStock: true,
    packSize: "100 Tablets",
    isFeatured: true,
  },
  {
    id: "p3",
    name: "Pampers Premium Care Pants Large",
    slug: "pampers-premium-care-pants-large",
    brand: "Pampers",
    categoryId: "diapers",
    categoryName: "Diapers & Wipes",
    price: 2850,
    originalPrice: 3200,
    discountPercentage: 10,
    image: "/logo.jpg.jpeg",
    inStock: true,
    packSize: "44 Count",
    isFeatured: true,
  },
  {
    id: "p4",
    name: "CeraVe Moisturizing Cream",
    slug: "cerave-moisturizing-cream",
    brand: "CeraVe",
    categoryId: "skin-care",
    categoryName: "Skin Care",
    price: 3200,
    image: "/logo.jpg.jpeg",
    inStock: true,
    packSize: "454g",
    isNew: true,
  },
  {
    id: "p5",
    name: "Ensure Plus Vanilla Nutrition Shake",
    slug: "ensure-plus-vanilla",
    brand: "Abbott",
    categoryId: "protein",
    categoryName: "Protein Supplements",
    price: 1800,
    originalPrice: 2000,
    discountPercentage: 10,
    image: "/logo.jpg.jpeg",
    inStock: true,
    packSize: "400g",
    isBestSeller: true,
  },
  {
    id: "p6",
    name: "Sensodyne Repair & Protect Toothpaste",
    slug: "sensodyne-repair-protect",
    brand: "Sensodyne",
    categoryId: "oral-care",
    categoryName: "Oral Care",
    price: 450,
    image: "/logo.jpg.jpeg",
    inStock: true,
    packSize: "75ml",
  },
  {
    id: "p7",
    name: "Omron M3 Blood Pressure Monitor",
    slug: "omron-m3-blood-pressure-monitor",
    brand: "Omron",
    categoryId: "bp-monitors",
    categoryName: "Blood Pressure Monitors",
    price: 12500,
    originalPrice: 14000,
    discountPercentage: 10,
    image: "/logo.jpg.jpeg",
    inStock: true,
    packSize: "1 Unit",
    isFeatured: true,
  },
  {
    id: "p8",
    name: "Vicks VapoRub Ointment",
    slug: "vicks-vaporub",
    brand: "Vicks",
    categoryId: "cold-cough",
    categoryName: "Cold & Cough",
    price: 250,
    image: "/logo.jpg.jpeg",
    inStock: true,
    packSize: "50g",
    isBestSeller: true,
  },
];
