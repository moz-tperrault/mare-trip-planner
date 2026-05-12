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
      className={cn(
        "group flex flex-col gap-5",
        className,
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-muted">
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
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur-md transition hover:bg-background"
        >
          <Bookmark className="size-4" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        <p className="text-xs tracking-[0.28em] text-muted-foreground">
          {destination.country.split(",").pop()?.trim().toUpperCase()}
        </p>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-2xl font-light tracking-tight transition-colors group-hover:text-action">
            {destination.name}
          </h3>
          <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="size-3.5 fill-star text-star" strokeWidth={1.5} />
            {destination.rating}
          </span>
        </div>
        <p className="line-clamp-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {destination.description}
        </p>
        <p className="pt-1 text-xs tracking-wide text-foreground/70">
          From{" "}
          <span className="text-foreground">${destination.pricePerPerson.toLocaleString()}</span>{" "}
          · per night
        </p>
      </div>
    </Link>
  );
}
