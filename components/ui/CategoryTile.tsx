import Link from "next/link";
import Image from "next/image";

interface CategoryTileProps {
  name: string;
  slug: string;
  image: string;
  color?: string;
}

export function CategoryTile({ name, slug, image, color = "bg-blue-50" }: CategoryTileProps) {
  return (
    <Link href={`/category/${slug}`} className="group block">
      <div className={`rounded-xl ${color} p-6 flex flex-col items-center justify-center h-40 transition-transform hover:-translate-y-1 hover:shadow-md`}>
        <div className="relative w-16 h-16 mb-4">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain group-hover:scale-110 transition-transform"
          />
        </div>
        <h3 className="text-center font-semibold text-sm text-primary-dark">
          {name}
        </h3>
      </div>
    </Link>
  );
}
