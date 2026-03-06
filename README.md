# Geo Catalog Template

A reusable Next.js template for building map + list discovery apps.

## Technical Features

- SSR-initialized filter state hydration with client-side URL mutation via `history.replaceState` (no full reload).
- Dual-query data flow: paginated list API + bounds-scoped marker API to avoid map overfetch.
- Generic `MapEntity` contract with adapter-driven domain mapping (`listingAdapter`, `venueAdapter`).
- Source/adapter service boundary (`DataSource` + domain adapter) for low-friction backend replacement.
- Renderer override points for list cards and map popups without forking core components.
- Configurable map tile provider and attribution through runtime env/config, not hardcoded layer values.
- Search-param key centralization to keep server parsing, client serialization, and URL sync schema-aligned.

## Quickstart

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What You Can Customize in 10 Minutes

1. Update app branding and copy in `src/config/template-config.ts`.
2. Swap demo data in `src/server/data/index.ts`.
3. Customize card/popup rendering in:
   - `src/components/listings-grid.tsx`
   - `src/components/maps/discovery-map.tsx`
4. Adjust filters and URL param behavior in `src/utils/search-params.ts`.

## Template Architecture

- `src/app/` App Router pages and API routes
- `src/components/` reusable UI, map, and list modules
- `src/contexts/` client state + data fetching orchestration
- `src/server/` mock data and service layer
- `src/types/` core and domain-specific types
- `src/config/` template-level configuration

## Data Model Strategy

This template is generic at the UI layer (`MapEntity`) and uses a domain adapter
to map source records to UI records. The default domain example is real-estate.

- Generic core type: `MapEntity` in `src/types/map-entity.ts`
- Domain type + adapter: `src/types/listing.ts` + `src/server/adapters/listing-adapter.ts`

## Swapping Mock Data for Your API

1. Keep UI consuming `MapEntity`.
2. Replace the data source inside `src/server/services/listings.ts`.
3. Return the same response shape from:
   - `src/app/api/listings/route.ts`
   - `src/app/api/map-listings/route.ts`

If your API shape differs, adapt it in `src/server/adapters/listing-adapter.ts`.

### Included Sample Datasets

- Real-estate sample data: `src/server/data/index.ts`
- Non-real-estate sample data: `src/server/data/venues.ts`

To try the second dataset, wire `venueSource` + `venueAdapter` into a custom
service implementation and map into your UI card/popup renderer.

## Environment Variables

See `.env.example`:

- `NEXT_PUBLIC_SITE_URL`: canonical public URL used for metadata and JSON-LD.
- `NEXT_PUBLIC_TILE_URL`: optional tile endpoint for map base layer.
- `NEXT_PUBLIC_TILE_ATTRIBUTION`: optional tile attribution for custom provider.

## Scripts

- `npm run dev` start local server
- `npm run build` production build
- `npm run start` serve production build
- `npm run lint` run ESLint
- `npm run typecheck` run TypeScript checks
- `npm run format` run Prettier on source files

## Release Checklist

- Confirm `npm run lint`, `npm run typecheck`, and `npm run build` pass.
- Verify the app runs from a clean clone using `.env.example`.
- Ensure branding and metadata in `src/config/template-config.ts` are template-safe.

## License

MIT
