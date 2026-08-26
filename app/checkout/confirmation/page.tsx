import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ConfirmationPage() {
  return (
    <div className="bg-muted/30 min-h-screen py-12 flex items-center justify-center">
      <div className="bg-white p-12 text-center rounded-lg border border-border max-w-lg w-full mx-4 shadow-sm">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-primary-dark mb-4">Order Placed!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your order. Your order number is <span className="font-bold text-foreground">#CF-123456</span>. 
          We&#39;ll send you an email confirmation shortly.
        </p>
        <div className="flex flex-col space-y-3">
          <Link href="/account" className="w-full block text-center bg-primary hover:bg-primary-light text-white font-bold py-3 rounded-md transition-colors">
            View Order Status
          </Link>
          <Link href="/" className="w-full block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-md transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
