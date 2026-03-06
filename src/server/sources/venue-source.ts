import { Venues, Venue } from "@/server/data/venues";
import { DataSource } from "./data-source";

export class VenueSource implements DataSource<Venue> {
  async getAll(): Promise<Venue[]> {
    return Venues;
  }
}

export const venueSource = new VenueSource();
