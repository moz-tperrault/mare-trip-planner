import Link from "next/link";
import { ConciergeLetter } from "@/components/concierge-letter";
import { DestinationCard } from "@/components/destination-card";
import { Reveal } from "@/components/motion/reveal";
import { Stagger } from "@/components/motion/stagger";
import { fetchDestinations } from "@/lib/supabase";

export default async function HomePage() {
  const destinations = await fetchDestinations();
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <section className="flex flex-col gap-6 pt-6 md:pt-12">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
            A slow travel atelier
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="max-w-3xl text-5xl font-light leading-[1.02] tracking-tight text-foreground md:text-7xl lg:text-[88px]">
            Quiet places,
            <br />
            <em className="not-italic text-action">slowly visited.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            A curated collection of wellness retreats, spa resorts, and
            slow-travel sanctuaries. Held for you by our concierge — never
            algorithmic.
          </p>
        </Reveal>
      </section>

      <ConciergeLetter />

      <section className="flex flex-col gap-8">
        <Reveal>
          <header className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                This season
              </p>
              <h2 className="text-3xl font-light tracking-tight md:text-4xl">
                Editor&apos;s picks
              </h2>
            </div>
            <Link
              href="/destinations"
              className="text-sm tracking-wide text-action hover:underline"
            >
              See the collection →
            </Link>
          </header>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </Stagger>
      </section>
    </div>
  );
}
