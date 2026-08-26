import Link from "next/link";
import { Globe, MessageCircle, Camera, Video, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">CareFirst Pharmacy</h3>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Your trusted health partner. We provide genuine medicines, healthcare products, and professional advice.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Video className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/prescription-upload" className="text-gray-300 hover:text-white transition-colors">Upload Prescription</Link></li>
              <li><Link href="/account" className="text-gray-300 hover:text-white transition-colors">My Account</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Top Categories</h4>
            <ul className="space-y-3">
              <li><Link href="/category/medicine" className="text-gray-300 hover:text-white transition-colors">Medicine</Link></li>
              <li><Link href="/category/baby-mother-care" className="text-gray-300 hover:text-white transition-colors">Baby & Mother Care</Link></li>
              <li><Link href="/category/personal-care" className="text-gray-300 hover:text-white transition-colors">Personal Care</Link></li>
              <li><Link href="/category/nutrition-supplements" className="text-gray-300 hover:text-white transition-colors">Nutrition & Supplements</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-accent shrink-0 mt-0.5" />
                <span className="text-gray-300">123 Health Avenue, Medical District, City, Country</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-accent shrink-0" />
                <span className="text-gray-300">111-222-333</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-accent shrink-0" />
                <span className="text-gray-300">support@carefirst.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CareFirst Pharmacy. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
