import { SVGProps } from "react";
import { MapEntity, SearchFilters } from "./map-entity";

export enum ListingType {
  APARTMENT = "Apartment",
  VILLA = "Villa",
  PLOT = "Plot",
  ROW_HOUSE = "Row House",
}

export enum ListingStatus {
  AVAILABLE = "available",
  SOLD_OUT = "soldOut",
}

export interface Listing extends Partial<MapEntity> {
  id: number;
  name: string;
  minPrice: number;
  maxPrice: number;
  typologies: string[];
  minSaleableArea: number;
  maxSaleableArea: number;
  micromarket: string;
  possessionDate: string;
  propscore: number;
  city: string;
  slug: string;
  image: string;
  isWishlisted?: boolean;
  type: ListingType;
  projectStatus: ListingStatus;
  alt: string;
  latitude: number;
  longitude: number;
}

export interface SearchListingsParams extends SearchFilters {
  micromarket?: string;
  type?: ListingType;
  minPrice?: number;
  maxPrice?: number;
  name?: string;
  limit?: number;
}

export interface SearchListingsResult {
  listings: Listing[];
  totalPages: number;
  currentPage: number;
  totalListings: number;
}

export interface ListingsData {
  projects: Listing[];
  developers: unknown[];
  micromarkets: unknown[];
  currentPage: number;
  eoiProjects: unknown[];
  totalPages: number;
  totalProjects: number;
}

export interface LocationType {
  name: string;
  lat: number;
  lon: number;
  distance: number;
  duration: number;
  googlePlaceId?: string;
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type { MapBounds } from "./map-entity";
