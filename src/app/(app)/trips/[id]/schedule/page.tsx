import { notFound } from "next/navigation";
import { Plus } from "lucide-react";
import { DateStrip } from "@/components/date-strip";
import { PageHeader } from "@/components/page-header";
import { ScheduleItemCard } from "@/components/schedule-item-card";
import { fetchDestinationBySlug, fetchTripById } from "@/lib/supabase";

const fmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default async function TripSchedulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trip = await fetchTripById(id);
  if (!trip) notFound();
  const destination = await fetchDestinationBySlug(trip.destinationId);
  const startDate = new Date(trip.startDate);

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        title="Schedule"
        action={
          <button
            type="button"
            aria-label="Add"
            className="inline-flex size-10 items-center justify-center rounded-full bg-muted text-foreground hover:bg-muted/80"
          >
            <Plus className="size-5" strokeWidth={1.5} />
          </button>
        }
      />

      <header className="flex flex-col gap-2">
        <p className="text-xs tracking-[0.32em] text-muted-foreground">
          {destination?.country.split(",").pop()?.trim().toUpperCase() ?? "JOURNEY"}
        </p>
        <h1 className="text-4xl font-light leading-[1.05] tracking-tight md:text-5xl">
          {destination?.name ?? "Your journey"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {fmt.format(new Date(trip.startDate))} → {fmt.format(new Date(trip.endDate))}
        </p>
        {trip.notes && (
          <p className="max-w-prose pt-2 text-base italic leading-relaxed text-muted-foreground">
            “{trip.notes}”
          </p>
        )}
      </header>

      <DateStrip anchorDate={startDate} selectedDate={startDate} />

      <section className="flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-light tracking-tight md:text-2xl">My schedule</h2>
          <button type="button" className="text-sm tracking-wide text-primary hover:underline">
            View all
          </button>
        </header>
        {trip.itinerary.length === 0 ? (
          <p className="max-w-prose rounded-[20px] border border-border bg-card/60 px-5 py-6 text-sm leading-relaxed text-muted-foreground">
            Your concierge will populate the itinerary once arrival is confirmed.
            Until then, the days are yours.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {trip.itinerary.map((item) => (
              <ScheduleItemCard
                key={item.id}
                item={item}
                destination={destination ?? undefined}
                href={`/trips/${trip.id}`}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
