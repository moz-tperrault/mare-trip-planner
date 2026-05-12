"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Destination } from "@/types";

export function DestinationCardCompact({
  destination,
  showRating = true,
  showPrice = true,
  className,
}: {
  destination: Destination;
  showRating?: boolean;
  showPrice?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/destinations/${destination.id}`}
      className={cn("group flex flex-col gap-3", className)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
        <button
          type="button"
          aria-label="Favorite"
          onClick={(e) => e.preventDefault()}
          className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur-md hover:bg-background"
        >
          <Heart className="size-3.5" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-[10px] tracking-[0.28em] text-muted-foreground">
          {destination.country.split(",").pop()?.trim().toUpperCase()}
        </p>
        <h3 className="text-lg font-light leading-tight tracking-tight group-hover:text-action">
          {destination.name}
        </h3>
        <p className="text-xs text-muted-foreground">{destination.location}</p>
        {(showRating || showPrice) && (
          <div className="mt-1 flex items-center justify-between gap-2 text-xs">
            {showRating ? (
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Star className="size-3 fill-star text-star" strokeWidth={1.5} />
                {destination.rating}
              </span>
            ) : (
              <span />
            )}
            {showPrice && (
              <span className="text-foreground/80">
                From{" "}
                <span className="text-foreground">${destination.pricePerPerson.toLocaleString()}</span>
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
