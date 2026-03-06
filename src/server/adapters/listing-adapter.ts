import { Listing } from "@/types/listing";
import { MapEntity } from "@/types/map-entity";

export interface DomainAdapter<TInput, TOutput> {
  adapt(item: TInput): TOutput;
}

export type AdaptedListing = Listing & MapEntity;

export class ListingAdapter implements DomainAdapter<Listing, AdaptedListing> {
  adapt(item: Listing): AdaptedListing {
    return {
      ...item,
      title: item.name,
      category: item.type,
      locationLabel: item.micromarket,
      coordinates: {
        latitude: item.latitude,
        longitude: item.longitude,
      },
      imageUrl: item.image,
      imageAlt: item.alt,
      minValue: item.minPrice,
      maxValue: item.maxPrice,
    };
  }
}

export const listingAdapter = new ListingAdapter();
