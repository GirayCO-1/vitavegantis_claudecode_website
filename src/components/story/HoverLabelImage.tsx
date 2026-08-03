"use client";

import Image from "next/image";
import { useState } from "react";

export default function HoverLabelImage({
  src,
  label,
  className,
  sizes = "220px",
}: {
  src: string;
  label: string;
  className?: string;
  sizes?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl ${className ?? ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
    >
      <Image
        src={src}
        alt={label}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div
        className={`absolute inset-0 flex items-end justify-center bg-gradient-to-t from-forest/80 via-forest/10 to-transparent pb-4 transition-opacity duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="font-display text-lg font-semibold text-cream">
          {label}
        </span>
      </div>
    </div>
  );
}
