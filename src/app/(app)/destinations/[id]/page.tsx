import Link from "next/link";
import { notFound } from "next/navigation";
import { Bookmark, ChevronLeft, MapPin, Star } from "lucide-react";
import { DestinationMapLoader } from "@/components/destination-map-loader";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal } from "@/components/motion/reveal";
import { letterForSlug } from "@/lib/letters";
import { fetchDestinationBySlug } from "@/lib/supabase";

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = await fetchDestinationBySlug(id);
  if (!destination) notFound();

  const gallery = [destination.imageUrl, ...destination.galleryUrls].slice(0, 5);
  const letter = letterForSlug(id);

  return (
    <article className="-mt-8 flex flex-col gap-12 md:gap-16">
      <div className="relative overflow-hidden rounded-[28px]">
        <ParallaxImage
          src={destination.imageUrl}
          alt={destination.name}
          className="aspect-[4/5] w-full overflow-hidden sm:aspect-[3/2] md:aspect-[2/1]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/15 via-transparent to-foreground/40" />
        <div className="absolute inset-x-6 top-6 flex items-center justify-between gap-3 md:inset-x-8">
          <Link
            href="/destinations"
            aria-label="Back"
            className="inline-flex size-11 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur hover:bg-background"
          >
            <ChevronLeft className="size-5" strokeWidth={1.5} />
          </Link>
          <button
            type="button"
            aria-label="Save"
            className="inline-flex size-11 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur hover:bg-background"
          >
            <Bookmark className="size-5" strokeWidth={1.5} />
          </button>
        </div>
        <div className="absolute inset-x-6 bottom-6 flex flex-col gap-2 md:inset-x-10 md:bottom-10">
          <p className="text-xs tracking-[0.32em] text-background/80">
            {destination.country.toUpperCase()}
          </p>
          <h1 className="text-4xl font-light leading-[1.05] tracking-tight text-background md:text-6xl">
            {destination.name}
          </h1>
        </div>
      </div>

      <div className="grid gap-12 md:grid-cols-[1fr_320px] md:gap-16">
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-border/60 py-5 text-sm">
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4" strokeWidth={1.5} />
              {destination.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Star className="size-4 fill-star text-star" strokeWidth={1.5} />
              <span className="text-foreground">{destination.rating}</span>
              <span className="text-muted-foreground">
                · {destination.reviewCount.toLocaleString()} guests
              </span>
            </span>
            <span className="text-muted-foreground">
              From{" "}
              <span className="text-foreground">${destination.pricePerPerson.toLocaleString()}</span>
              {" "}/ night
            </span>
          </div>

          <Reveal>
            <section className="flex flex-col gap-5">
              <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                The stay
              </p>
              <p className="max-w-prose text-lg leading-relaxed text-foreground/85 md:text-xl">
                {destination.description}
              </p>
              <Link
                href={`/destinations/${destination.id}/gallery`}
                className="text-sm tracking-wide text-action hover:underline"
              >
                Read the full letter →
              </Link>
            </section>
          </Reveal>

          {letter && (
            <Reveal>
              <section className="flex flex-col gap-5 border-y border-border/60 py-12 md:py-16">
                <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                  A letter
                </p>
                <p className="max-w-prose text-xl font-light italic leading-[1.55] text-foreground/85 md:text-2xl">
                  {letter.body}
                </p>
                <p className="text-sm tracking-wide text-action">
                  — {letter.signature} · {letter.role}
                </p>
              </section>
            </Reveal>
          )}

          <Reveal>
          <section className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
              In view
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.slice(0, 4).map((url, i) => (
                <Link
                  key={i}
                  href={`/destinations/${destination.id}/gallery`}
                  className="relative aspect-square overflow-hidden rounded-2xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="" className="size-full object-cover" />
                  {i === 3 && destination.galleryUrls.length + 1 > 4 && (
                    <span className="absolute inset-0 flex items-center justify-center bg-foreground/30 text-sm tracking-wide text-background backdrop-blur-sm">
                      +{destination.galleryUrls.length + 1 - 4} more
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </section>
          </Reveal>

          <Reveal>
          <section className="flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
              Where it is
            </p>
            <DestinationMapLoader
              lat={destination.coords.lat}
              lng={destination.coords.lng}
              name={destination.name}
              location={destination.location}
            />
            <p className="text-sm text-muted-foreground">
              {destination.location} · {destination.country}
            </p>
          </section>
          </Reveal>
        </div>

        <aside className="flex flex-col gap-5 self-start rounded-[28px] border border-border bg-card p-7 md:sticky md:top-28">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
              From
            </span>
            <span className="text-4xl font-light tracking-tight">
              ${destination.pricePerPerson.toLocaleString()}
              <span className="text-base font-normal text-muted-foreground"> / night</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Held by your concierge. We confirm availability within the hour.
          </p>
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary text-sm font-medium tracking-wide text-primary-foreground transition hover:bg-primary/90"
          >
            Reserve a stay
          </button>
          <Link
            href={`/destinations/${destination.id}/gallery`}
            className="text-center text-sm tracking-wide text-action hover:underline"
          >
            Speak to a concierge
          </Link>
        </aside>
      </div>
    </article>
  );
}
