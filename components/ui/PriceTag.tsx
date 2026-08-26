export function PriceTag({ price, originalPrice, discountPercentage, size = "md" }: { price: number, originalPrice?: number, discountPercentage?: number, size?: "sm" | "md" | "lg" }) {
  const priceSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl"
  };
  
  return (
    <div className="flex items-end space-x-3">
      <span className={`font-bold text-foreground ${priceSizes[size]}`}>
        Rs. {price.toLocaleString()}
      </span>
      {originalPrice && (
        <span className="text-sm text-muted-foreground line-through mb-0.5">
          Rs. {originalPrice.toLocaleString()}
        </span>
      )}
      {discountPercentage && (
        <span className="text-xs font-bold text-accent mb-1 bg-accent/10 px-2 py-0.5 rounded">
          {discountPercentage}% OFF
        </span>
      )}
    </div>
  );
}
