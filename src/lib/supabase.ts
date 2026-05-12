import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type { Destination, ScheduleItem, Trip } from "@/types";

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

type ScheduleItemRow = {
  id: string;
  trip_id: string;
  date: string;
  start_time: string | null;
  end_time: string | null;
  title: string;
  location: string | null;
  notes: string | null;
};

function toScheduleItem(row: ScheduleItemRow): ScheduleItem {
  return {
    id: row.id,
    tripId: row.trip_id,
    date: row.date,
    startTime: row.start_time ?? undefined,
    endTime: row.end_time ?? undefined,
    title: row.title,
    location: row.location ?? undefined,
    notes: row.notes ?? undefined,
  };
}

export async function fetchScheduleItems(tripId: string): Promise<ScheduleItem[]> {
  const supabase = await getClient();
  const { data, error } = await supabase
    .from("schedule_items")
    .select("*")
    .eq("trip_id", tripId)
    .order("date", { ascending: true })
    .order("start_time", { ascending: true, nullsFirst: true });

  if (error) {
    console.error("[supabase] fetchScheduleItems failed", error);
    return [];
  }
  return (data ?? []).map(toScheduleItem);
}

export type NewScheduleItemInput = {
  tripId: string;
  date: string;
  startTime?: string | null;
  endTime?: string | null;
  title: string;
  location?: string | null;
  notes?: string | null;
};

export async function saveScheduleItem(
  input: NewScheduleItemInput,
): Promise<{ id: string } | { error: string }> {
  const supabase = await getClient();
  const { data, error } = await supabase
    .from("schedule_items")
    .insert({
      trip_id: input.tripId,
      date: input.date,
      start_time: input.startTime || null,
      end_time: input.endTime || null,
      title: input.title,
      location: input.location || null,
      notes: input.notes || null,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[supabase] saveScheduleItem failed", error);
    return { error: error?.message ?? "Insert failed" };
  }
  return { id: data.id };
}

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
