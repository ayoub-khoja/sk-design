"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Photo cliquable qui ouvre la visionneuse (icône loupe au survol). */
export function ZoomablePhoto({
  src,
  alt,
  sizes,
  onOpen,
  className,
  imageClassName,
  priority,
}: {
  src: string;
  alt: string;
  sizes: string;
  onOpen: () => void;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Agrandir la photo : ${alt}`}
      className={cn(
        "group/photo relative block w-full cursor-zoom-in overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          "object-cover transition duration-500 group-hover/photo:scale-105",
          imageClassName,
        )}
      />
      <span className="pointer-events-none absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur transition group-hover/photo:opacity-100 group-focus-visible/photo:opacity-100">
        <Maximize2 className="h-4 w-4" />
      </span>
    </button>
  );
}
