export interface MapCoordinates {
  latitude: number;
  longitude: number;
}

export interface MapBounds {
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
}

export interface MapEntity {
  id: number;
  title: string;
  category: string;
  locationLabel: string;
  city: string;
  coordinates: MapCoordinates;
  imageUrl: string;
  imageAlt: string;
  minValue: number;
  maxValue: number;
}

export interface SearchFilters {
  city?: string;
  locationLabel?: string;
  category?: string;
  minValue?: number;
  maxValue?: number;
  query?: string;
  page?: number;
  bounds?: MapBounds;
  noPagination?: boolean;
}
