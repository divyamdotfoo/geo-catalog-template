import {
  Listing,
  SearchListingsParams,
  SearchListingsResult,
} from "@/types/listing";
import { DataSource } from "@/server/sources/data-source";
import { listingSource } from "@/server/sources/listing-source";
import {
  AdaptedListing,
  DomainAdapter,
  listingAdapter,
} from "@/server/adapters/listing-adapter";

/**
 * Simulate database delay (200-300ms)
 */
const simulateDbDelay = async (): Promise<void> => {
  const randomDelay = 500 + Math.random() * 300;
  await new Promise((resolve) => setTimeout(resolve, randomDelay));
};

export class ListingService {
  private readonly PAGE_LIMIT = 10;
  private readonly source: DataSource<Listing>;
  private readonly adapter: DomainAdapter<Listing, AdaptedListing>;
  private readonly delayFn: () => Promise<void>;

  constructor(
    source: DataSource<Listing> = listingSource,
    adapter: DomainAdapter<Listing, AdaptedListing> = listingAdapter,
    delayFn: () => Promise<void> = simulateDbDelay
  ) {
    this.source = source;
    this.adapter = adapter;
    this.delayFn = delayFn;
  }

  private async getAdaptedListings(): Promise<AdaptedListing[]> {
    const rawData = await this.source.getAll();
    return rawData.map((listing) => this.adapter.adapt(listing));
  }

  async getTotalCount() {
    await this.delayFn();
    const data = await this.getAdaptedListings();
    return data.length;
  }

  async getUniqueListingTypes(): Promise<string[]> {
    await this.delayFn();
    const data = await this.getAdaptedListings();
    const typesSet = new Set(data.map((listing) => listing.category));
    const types = Array.from(typesSet);
    return types.sort();
  }

  async getUniqueMicromarkets(): Promise<string[]> {
    await this.delayFn();
    const data = await this.getAdaptedListings();
    const micromarketsSet = new Set(
      data.map((listing) => listing.locationLabel)
    );
    const micromarkets = Array.from(micromarketsSet);
    return micromarkets.sort();
  }

  async getPriceRange(): Promise<{ min: number; max: number }> {
    await this.delayFn();
    const data = await this.getAdaptedListings();
    const prices = data.flatMap((listing) => [listing.minValue, listing.maxValue]);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }

  async getById(id: number): Promise<Listing | null> {
    await this.delayFn();
    const data = await this.getAdaptedListings();
    const listing = data.find((l) => l.id === id);
    return listing || null;
  }

  async search(
    params: SearchListingsParams = {}
  ): Promise<SearchListingsResult> {
    const {
      city,
      micromarket,
      type,
      minPrice,
      maxPrice,
      name,
      page = 1,
      bounds,
      noPagination = false,
    } = params;

    await this.delayFn();
    const data = await this.getAdaptedListings();

    const filtered = data.filter((listing) => {
      // City filter
      if (city && listing.city.toLowerCase() !== city.toLowerCase()) {
        return false;
      }

      // Micromarket filter
      if (
        micromarket &&
        listing.locationLabel.toLowerCase() !== micromarket.toLowerCase()
      ) {
        return false;
      }

      // Type filter
      if (type && listing.category.toLowerCase() !== type.toLowerCase()) {
        return false;
      }

      // Price range filter
      if (minPrice !== undefined && listing.maxValue < minPrice) {
        return false;
      }

      if (maxPrice !== undefined && listing.minValue > maxPrice) {
        return false;
      }

      // Name search filter
      if (name && !listing.title.toLowerCase().includes(name.toLowerCase())) {
        return false;
      }

      // Map bounds filter
      if (bounds) {
        const { swLat, swLng, neLat, neLng } = bounds;
        if (
          listing.coordinates.latitude < swLat ||
          listing.coordinates.latitude > neLat ||
          listing.coordinates.longitude < swLng ||
          listing.coordinates.longitude > neLng
        ) {
          return false;
        }
      }

      return true;
    });

    const totalListings = filtered.length;

    // Return all results without pagination if noPagination is true
    if (noPagination) {
      return {
        listings: filtered,
        totalPages: 1,
        currentPage: 1,
        totalListings,
      };
    }

    const totalPages = Math.ceil(totalListings / this.PAGE_LIMIT);
    const startIndex = (page - 1) * this.PAGE_LIMIT;
    const endIndex = startIndex + this.PAGE_LIMIT;

    const listings = filtered.slice(startIndex, endIndex);

    return {
      listings,
      totalPages,
      currentPage: page,
      totalListings,
    };
  }
}

export const listingService = new ListingService();
