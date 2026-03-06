import type {
  WithContext,
  WebApplication,
  WebSite,
  BreadcrumbList,
  ListItem,
  SearchAction,
  EntryPoint,
  Offer,
} from "schema-dts";
import { siteUrl, templateConfig } from "@/config/template-config";

const siteName = templateConfig.app.name;
const appDescription = templateConfig.app.description;

export function generateWebApplicationSchema(): WithContext<WebApplication> {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    } as Offer,
    description: appDescription,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      } as EntryPoint,
      "query-input": "required name=search_term_string",
    } as SearchAction,
  };
}

export function generateWebSiteSchema(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      } as EntryPoint,
      "query-input": "required name=search_term_string",
    } as SearchAction,
  };
}

export function generateBreadcrumbListSchema(): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      } as ListItem,
      {
        "@type": "ListItem",
        position: 2,
        name: "Catalog",
        item: `${siteUrl}/`,
      } as ListItem,
    ],
  };
}
