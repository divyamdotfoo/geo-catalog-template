import { Listings } from "@/server/data";
import { Listing } from "@/types/listing";
import { DataSource } from "./data-source";

export class ListingSource implements DataSource<Listing> {
  async getAll(): Promise<Listing[]> {
    return Listings.projects as Listing[];
  }
}

export const listingSource = new ListingSource();
