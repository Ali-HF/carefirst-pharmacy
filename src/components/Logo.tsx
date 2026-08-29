import Link from "next/link";
import Image from "next/image";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 sm:gap-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary hover:opacity-90 transition-opacity"
    >
      <div className="relative h-8 w-8 sm:h-9 sm:w-9 shrink-0">
        <Image
          src="/logo.jpg"
          alt="Carefirst Pharmacy Icon"
          fill
          priority
          className="object-contain rounded-xs"
        />
      </div>
      <span
        className={`font-extrabold text-base sm:text-lg md:text-xl tracking-wider uppercase select-none ${
          light ? "text-white" : "text-[#0c2a4d]"
        }`}
      >
        CARE FIRST PHARMACY
      </span>
    </Link>
  );
}



