export interface Venue {
  id: number;
  title: string;
  category: string;
  neighborhood: string;
  city: string;
  minTicketPrice: number;
  maxTicketPrice: number;
  imageUrl: string;
  imageAlt: string;
  latitude: number;
  longitude: number;
}

export const Venues: Venue[] = [
  {
    id: 1,
    title: "Harbor Music Hall",
    category: "Concert",
    neighborhood: "Dockside",
    city: "Sample City",
    minTicketPrice: 2000,
    maxTicketPrice: 6500,
    imageUrl:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=640&auto=format&fit=crop",
    imageAlt: "Concert venue exterior with lights",
    latitude: 12.9612,
    longitude: 77.6388,
  },
  {
    id: 2,
    title: "CityTech Campus",
    category: "Coworking",
    neighborhood: "Central District",
    city: "Sample City",
    minTicketPrice: 1500,
    maxTicketPrice: 5000,
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=640&auto=format&fit=crop",
    imageAlt: "Coworking building entrance",
    latitude: 12.9754,
    longitude: 77.6021,
  },
  {
    id: 3,
    title: "Riverside Food Court",
    category: "Food",
    neighborhood: "Riverside",
    city: "Sample City",
    minTicketPrice: 300,
    maxTicketPrice: 2000,
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=640&auto=format&fit=crop",
    imageAlt: "Outdoor food market venue",
    latitude: 12.9448,
    longitude: 77.6217,
  },
];
