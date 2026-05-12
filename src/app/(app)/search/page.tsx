import Link from "next/link";
import { Search as SearchIcon, X } from "lucide-react";
import { DestinationCardCompact } from "@/components/destination-card-compact";
import { PageHeader } from "@/components/page-header";
import { destinations } from "@/lib/data";

export default function SearchPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Search"
        action={
          <Link
            href="/"
            className="block text-right text-sm font-semibold text-action hover:underline"
          >
            Cancel
          </Link>
        }
      />

      <label className="relative block">
        <span className="sr-only">Search places</span>
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search Places"
          className="h-12 w-full rounded-2xl border-none bg-muted pl-12 pr-12 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="button"
          aria-label="Filters"
          className="absolute right-2 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </label>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Search Places</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {destinations.map((d) => (
            <DestinationCardCompact key={d.id} destination={d} showRating={false} />
          ))}
        </div>
      </section>
    </div>
  );
}
