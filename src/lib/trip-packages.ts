import type { Destination } from "@/types";
import { destinations } from "./data";

export type TripPackage = {
  id: string;
  name: string;
  destinationId: Destination["id"];
  imageUrl: string;
  startDate: string;
  endDate: string;
  rating: number;
  peopleJoined: number;
  price: number;
};

const byId = (id: string) => destinations.find((d) => d.id === id)!;

export const tripPackages: TripPackage[] = [
  {
    id: "pkg-casa-del-mare",
    name: "Slow Amalfi",
    destinationId: "casa-del-mare",
    imageUrl: byId("casa-del-mare").imageUrl,
    startDate: "2026-06-12",
    endDate: "2026-06-19",
    rating: 4.9,
    peopleJoined: 14,
    price: 4900,
  },
  {
    id: "pkg-olive-grove",
    name: "Tuscan Restoration",
    destinationId: "olive-grove-estate",
    imageUrl: byId("olive-grove-estate").imageUrl,
    startDate: "2026-09-08",
    endDate: "2026-09-15",
    rating: 4.8,
    peopleJoined: 9,
    price: 3700,
  },
  {
    id: "pkg-quiet-reef",
    name: "The Quiet Reef Sabbatical",
    destinationId: "quiet-reef",
    imageUrl: byId("quiet-reef").imageUrl,
    startDate: "2026-11-04",
    endDate: "2026-11-12",
    rating: 4.9,
    peopleJoined: 18,
    price: 9200,
  },
  {
    id: "pkg-marsila",
    name: "Silent Berkshires",
    destinationId: "marsila-springs",
    imageUrl: byId("marsila-springs").imageUrl,
    startDate: "2026-10-02",
    endDate: "2026-10-08",
    rating: 4.8,
    peopleJoined: 12,
    price: 3400,
  },
  {
    id: "pkg-vondre",
    name: "Northern Light Retreat",
    destinationId: "vondre-house",
    imageUrl: byId("vondre-house").imageUrl,
    startDate: "2027-01-18",
    endDate: "2027-01-24",
    rating: 4.9,
    peopleJoined: 6,
    price: 6200,
  },
];
