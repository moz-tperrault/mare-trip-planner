import Link from "next/link";
import { redirect } from "next/navigation";
import { fetchDestinations, saveTrip } from "@/lib/supabase";

export default async function NewTripPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [destinations, sp] = await Promise.all([
    fetchDestinations(),
    searchParams,
  ]);

  async function createTrip(formData: FormData) {
    "use server";
    const destinationSlug = String(formData.get("destination") ?? "");
    const startDate = String(formData.get("startDate") ?? "");
    const endDate = String(formData.get("endDate") ?? "");
    const notes = String(formData.get("notes") ?? "").trim() || null;

    if (!destinationSlug || !startDate || !endDate) {
      redirect("/trips/new?error=" + encodeURIComponent("All required fields must be filled."));
    }
    if (new Date(endDate) < new Date(startDate)) {
      redirect("/trips/new?error=" + encodeURIComponent("End date must be on or after the start date."));
    }

    const result = await saveTrip({ destinationSlug, startDate, endDate, notes });
    if ("error" in result) {
      redirect("/trips/new?error=" + encodeURIComponent(result.error));
    }
    redirect(`/trips/${result.id}/schedule`);
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-12 md:gap-16">
      <header className="flex flex-col gap-3 pt-2">
        <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
          Plan a journey
        </p>
        <h1 className="text-5xl font-light leading-[1.05] tracking-tight md:text-6xl">
          A few quiet
          <em className="not-italic text-action"> details.</em>
        </h1>
        <p className="max-w-prose text-base leading-relaxed text-muted-foreground md:text-lg">
          Your concierge will hold the rest. We&apos;ll confirm availability and
          arrival within the hour.
        </p>
      </header>

      {sp?.error && (
        <p className="rounded-2xl border border-destructive/30 bg-destructive/10 px-5 py-4 text-sm text-destructive">
          {sp.error}
        </p>
      )}

      <form action={createTrip} className="flex flex-col gap-8">
        <Field label="Destination" htmlFor="destination">
          <select
            id="destination"
            name="destination"
            required
            defaultValue=""
            className="h-12 w-full appearance-none rounded-2xl border-none bg-muted px-4 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="" disabled>
              Choose a retreat…
            </option>
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} · {d.country}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="Arrival" htmlFor="startDate">
            <input
              id="startDate"
              name="startDate"
              type="date"
              required
              className="h-12 w-full rounded-2xl border-none bg-muted px-4 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>
          <Field label="Departure" htmlFor="endDate">
            <input
              id="endDate"
              name="endDate"
              type="date"
              required
              className="h-12 w-full rounded-2xl border-none bg-muted px-4 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>
        </div>

        <Field label="Notes" htmlFor="notes" optional>
          <textarea
            id="notes"
            name="notes"
            rows={5}
            placeholder="Anything we should know — a quiet anniversary, a long sabbatical, a private celebration…"
            className="w-full rounded-2xl border-none bg-muted px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </Field>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/trips"
            className="text-sm tracking-wide text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium tracking-wide text-primary-foreground transition hover:bg-primary/90"
          >
            Hold this journey
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="flex items-baseline gap-2 text-base font-medium tracking-wide">
        {label}
        {optional && (
          <span className="text-xs tracking-[0.2em] text-muted-foreground">
            OPTIONAL
          </span>
        )}
      </span>
      {children}
    </label>
  );
}
