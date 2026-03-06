import { describe, expect, it } from "vitest";
import {
  SEARCH_PARAM_KEYS,
  filtersToSearchParams,
  parseSearchParams,
} from "./search-params";

describe("search params utils", () => {
  it("parses URLSearchParams into filter state", () => {
    const params = new URLSearchParams({
      [SEARCH_PARAM_KEYS.MICROMARKET]: "Downtown",
      [SEARCH_PARAM_KEYS.TYPE]: "Apartment",
      [SEARCH_PARAM_KEYS.MIN_PRICE]: "100",
      [SEARCH_PARAM_KEYS.MAX_PRICE]: "500",
      [SEARCH_PARAM_KEYS.NAME]: "Skyline",
      [SEARCH_PARAM_KEYS.SW_LAT]: "10",
      [SEARCH_PARAM_KEYS.SW_LNG]: "20",
      [SEARCH_PARAM_KEYS.NE_LAT]: "30",
      [SEARCH_PARAM_KEYS.NE_LNG]: "40",
    });

    const parsed = parseSearchParams(params);

    expect(parsed.micromarket).toBe("Downtown");
    expect(parsed.type).toBe("Apartment");
    expect(parsed.minPrice).toBe(100);
    expect(parsed.maxPrice).toBe(500);
    expect(parsed.name).toBe("Skyline");
    expect(parsed.bounds).toEqual({
      swLat: 10,
      swLng: 20,
      neLat: 30,
      neLng: 40,
    });
  });

  it("serializes filters back to URLSearchParams", () => {
    const params = filtersToSearchParams(
      {
        micromarket: "Midtown",
        type: "Villa",
        minPrice: 1000,
        maxPrice: 5000,
        name: "Nova",
        bounds: {
          swLat: 1,
          swLng: 2,
          neLat: 3,
          neLng: 4,
        },
      },
      2
    );

    expect(params.get(SEARCH_PARAM_KEYS.MICROMARKET)).toBe("Midtown");
    expect(params.get(SEARCH_PARAM_KEYS.TYPE)).toBe("Villa");
    expect(params.get(SEARCH_PARAM_KEYS.MIN_PRICE)).toBe("1000");
    expect(params.get(SEARCH_PARAM_KEYS.MAX_PRICE)).toBe("5000");
    expect(params.get(SEARCH_PARAM_KEYS.NAME)).toBe("Nova");
    expect(params.get(SEARCH_PARAM_KEYS.PAGE)).toBe("2");
    expect(params.get(SEARCH_PARAM_KEYS.SW_LAT)).toBe("1");
  });
});
