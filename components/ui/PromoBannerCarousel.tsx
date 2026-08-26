"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Banner {
  id: string;
  image: string;
  link: string;
}

const banners: Banner[] = [
  { id: "b1", image: "/logo.jpg.jpeg", link: "/category/medicine" },
  { id: "b2", image: "/logo.jpg.jpeg", link: "/category/baby-mother-care" },
  { id: "b3", image: "/logo.jpg.jpeg", link: "/category/personal-care" },
];

export function PromoBannerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [
    emblaApi
  ]);

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onInit();
    onSelect();
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className="relative overflow-hidden bg-gray-100 rounded-xl" ref={emblaRef}>
      <div className="flex">
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-0 shrink-0 basis-full relative h-[200px] md:h-[400px]">
            <Link href={banner.link} className="block w-full h-full relative">
              <Image
                src={banner.image}
                alt="Promotional Banner"
                fill
                className="object-cover"
                priority
              />
            </Link>
          </div>
        ))}
      </div>
      
      {/* Pagination dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-colors",
              index === selectedIndex ? "bg-primary" : "bg-white/60 hover:bg-white"
            )}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
