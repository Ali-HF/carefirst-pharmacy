"use client";

import { useCart } from "@/lib/services/cart-context";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="bg-muted/30 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: "Shopping Cart", href: "/cart" }]} />
        
        <h1 className="text-2xl font-bold text-primary-dark mt-6 mb-8">Your Cart</h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex bg-white p-4 rounded-lg border border-border items-center gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0 border border-border rounded p-2">
                    <Image src={item.image} alt={item.name} fill className="object-contain" />
                  </div>
                  <div className="flex-1">
                    <Link href={`/product/${item.slug}`} className="font-semibold hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">{item.packSize}</p>
                    <div className="text-primary font-bold mt-2">Rs. {item.price.toLocaleString()}</div>
                  </div>
                  <div className="flex flex-col items-end gap-4">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <QuantityStepper 
                      initialValue={item.quantity} 
                      onChange={(val) => updateQuantity(item.id, val)} 
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg border border-border h-fit">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">Rs. {cartTotal.toLocaleString()}</span>
                </div>
              </div>
              <Link href="/checkout" className="w-full block text-center bg-primary hover:bg-primary-light text-white font-bold py-3 rounded-md transition-colors">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-lg border border-border max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-primary-dark mb-4">Your cart is empty</h3>
            <p className="text-muted-foreground mb-8">Looks like you haven&#39;t added anything to your cart yet.</p>
            <Link href="/" className="bg-primary hover:bg-primary-light text-white font-bold py-3 px-8 rounded-md transition-colors inline-block">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
