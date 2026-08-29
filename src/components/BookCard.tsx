import Link from "next/link";
import BookCover from "./BookCover";
import AddToCartButton from "./AddToCartButton";
import { ShoppingCart } from "lucide-react";
import type { Book } from "@/lib/types";

export default function BookCard({ book }: { book: Book & { rating_avg?: number; rating_count?: number } }) {
  // Map "book" properties to standard e-commerce fields
  const title = book.title;
  const author = book.author;
  const price_cents = book.price_cents;
  const stock = book.stock || 0;
  const inStock = stock > 0;
  
  return (
    <div className="group flex flex-col h-full bg-white border border-gray-200 rounded-md overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300">
      <Link href={`/shop/${book.id}`} className="block relative p-4 flex-shrink-0 bg-white">
        {stock < 5 && stock > 0 && (
          <span className="absolute top-2 left-2 bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10">
            Only {stock} left
          </span>
        )}
        {!inStock && (
          <span className="absolute top-2 left-2 bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider z-10">
            Out of Stock
          </span>
        )}
        
        <div className="aspect-[4/5] relative flex items-center justify-center overflow-hidden rounded-md">
          <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-300 shadow-sm">
             <BookCover
              title={book.title}
              author={book.author}
              genre={book.genre}
              seed={book.cover_seed}
              className="w-full h-full object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
            />
          </div>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1 border-t border-gray-100">
        <Link href={`/shop/${book.id}`} className="mb-1">
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-primary transition-colors text-sm">
            {title}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mb-4 line-clamp-1">{author}</p>
        
        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-primary-dark leading-none">
              Rs. {Number(price_cents / 100).toFixed(2)}
            </span>
          </div>
          
          <div className="relative z-20">
            {inStock ? (
              <AddToCartButton
                bookId={book.id}
                bookTitle={title}
                className="bg-primary hover:bg-primary-dark text-white p-2.5 rounded-md transition-colors flex items-center justify-center border border-transparent shadow-sm"
              >
                <ShoppingCart className="w-5 h-5" />
              </AddToCartButton>
            ) : (
              <button disabled className="bg-gray-100 text-gray-400 p-2.5 rounded-md flex items-center justify-center border-none shadow-none cursor-not-allowed">
                <ShoppingCart className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}