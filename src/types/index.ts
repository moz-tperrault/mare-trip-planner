export type Destination = {
  id: string;
  name: string;
  country: string;
  location: string;
  coords: { lat: number; lng: number };
  description: string;
  imageUrl: string;
  galleryUrls: string[];
  rating: number;
  reviewCount: number;
  pricePerPerson: number;
  friendsGoing: { name: string; avatarUrl: string }[];
  extraFriends: number;
};

export type ScheduleItem = {
  id: string;
  tripId: string;
  date: string;
  startTime?: string;
  endTime?: string;
  title: string;
  notes?: string;
  location?: string;
};

export type Message = {
  id: string;
  tripId: string;
  author: string;
  content: string;
  createdAt: string;
};

export type Trip = {
  id: string;
  destinationId: string;
  startDate: string;
  endDate: string;
  notes: string;
  itinerary: ScheduleItem[];
};
