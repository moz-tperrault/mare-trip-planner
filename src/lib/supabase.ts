import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type { Destination } from "@/types";

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
