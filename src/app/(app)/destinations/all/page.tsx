import { TripPackageCard } from "@/components/trip-package-card";
import { tripPackages } from "@/lib/trip-packages";

export default function CuratedRetreatsPage() {
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <header className="flex flex-col gap-4 pt-2">
        <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
          Curated retreats
        </p>
        <h1 className="max-w-2xl text-5xl font-light leading-[1.05] tracking-tight md:text-6xl">
          Itineraries
          <em className="not-italic text-action"> already considered.</em>
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Set dates. Set rhythm. Reservations and ground transfers held in advance.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {tripPackages.map((pkg) => (
          <TripPackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
