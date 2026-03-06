import { listingService } from "@/server/services/listings";
import { Metadata } from "next";
import { ListingsGrid } from "@/components/listings-grid";
import { Navbar } from "@/components/navbar";
import { ListingsProvider } from "@/contexts/listings";
import { parseSearchParams, parseToServiceParams } from "@/utils/search-params";
import DiscoveryMapWrapper from "@/components/maps";
import { siteUrl, templateConfig } from "@/config/template-config";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const initialFilters = parseSearchParams(resolvedSearchParams);
  const serviceParams = parseToServiceParams(resolvedSearchParams);

  const [listingsResult, listingTypes, micromarkets, priceRange] =
    await Promise.all([
      listingService.search(serviceParams),
      listingService.getUniqueListingTypes(),
      listingService.getUniqueMicromarkets(),
      listingService.getPriceRange(),
    ]);

  return (
    <ListingsProvider
      initialListings={listingsResult.listings}
      initialTotalPages={listingsResult.totalPages}
      initialCurrentPage={listingsResult.currentPage}
      initialTotalListings={listingsResult.totalListings}
      initialFilters={initialFilters}
    >
      <div className="flex flex-col min-h-screen">
        <Navbar
          listingTypes={listingTypes}
          micromarkets={micromarkets}
          priceRange={priceRange}
        />

        <main className="flex flex-1 bg-[#F7F7F7]">
          {/* Left Side - Listings Grid (Scrollable) */}
          <div className="w-1/2 bg-white">
            <ListingsGrid />
          </div>

          {/* Right Side - Map (Sticky) */}
          <div className="w-1/2 h-[calc(100vh-65px)] sticky top-[65px] pt-6 pr-6 pb-6 pl-4">
            <div className="w-full h-full bg-white rounded-3xl overflow-hidden">
              <DiscoveryMapWrapper />
            </div>
          </div>
        </main>
      </div>
    </ListingsProvider>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const totalCount = await listingService.getTotalCount();
  const appName = templateConfig.app.name;
  const locationLabel = templateConfig.app.defaultLocationLabel;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${appName} - Map Discovery Starter`,
      template: `%s | ${appName}`,
    },
    description: `Browse ${totalCount}+ items on an interactive map and synced list in ${locationLabel}.`,
    keywords: [...templateConfig.seo.keywords],
    category: templateConfig.seo.category,
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      type: "website",
      locale: templateConfig.seo.locale,
      url: siteUrl,
      siteName: appName,
      title: `${appName} - Map Discovery Starter`,
      description: `Browse ${totalCount}+ items on an interactive map and synced list.`,
    },
    twitter: {
      card: "summary_large_image",
      site: templateConfig.contact.twitter,
      creator: templateConfig.contact.twitter,
      title: `${appName} - Map Discovery Starter`,
      description: `Browse ${totalCount}+ items on an interactive map and synced list.`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
