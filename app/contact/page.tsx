import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-muted/30 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: "Contact Us", href: "/contact" }]} />
        <h1 className="text-3xl font-bold text-primary-dark mt-6 mb-8 text-center">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-lg border border-border">
            <h2 className="text-xl font-bold mb-6">Get in Touch</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full p-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" className="w-full p-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={4} className="w-full p-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50"></textarea>
              </div>
              <button type="button" className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3 rounded-md transition-colors mt-2">
                Send Message
              </button>
            </form>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg border border-border">
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <MapPin className="w-6 h-6 text-primary mr-4 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-600 mt-1">123 Health Avenue, Medical District, City, Country</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="w-6 h-6 text-primary mr-4 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600 mt-1">111-222-333</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="w-6 h-6 text-primary mr-4 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600 mt-1">support@carefirst.com</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
