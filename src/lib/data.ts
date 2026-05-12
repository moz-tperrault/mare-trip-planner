import type { Destination, Message, ScheduleItem, Trip } from "@/types";

const companions = [
  { name: "Aria", avatarUrl: "https://i.pravatar.cc/96?img=47" },
  { name: "Ben", avatarUrl: "https://i.pravatar.cc/96?img=12" },
  { name: "Cleo", avatarUrl: "https://i.pravatar.cc/96?img=32" },
  { name: "Dani", avatarUrl: "https://i.pravatar.cc/96?img=15" },
];

export const destinations: Destination[] = [
  {
    id: "casa-del-mare",
    name: "Casa del Mare",
    country: "Amalfi Coast, Italy",
    location: "Praiano, Salerno",
    coords: { lat: 40.6094, lng: 14.535 },
    description:
      "A cliffside villa above the Tyrrhenian — lemon groves, linen sheets, and an infinity pool that disappears into the sea at golden hour. Days move at the speed of the tide.",
    imageUrl:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=75",
    galleryUrls: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1200&q=75",
    ],
    rating: 4.9,
    reviewCount: 421,
    pricePerPerson: 980,
    friendsGoing: companions.slice(0, 2),
    extraFriends: 11,
  },
  {
    id: "olive-grove-estate",
    name: "Olive Grove Estate",
    country: "Tuscany, Italy",
    location: "Castelfalfi, Pisa",
    coords: { lat: 43.505, lng: 10.7975 },
    description:
      "A restored stone borgo set in 1,100 hectares of olive groves and forest. Long lunches, cold-pressed mornings, and an unhurried walk to the village for espresso.",
    imageUrl:
      "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1600&q=75",
    galleryUrls: [
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1490604001847-b712b0c2f967?auto=format&fit=crop&w=1200&q=75",
    ],
    rating: 4.8,
    reviewCount: 286,
    pricePerPerson: 740,
    friendsGoing: companions.slice(1, 3),
    extraFriends: 8,
  },
  {
    id: "quiet-reef",
    name: "The Quiet Reef",
    country: "North Malé Atoll, Maldives",
    location: "Baros Lagoon",
    coords: { lat: 4.2833, lng: 73.4317 },
    description:
      "An overwater suite where the floorboards open onto turquoise. No clocks, no Wi-Fi past the threshold — only reef breakfasts, free-diving lessons, and bioluminescent nights.",
    imageUrl:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=75",
    galleryUrls: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1200&q=75",
    ],
    rating: 4.9,
    reviewCount: 1142,
    pricePerPerson: 1480,
    friendsGoing: companions.slice(0, 3),
    extraFriends: 22,
  },
  {
    id: "marsila-springs",
    name: "Marsila Springs",
    country: "Berkshires, USA",
    location: "Stockbridge, Massachusetts",
    coords: { lat: 42.2767, lng: -73.317 },
    description:
      "A wooded sanctuary of cedar saunas, salt grottoes, and silent breakfasts. Curated by Miraval-trained practitioners; designed for the digital detox you keep postponing.",
    imageUrl:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1600&q=75",
    galleryUrls: [
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=75",
    ],
    rating: 4.8,
    reviewCount: 537,
    pricePerPerson: 690,
    friendsGoing: companions.slice(2, 4),
    extraFriends: 14,
  },
  {
    id: "auberge-saint-bertrand",
    name: "Auberge Saint-Bertrand",
    country: "Hautes-Pyrénées, France",
    location: "Saint-Bertrand-de-Comminges",
    coords: { lat: 43.0269, lng: 0.5781 },
    description:
      "A nineteenth-century mountain inn restored as a thermal retreat. Mineral baths, alpine wool, and the dignified quiet of a village that closes at sundown.",
    imageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=75",
    galleryUrls: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=75",
    ],
    rating: 4.7,
    reviewCount: 312,
    pricePerPerson: 520,
    friendsGoing: companions.slice(0, 2),
    extraFriends: 6,
  },
  {
    id: "vondre-house",
    name: "The Vondré House",
    country: "Vestland, Norway",
    location: "Hardangerfjord",
    coords: { lat: 60.2444, lng: 6.5237 },
    description:
      "A glass-fronted cabin on the fjord with a wood-fired sauna, ice plunge, and a private dock. Northern light. Long silences. Suited to two.",
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=75",
    galleryUrls: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=75",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=75",
    ],
    rating: 4.9,
    reviewCount: 198,
    pricePerPerson: 1120,
    friendsGoing: companions.slice(1, 3),
    extraFriends: 4,
  },
];

export function getDestination(id: string): Destination | undefined {
  return destinations.find((d) => d.id === id);
}

export const trips: Trip[] = [
  {
    id: "trip-amalfi-2026",
    destinationId: "casa-del-mare",
    startDate: "2026-06-12",
    endDate: "2026-06-19",
    notes: "Slow week. One booked dinner, otherwise unscheduled by design.",
    itinerary: [
      {
        id: "a1",
        tripId: "trip-amalfi-2026",
        date: "2026-06-12",
        startTime: "16:00",
        endTime: "18:30",
        title: "Arrival & lemon-grove walk",
        location: "Praiano",
      },
      {
        id: "a2",
        tripId: "trip-amalfi-2026",
        date: "2026-06-13",
        startTime: "10:00",
        endTime: "13:00",
        title: "Coastal swim & long lunch",
        location: "Marina di Praia",
        notes: "Table held under the lemon trees at Da Armandino.",
      },
      {
        id: "a3",
        tripId: "trip-amalfi-2026",
        date: "2026-06-14",
        startTime: "17:30",
        endTime: "21:00",
        title: "Sunset sail to Positano",
        location: "Ammoudi Bay",
      },
    ],
  },
  {
    id: "trip-fjord-2026",
    destinationId: "vondre-house",
    startDate: "2026-10-04",
    endDate: "2026-10-10",
    notes: "Sauna nightly. Phones in the drawer after seven.",
    itinerary: [
      {
        id: "f1",
        tripId: "trip-fjord-2026",
        date: "2026-10-04",
        startTime: "12:00",
        endTime: "14:00",
        title: "Fjord arrival & private dock",
        location: "Hardangerfjord",
      },
      {
        id: "f2",
        tripId: "trip-fjord-2026",
        date: "2026-10-05",
        startTime: "09:00",
        endTime: "11:00",
        title: "Morning kayak in the still",
        location: "Vondré inlet",
      },
    ],
  },
];

export function getTrip(id: string): Trip | undefined {
  return trips.find((t) => t.id === id);
}

export function getTripSchedule(tripId: string): ScheduleItem[] {
  return getTrip(tripId)?.itinerary ?? [];
}

export const tripMessages: Record<string, Message[]> = {
  "trip-amalfi-2026": [
    {
      id: "m1",
      tripId: "trip-amalfi-2026",
      author: "Leonardo",
      content:
        "I have the table at Da Armandino for the 13th — should I move it earlier so we have time for the cliff walk after?",
      createdAt: "2026-04-22T19:14:00Z",
    },
    {
      id: "m2",
      tripId: "trip-amalfi-2026",
      author: "Aria",
      content: "Yes — earlier feels right. I want the sea light on the way back.",
      createdAt: "2026-04-22T19:31:00Z",
    },
  ],
  "trip-fjord-2026": [
    {
      id: "m3",
      tripId: "trip-fjord-2026",
      author: "Ben",
      content: "Aurora forecast looks generous around the 7th. Sauna first, sky after.",
      createdAt: "2026-09-18T08:02:00Z",
    },
  ],
};

export type ConversationPreview = {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  lastMessageAt: string;
  unread: number;
  online: boolean;
};

export const conversations: ConversationPreview[] = [
  {
    id: "aria",
    name: "Aria Patel",
    avatarUrl: "https://i.pravatar.cc/96?img=47",
    lastMessage: "Yes — earlier feels right. I want the sea light on the way back.",
    lastMessageAt: "2026-04-22T19:31:00Z",
    unread: 2,
    online: true,
  },
  {
    id: "concierge",
    name: "Maré Concierge",
    avatarUrl: "https://i.pravatar.cc/96?img=68",
    lastMessage: "Your Casa del Mare arrival is confirmed. Linen menu attached.",
    lastMessageAt: "2026-04-21T14:08:00Z",
    unread: 0,
    online: true,
  },
  {
    id: "ben",
    name: "Ben Akiyama",
    avatarUrl: "https://i.pravatar.cc/96?img=12",
    lastMessage: "Aurora forecast looks generous around the 7th.",
    lastMessageAt: "2026-04-21T08:31:00Z",
    unread: 0,
    online: false,
  },
  {
    id: "cleo",
    name: "Cleo Marquez",
    avatarUrl: "https://i.pravatar.cc/96?img=32",
    lastMessage: "What feels right for day two — the salt grotto or the silent breakfast?",
    lastMessageAt: "2026-04-20T11:45:00Z",
    unread: 1,
    online: true,
  },
];

export type ChatMessage = {
  id: string;
  authorId: "me" | string;
  content: string;
  createdAt: string;
};

export const chatThreads: Record<string, ChatMessage[]> = {
  aria: [
    {
      id: "c1",
      authorId: "aria",
      content: "Did you confirm the sail for the 14th?",
      createdAt: "2026-04-22T18:12:00Z",
    },
    {
      id: "c2",
      authorId: "me",
      content: "Held it. 5pm departure. We dock for dinner.",
      createdAt: "2026-04-22T18:21:00Z",
    },
    {
      id: "c3",
      authorId: "aria",
      content: "Yes — earlier feels right. I want the sea light on the way back.",
      createdAt: "2026-04-22T19:31:00Z",
    },
  ],
  concierge: [
    {
      id: "c4",
      authorId: "concierge",
      content: "Your Casa del Mare arrival is confirmed. Linen menu attached.",
      createdAt: "2026-04-21T14:08:00Z",
    },
  ],
  ben: [
    {
      id: "c5",
      authorId: "ben",
      content: "Aurora forecast looks generous around the 7th. Sauna first, sky after.",
      createdAt: "2026-04-21T08:31:00Z",
    },
  ],
  cleo: [
    {
      id: "c6",
      authorId: "cleo",
      content: "What feels right for day two — the salt grotto or the silent breakfast?",
      createdAt: "2026-04-20T11:45:00Z",
    },
  ],
};

export const notifications = [
  {
    id: "n1",
    title: "Reservation confirmed",
    body: "Your stay at Casa del Mare is held. Linen menu attached.",
    timestamp: "2026-05-10T14:02:00Z",
    icon: "payment" as const,
  },
  {
    id: "n2",
    title: "Aria added to your itinerary",
    body: "Coastal swim & long lunch — Marina di Praia.",
    timestamp: "2026-05-09T08:21:00Z",
    icon: "trip" as const,
  },
  {
    id: "n3",
    title: "A note from Cleo",
    body: "What feels right for day two — the salt grotto or the silent breakfast?",
    timestamp: "2026-04-20T11:45:00Z",
    icon: "message" as const,
  },
  {
    id: "n4",
    title: "Soft weather window",
    body: "Hardangerfjord is forecast clear and still on the 7th.",
    timestamp: "2026-04-18T07:11:00Z",
    icon: "weather" as const,
  },
];
