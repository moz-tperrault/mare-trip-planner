import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TripPackage } from "@/lib/trip-packages";

const fmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

export function TripPackageCard({
  pkg,
  className,
}: {
  pkg: TripPackage;
  className?: string;
}) {
  const dateRange = `${fmt.format(new Date(pkg.startDate))} – ${fmt.format(new Date(pkg.endDate))}`;
  return (
    <article
      className={cn(
        "group flex items-stretch gap-6 rounded-[20px] border border-border bg-card p-4 transition-colors hover:bg-muted/40",
        className,
      )}
    >
      <div className="relative aspect-[3/4] w-32 shrink-0 overflow-hidden rounded-[14px] sm:w-36">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={pkg.imageUrl} alt={pkg.name} className="size-full object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 py-1">
        <div className="flex flex-col gap-2">
          <p className="text-[10px] tracking-[0.28em] text-muted-foreground">
            CURATED · {pkg.peopleJoined} GUESTS
          </p>
          <h3 className="text-2xl font-light leading-tight tracking-tight transition-colors group-hover:text-action">
            {pkg.name}
          </h3>
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="size-4" strokeWidth={1.5} />
            {dateRange}
          </span>
        </div>
        <div className="flex items-end justify-between gap-3 pt-2">
          <p className="text-xs tracking-wide text-muted-foreground">
            From{" "}
            <span className="text-foreground">${pkg.price.toLocaleString()}</span>{" "}
            · per guest
          </p>
          <span className="text-sm tracking-wide text-action">Enquire →</span>
        </div>
      </div>
    </article>
  );
}
