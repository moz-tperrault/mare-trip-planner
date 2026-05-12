import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { Clock, MapPin, Plus } from "lucide-react";
import { DateStrip } from "@/components/date-strip";
import { PageHeader } from "@/components/page-header";
import {
  fetchDestinationBySlug,
  fetchScheduleItems,
  fetchTripById,
  saveScheduleItem,
} from "@/lib/supabase";
import type { ScheduleItem } from "@/types";

const longDate = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const fullDate = new Intl.DateTimeFormat("en-US", {
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

  const [destination, items] = await Promise.all([
    fetchDestinationBySlug(trip.destinationId),
    fetchScheduleItems(trip.id),
  ]);

  const startDate = new Date(trip.startDate);

  async function addItem(formData: FormData) {
    "use server";
    const date = String(formData.get("date") ?? "");
    const title = String(formData.get("title") ?? "").trim();
    if (!date || !title) {
      redirect(`/trips/${id}/schedule?error=${encodeURIComponent("Date and title are required.")}`);
    }

    const startTime = String(formData.get("startTime") ?? "").trim() || null;
    const endTime = String(formData.get("endTime") ?? "").trim() || null;
    const location = String(formData.get("location") ?? "").trim() || null;
    const notes = String(formData.get("notes") ?? "").trim() || null;

    const result = await saveScheduleItem({
      tripId: id,
      date,
      title,
      startTime,
      endTime,
      location,
      notes,
    });
    if ("error" in result) {
      redirect(`/trips/${id}/schedule?error=${encodeURIComponent(result.error)}`);
    }
    revalidatePath(`/trips/${id}/schedule`);
  }

  const itemsByDate = items.reduce<Record<string, ScheduleItem[]>>(
    (acc, item) => {
      (acc[item.date] ||= []).push(item);
      return acc;
    },
    {},
  );

  return (
    <div className="flex flex-col gap-10">
      <PageHeader title="Schedule" />

      <header className="flex flex-col gap-2">
        <p className="text-xs tracking-[0.32em] text-muted-foreground">
          {destination?.country.split(",").pop()?.trim().toUpperCase() ?? "JOURNEY"}
        </p>
        <h1 className="text-4xl font-light leading-[1.05] tracking-tight md:text-5xl">
          {destination?.name ?? "Your journey"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {fullDate.format(new Date(trip.startDate))} → {fullDate.format(new Date(trip.endDate))}
        </p>
        {trip.notes && (
          <p className="max-w-prose pt-2 text-base italic leading-relaxed text-muted-foreground">
            “{trip.notes}”
          </p>
        )}
      </header>

      <DateStrip anchorDate={startDate} selectedDate={startDate} />

      <section className="flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <h2 className="text-xl font-light tracking-tight md:text-2xl">My schedule</h2>
          <span className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            {items.length === 0
              ? "Nothing held yet"
              : `${items.length} held`}
          </span>
        </header>

        {items.length === 0 ? (
          <p className="max-w-prose rounded-[20px] border border-border bg-card/60 px-5 py-6 text-sm leading-relaxed text-muted-foreground">
            Your concierge will populate the itinerary once arrival is confirmed.
            Until then, the days are yours — or use the form below to hold
            something in.
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            {Object.entries(itemsByDate).map(([date, dayItems]) => (
              <div key={date} className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                  {longDate.format(new Date(date))}
                </p>
                <div className="flex flex-col">
                  {dayItems.map((item) => (
                    <ItineraryRow key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <details className="group rounded-[24px] border border-border bg-card/60 px-6 py-5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-base font-light tracking-wide text-foreground">
          <span className="flex items-center gap-3">
            <Plus
              className="size-4 transition-transform group-open:rotate-45"
              strokeWidth={1.5}
            />
            Add to itinerary
          </span>
          <span className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            {longDate.format(new Date(trip.startDate))} →{" "}
            {longDate.format(new Date(trip.endDate))}
          </span>
        </summary>

        <form action={addItem} className="mt-6 flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_auto]">
            <Field label="Date">
              <input
                type="date"
                name="date"
                required
                min={trip.startDate}
                max={trip.endDate}
                defaultValue={trip.startDate}
                className="h-11 w-full rounded-xl border-none bg-muted px-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </Field>
            <Field label="Starts">
              <input
                type="time"
                name="startTime"
                className="h-11 w-full rounded-xl border-none bg-muted px-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </Field>
            <Field label="Ends">
              <input
                type="time"
                name="endTime"
                className="h-11 w-full rounded-xl border-none bg-muted px-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </Field>
          </div>

          <Field label="What you're holding">
            <input
              type="text"
              name="title"
              required
              placeholder="Sunset sail · Vineyard tour · Hammam morning…"
              className="h-11 w-full rounded-xl border-none bg-muted px-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>

          <Field label="Where" optional>
            <input
              type="text"
              name="location"
              placeholder="Marina di Praia, Ammoudi Bay…"
              className="h-11 w-full rounded-xl border-none bg-muted px-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>

          <Field label="A short note" optional>
            <textarea
              name="notes"
              rows={3}
              placeholder="Booked for 4 · No reservation needed · Confirmation #…"
              className="w-full rounded-xl border-none bg-muted px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>

          <div className="flex items-center justify-end pt-1">
            <button
              type="submit"
              className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-medium tracking-wide text-primary-foreground transition hover:bg-primary/90"
            >
              Hold this
            </button>
          </div>
        </form>
      </details>
    </div>
  );
}

function ItineraryRow({ item }: { item: ScheduleItem }) {
  return (
    <article className="flex items-start gap-5 border-b border-border/60 py-4 last:border-b-0">
      <div className="flex w-20 shrink-0 flex-col gap-1 pt-1">
        {item.startTime ? (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3" strokeWidth={1.5} />
            {item.startTime.slice(0, 5)}
          </span>
        ) : (
          <span className="text-xs italic text-muted-foreground">all day</span>
        )}
        {item.endTime && (
          <span className="pl-4 text-[10px] text-muted-foreground">
            – {item.endTime.slice(0, 5)}
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="text-lg font-light tracking-tight">{item.title}</h3>
        {item.location && (
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5" strokeWidth={1.5} />
            {item.location}
          </span>
        )}
        {item.notes && (
          <p className="max-w-prose pt-1 text-sm italic leading-relaxed text-muted-foreground">
            {item.notes}
          </p>
        )}
      </div>
    </article>
  );
}

function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-baseline gap-2 text-xs uppercase tracking-[0.28em] text-muted-foreground">
        {label}
        {optional && (
          <span className="text-[10px] tracking-[0.24em]">opt.</span>
        )}
      </span>
      {children}
    </label>
  );
}
