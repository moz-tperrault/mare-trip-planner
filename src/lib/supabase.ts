import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type { Destination, Trip } from "@/types";

type DestinationRow = {
  id: string;
  slug: string;
  name: string;
  country: string;
  location: string;
  description: string;
  image_url: string;
  gallery_urls: string[] | null;
  latitude: number;
  longitude: number;
  rating: number | string;
  review_count: number;
  price_per_person: number;
};

function toDestination(row: DestinationRow): Destination {
  return {
    id: row.slug,
    name: row.name,
    country: row.country,
    location: row.location,
    coords: { lat: row.latitude, lng: row.longitude },
    description: row.description,
    imageUrl: row.image_url,
    galleryUrls: row.gallery_urls ?? [],
    rating: Number(row.rating),
    reviewCount: row.review_count,
    pricePerPerson: row.price_per_person,
    friendsGoing: [],
    extraFriends: 0,
  };
}

async function getClient() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function fetchDestinations(): Promise<Destination[]> {
  const supabase = await getClient();
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .order("price_per_person", { ascending: true });

  if (error) {
    console.error("[supabase] fetchDestinations failed", error);
    return [];
  }
  return (data ?? []).map(toDestination);
}

export async function fetchDestinationBySlug(
  slug: string,
): Promise<Destination | null> {
  const supabase = await getClient();
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[supabase] fetchDestinationBySlug failed", error);
    return null;
  }
  return data ? toDestination(data) : null;
}

type TripRow = {
  id: string;
  destination_id: string | null;
  destination_slug: string;
  start_date: string;
  end_date: string;
  notes: string | null;
  created_at: string;
};

function toTrip(row: TripRow): Trip {
  return {
    id: row.id,
    destinationId: row.destination_slug,
    startDate: row.start_date,
    endDate: row.end_date,
    notes: row.notes ?? "",
    itinerary: [],
  };
}

export async function fetchTrips(): Promise<Trip[]> {
  const supabase = await getClient();
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .order("start_date", { ascending: true });

  if (error) {
    console.error("[supabase] fetchTrips failed", error);
    return [];
  }
  return (data ?? []).map(toTrip);
}

export async function fetchTripById(id: string): Promise<Trip | null> {
  const supabase = await getClient();
  const { data, error } = await supabase
    .from("trips")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[supabase] fetchTripById failed", error);
    return null;
  }
  return data ? toTrip(data) : null;
}

export type NewTripInput = {
  destinationSlug: string;
  startDate: string;
  endDate: string;
  notes?: string | null;
};

export async function saveTrip(
  input: NewTripInput,
): Promise<{ id: string } | { error: string }> {
  const supabase = await getClient();

  // Resolve the destination row so we can store both the slug and FK.
  const { data: destination, error: destError } = await supabase
    .from("destinations")
    .select("id, slug")
    .eq("slug", input.destinationSlug)
    .maybeSingle();

  if (destError || !destination) {
    return { error: "Destination not found" };
  }

  const { data, error } = await supabase
    .from("trips")
    .insert({
      destination_id: destination.id,
      destination_slug: destination.slug,
      start_date: input.startDate,
      end_date: input.endDate,
      notes: input.notes ?? null,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[supabase] saveTrip failed", error);
    return { error: error?.message ?? "Insert failed" };
  }
  return { id: data.id };
}
