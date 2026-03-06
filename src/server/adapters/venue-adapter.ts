import { MapEntity } from "@/types/map-entity";
import { DomainAdapter } from "./listing-adapter";
import { Venue } from "@/server/data/venues";

export type VenueEntity = MapEntity & { raw: Venue };

export class VenueAdapter implements DomainAdapter<Venue, VenueEntity> {
  adapt(item: Venue): VenueEntity {
    return {
      id: item.id,
      title: item.title,
      category: item.category,
      locationLabel: item.neighborhood,
      city: item.city,
      coordinates: {
        latitude: item.latitude,
        longitude: item.longitude,
      },
      imageUrl: item.imageUrl,
      imageAlt: item.imageAlt,
      minValue: item.minTicketPrice,
      maxValue: item.maxTicketPrice,
      raw: item,
    };
  }
}

export const venueAdapter = new VenueAdapter();
