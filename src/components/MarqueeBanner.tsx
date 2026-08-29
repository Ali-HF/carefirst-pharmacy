"use client";

import { ShieldCheck, Truck, Clock } from "lucide-react";

export default function MarqueeBanner() {
  const items = [
    { text: "100% AUTHENTIC MEDICINES", icon: ShieldCheck },
    { text: "FREE DELIVERY ON ORDERS OVER RS. 1000", icon: Truck },
    { text: "24/7 PHARMACIST SUPPORT", icon: Clock },
    { text: "100% AUTHENTIC MEDICINES", icon: ShieldCheck },
    { text: "FREE DELIVERY ON ORDERS OVER RS. 1000", icon: Truck },
    { text: "24/7 PHARMACIST SUPPORT", icon: Clock },
  ];

  // We duplicate the array to ensure seamless infinite scrolling
  const renderItems = [...items, ...items];

  return (
    <div className="bg-[#081d36] text-white overflow-hidden py-2 border-b border-[#0c2a4d] relative z-50">
      <div className="animate-marquee flex items-center">
        {renderItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center mx-8 shrink-0">
              <Icon className="w-4 h-4 mr-2 text-primary" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-gray-200">
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
