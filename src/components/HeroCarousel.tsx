"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroCarousel() {
  return (
    <div className="relative w-full max-w-7xl mx-auto rounded-xl overflow-hidden mb-8 h-64 md:h-80 shadow-md group">
      {/* Background with Panning Animation */}
      <div 
        className="absolute inset-0 bg-cover bg-center animate-pan"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop')",
          filter: "brightness(0.8) contrast(1.1)"
        }}
      />
      
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/20" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 text-white">
        <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-max mb-4">
          Special Offer
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold mb-3 leading-tight max-w-lg">
          Your Health, Delivered <span className="text-primary-light">Safely.</span>
        </h2>
        <p className="text-sm md:text-base text-gray-200 mb-6 max-w-md leading-relaxed">
          Get 10% off your first order of vitamins and supplements. Authentic medicines delivered to your doorstep.
        </p>
        <Link 
          href="/shop?genre=Vitamins" 
          className="inline-flex items-center justify-center bg-white text-primary font-bold px-6 py-2.5 rounded-md hover:bg-primary hover:text-white transition-colors duration-300 w-max shadow-sm"
        >
          Shop Vitamins <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
