import { notFound } from "next/navigation";
import { Clock, MapPin, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/page-header";
import { getDestination } from "@/lib/data";

export default async function DestinationGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const destination = getDestination(id);
  if (!destination) notFound();

  const photos = [destination.imageUrl, ...destination.galleryUrls];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="View" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((url, i) => (
          <figure
            key={i}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={`${destination.name} ${i + 1}`} className="size-full object-cover" />
          </figure>
        ))}
      </div>

      <section className="rounded-3xl bg-foreground/95 p-6 text-background md:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">{destination.name}</h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-background/80">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" />
                {destination.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" />
                45 minutes
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Star className="size-4 fill-star text-star" />
                {destination.rating}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="flex -space-x-2">
              {destination.friendsGoing.slice(0, 4).map((f) => (
                <Avatar key={f.name} className="size-7 border-2 border-foreground">
                  <AvatarImage src={f.avatarUrl} alt={f.name} />
                  <AvatarFallback className="text-[10px]">{f.name[0]}</AvatarFallback>
                </Avatar>
              ))}
              {destination.extraFriends > 0 && (
                <span className="z-10 inline-flex size-7 items-center justify-center rounded-full border-2 border-foreground bg-background text-[10px] font-medium text-foreground">
                  +{destination.extraFriends}
                </span>
              )}
            </div>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              See On The Map
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
