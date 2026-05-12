import Link from "next/link";
import { Calendar, ChevronRight, MapPin } from "lucide-react";
import type { Destination, ScheduleItem } from "@/types";

const fmt = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function ScheduleItemCard({
  item,
  destination,
  href = "#",
}: {
  item: ScheduleItem;
  destination?: Destination;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl bg-card p-3 shadow-card transition hover:shadow-card-hover"
    >
      {destination && (
        <div className="relative aspect-square size-20 shrink-0 overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="size-full object-cover"
          />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="size-3.5" />
          {fmt.format(new Date(item.date))}
          {item.startTime && ` · ${item.startTime}`}
        </span>
        <h3 className="truncate text-base font-semibold tracking-tight">{item.title}</h3>
        {item.location && (
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5" />
            {item.location}
          </span>
        )}
      </div>
      <ChevronRight className="size-5 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
    </Link>
  );
}
