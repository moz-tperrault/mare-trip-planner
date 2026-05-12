import { notFound } from "next/navigation";
import { Plus } from "lucide-react";
import { DateStrip } from "@/components/date-strip";
import { PageHeader } from "@/components/page-header";
import { ScheduleItemCard } from "@/components/schedule-item-card";
import { getDestination, getTrip } from "@/lib/data";

export default async function TripSchedulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trip = getTrip(id);
  if (!trip) notFound();
  const destination = getDestination(trip.destinationId);
  const startDate = new Date(trip.startDate);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Schedule"
        action={
          <button
            type="button"
            aria-label="Add"
            className="inline-flex size-10 items-center justify-center rounded-full bg-muted text-foreground hover:bg-muted/80"
          >
            <Plus className="size-5" />
          </button>
        }
      />

      <DateStrip anchorDate={startDate} selectedDate={startDate} />

      <section className="flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">My Schedule</h2>
          <button type="button" className="text-sm font-medium text-primary hover:underline">
            View all
          </button>
        </header>
        <div className="flex flex-col gap-3">
          {trip.itinerary.map((item) => (
            <ScheduleItemCard
              key={item.id}
              item={item}
              destination={destination}
              href={`/trips/${trip.id}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
