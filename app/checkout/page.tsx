import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="bg-muted/30 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[
          { label: "Shopping Cart", href: "/cart" },
          { label: "Checkout", href: "/checkout" }
        ]} />
        
        <h1 className="text-2xl font-bold text-primary-dark mt-6 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-border">
              <h2 className="text-xl font-bold mb-4">1. Delivery Address</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" className="w-full p-2 border border-border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" className="w-full p-2 border border-border rounded" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                  <input type="text" className="w-full p-2 border border-border rounded" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input type="text" className="w-full p-2 border border-border rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="text" className="w-full p-2 border border-border rounded" />
                  </div>
                </div>
                <button type="button" className="bg-primary hover:bg-primary-light text-white font-bold py-2 px-6 rounded-md transition-colors mt-2">
                  Save Address
                </button>
              </form>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-border opacity-60">
              <h2 className="text-xl font-bold mb-4">2. Delivery Slot</h2>
              <p className="text-sm text-muted-foreground">Please complete step 1 first.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-border opacity-60">
              <h2 className="text-xl font-bold mb-4">3. Payment Method</h2>
              <p className="text-sm text-muted-foreground">Please complete step 2 first.</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-border h-fit">
             <h2 className="text-xl font-bold mb-6">Order Summary</h2>
             <p className="text-sm text-muted-foreground mb-6">Review your order details below.</p>
             <Link href="/checkout/confirmation" className="w-full block text-center bg-primary hover:bg-primary-light text-white font-bold py-3 rounded-md transition-colors">
                Place Order (Demo)
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
