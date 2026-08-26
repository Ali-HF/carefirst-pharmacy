import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { User, Package, MapPin, Heart, LogOut } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="bg-muted/30 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: "My Account", href: "/account" }]} />
        <h1 className="text-2xl font-bold text-primary-dark mt-6 mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-2">
            <button className="w-full flex items-center space-x-3 bg-primary text-white p-4 rounded-lg font-medium text-left">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
            <button className="w-full flex items-center space-x-3 hover:bg-white text-muted-foreground hover:text-primary p-4 rounded-lg font-medium text-left transition-colors border border-transparent hover:border-border">
              <Package className="w-5 h-5" />
              <span>Order History</span>
            </button>
            <button className="w-full flex items-center space-x-3 hover:bg-white text-muted-foreground hover:text-primary p-4 rounded-lg font-medium text-left transition-colors border border-transparent hover:border-border">
              <MapPin className="w-5 h-5" />
              <span>Saved Addresses</span>
            </button>
            <button className="w-full flex items-center space-x-3 hover:bg-white text-muted-foreground hover:text-primary p-4 rounded-lg font-medium text-left transition-colors border border-transparent hover:border-border">
              <Heart className="w-5 h-5" />
              <span>Wishlist</span>
            </button>
            <button className="w-full flex items-center space-x-3 hover:bg-white text-red-500 hover:text-red-600 p-4 rounded-lg font-medium text-left transition-colors border border-transparent hover:border-border mt-4">
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-white p-8 rounded-lg border border-border">
              <h2 className="text-xl font-bold mb-6">Profile Information</h2>
              <p className="text-muted-foreground text-sm mb-6">
                You are currently viewing a placeholder profile. Real authentication will be added in Phase 2.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" disabled value="John Doe" className="w-full p-2 border border-border rounded bg-gray-50 text-gray-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" disabled value="john@example.com" className="w-full p-2 border border-border rounded bg-gray-50 text-gray-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" disabled value="+92 300 1234567" className="w-full p-2 border border-border rounded bg-gray-50 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
