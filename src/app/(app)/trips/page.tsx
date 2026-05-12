import Link from "next/link";
import { Calendar } from "lucide-react";
import { DestinationCardCompact } from "@/components/destination-card-compact";
import { destinations, getDestination, trips } from "@/lib/data";

const fmt = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function JourneysPage() {
  return (
    <div className="flex flex-col gap-16 md:gap-20">
      <header className="flex flex-col gap-4 pt-2">
        <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
          Your collection
        </p>
        <h1 className="max-w-2xl text-5xl font-light leading-[1.05] tracking-tight md:text-6xl">
          Journeys, held
          <br />
          <em className="not-italic text-action">in confidence.</em>
        </h1>
      </header>

      <section className="flex flex-col gap-8">
        <h2 className="text-2xl font-light tracking-tight md:text-3xl">Upcoming</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {trips.map((trip) => {
            const dest = getDestination(trip.destinationId);
            if (!dest) return null;
            return (
              <Link
                key={trip.id}
                href={`/trips/${trip.id}`}
                className="group flex flex-col gap-5"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[24px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs tracking-[0.28em] text-muted-foreground">
                    {dest.country.split(",").pop()?.trim().toUpperCase()}
                  </p>
                  <h3 className="text-3xl font-light tracking-tight group-hover:text-action">
                    {dest.name}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="size-4" strokeWidth={1.5} />
                    {fmt.format(new Date(trip.startDate))} → {fmt.format(new Date(trip.endDate))}
                  </span>
                  {trip.notes && (
                    <p className="max-w-prose pt-1 text-sm italic leading-relaxed text-muted-foreground">
                      “{trip.notes}”
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="text-2xl font-light tracking-tight md:text-3xl">Saved escapes</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {destinations.slice(0, 6).map((d) => (
            <DestinationCardCompact
              key={d.id}
              destination={d}
              showRating={false}
              showPrice={false}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
