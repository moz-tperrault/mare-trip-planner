"use client";

import Link from "next/link";
import { Bookmark, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Destination } from "@/types";

export function DestinationCard({
  destination,
  className,
}: {
  destination: Destination;
  className?: string;
}) {
  return (
    <Link
      href={`/destinations/${destination.id}`}
      className={cn("group flex flex-col gap-3 sm:gap-5", className)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted sm:rounded-[20px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          aria-label="Save"
          className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur-md transition hover:bg-background sm:right-4 sm:top-4 sm:size-9"
        >
          <Bookmark className="size-3.5 sm:size-4" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-col gap-1.5 sm:gap-2.5">
        <p className="text-[10px] tracking-[0.24em] text-muted-foreground sm:text-xs sm:tracking-[0.28em]">
          {destination.country.split(",").pop()?.trim().toUpperCase()}
        </p>
        <div className="flex items-baseline justify-between gap-2 sm:gap-4">
          <h3 className="text-lg font-light leading-tight tracking-tight transition-colors group-hover:text-action sm:text-2xl">
            {destination.name}
          </h3>
          <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground sm:text-sm">
            <Star className="size-3 fill-star text-star sm:size-3.5" strokeWidth={1.5} />
            {destination.rating}
          </span>
        </div>
        <p className="line-clamp-2 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {destination.description}
        </p>
        <p className="pt-0.5 text-[11px] tracking-wide text-foreground/70 sm:pt-1 sm:text-xs">
          From{" "}
          <span className="text-foreground">
            ${destination.pricePerPerson.toLocaleString()}
          </span>{" "}
          · per night
        </p>
      </div>
    </Link>
  );
}
