import { DestinationCardCompact } from "@/components/destination-card-compact";
import { destinations } from "@/lib/data";

export default function CollectionPage() {
  return (
    <div className="flex flex-col gap-16 md:gap-20">
      <header className="flex flex-col gap-4 pt-2">
        <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
          The collection
        </p>
        <h1 className="max-w-2xl text-5xl font-light leading-[1.05] tracking-tight md:text-6xl">
          A small archive of
          <br />
          <em className="not-italic text-action">unhurried places.</em>
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Held by our concierge, refreshed each season. Every entry has been
          stayed in.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        {destinations.map((d) => (
          <DestinationCardCompact key={d.id} destination={d} />
        ))}
      </div>
    </div>
  );
}
