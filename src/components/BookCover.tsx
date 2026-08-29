"use client";

import { useState } from "react";
import Image from "next/image";

type Palette = { bg: string; fg: string; band: string };

const PALETTES: Record<string, { bg: string; fg: string }> = {
  Medicine: { bg: "#e0f2fe", fg: "#0284c7" },
  Vitamins: { bg: "#fef9c3", fg: "#ca8a04" },
  "Personal Care": { bg: "#fce7f3", fg: "#db2777" },
  Devices: { bg: "#f3f4f6", fg: "#4b5563" },
  "Baby & Mother": { bg: "#ffedd5", fg: "#ea580c" },
  Herbal: { bg: "#dcfce7", fg: "#16a34a" },
};

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    const candidate = current ? `${current} ${w}` : w;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = w;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 4);
}

export default function BookCover({
  title,
  author,
  genre,
  seed,
  isSecondary = false,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: {
  title: string;
  author: string;
  genre: string;
  seed: string;
  isSecondary?: boolean;
  className?: string;
  sizes?: string;
}) {
  const [hasError, setHasError] = useState(false);

  // Upgrade http to https to prevent mixed-content blocks
  let safeSeed = seed;
  if (safeSeed && safeSeed.startsWith("http://")) {
    safeSeed = safeSeed.replace("http://", "https://");
  }

  const isUrl = safeSeed && !hasError && (safeSeed.startsWith("https://") || safeSeed.startsWith("/"));
  if (isUrl && !isSecondary) {
    return (
      <div className={`relative overflow-hidden bg-white rounded-md flex items-center justify-center p-2 ${className}`} style={{ aspectRatio: "1/1" }}>
        <Image
          src={safeSeed}
          alt={title}
          fill
          unoptimized={true}
          sizes={sizes}
          onError={() => setHasError(true)}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    );
  }

  const palette = PALETTES[genre] ?? { bg: "#f0f9ff", fg: "#0284c7" };
  const titleLines = wrapText(title, 16);

  return (
    <svg
      viewBox="0 0 240 240"
      className={`rounded-xl shadow-sm ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-105 ${className}`}
      role="img"
      aria-label={title}
      style={{ aspectRatio: "1/1" }}
    >
      <rect width="240" height="240" fill={palette.bg} />
      
      {/* Medical Cross Background Pattern */}
      <path d="M110,40 h20 v30 h30 v20 h-30 v30 h-20 v-30 h-30 v-20 h30 z" fill={palette.fg} opacity="0.05" />
      <path d="M30,150 h10 v15 h15 v10 h-15 v15 h-10 v-15 h-15 v-10 h15 z" fill={palette.fg} opacity="0.05" />
      <path d="M180,180 h15 v20 h20 v15 h-20 v20 h-15 v-20 h-20 v-15 h20 z" fill={palette.fg} opacity="0.05" />

      {/* title */}
      <text
        x="120"
        y={120 - (titleLines.length - 1) * 12}
        textAnchor="middle"
        fill={palette.fg}
        fontFamily="sans-serif"
        fontWeight={700}
        fontSize="16"
      >
        {titleLines.map((line, i) => (
          <tspan key={i} x="120" dy={i === 0 ? 0 : 22}>
            {line}
          </tspan>
        ))}
      </text>

      {/* generic/brand text */}
      <text
        x="120"
        y="215"
        textAnchor="middle"
        fill={palette.fg}
        opacity="0.7"
        fontFamily="sans-serif"
        fontWeight={600}
        fontSize="10"
        letterSpacing="1"
      >
        CAREFIRST PHARMACY
      </text>
    </svg>
  );
}
