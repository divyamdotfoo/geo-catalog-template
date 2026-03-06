export const templateConfig = {
  app: {
    name: "Geo Catalog Template",
    shortName: "GeoCatalog",
    description:
      "A reusable map + list discovery template with URL-synced filters.",
    defaultLocationLabel: "Your City",
  },
  seo: {
    keywords: [
      "map template",
      "geospatial catalog",
      "map search",
      "nextjs template",
      "discovery app",
    ],
    locale: "en_US",
    category: "Developer Tools",
  },
  contact: {
    email: "hello@example.com",
    twitter: "@example",
  },
  map: {
    tileUrl:
      process.env.NEXT_PUBLIC_TILE_URL ??
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    tileAttribution:
      process.env.NEXT_PUBLIC_TILE_ATTRIBUTION ??
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
