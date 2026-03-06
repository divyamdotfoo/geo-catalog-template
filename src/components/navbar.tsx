"use client";
import { useState, useEffect, useRef } from "react";
import { Home } from "lucide-react";
import { useListings } from "@/contexts/listings";
import { templateConfig } from "@/config/template-config";
import { LocationFilter } from "./filters/location-filter";
import { ListingTypeFilter } from "./filters/listing-type-filter";
import { SearchFilter } from "./filters/search-filter";
import { BudgetFilter } from "./filters/budget-filter";

type NavbarProps = {
  listingTypes: string[];
  micromarkets: string[];
  priceRange: { min: number; max: number };
};

export function Navbar({
  listingTypes,
  micromarkets,
  priceRange,
}: NavbarProps) {
  const { filters, setFilters, isLoading } = useListings();
  const appName = templateConfig.app.name;

  // Local state for search input (for debounce) - initialized from URL filters
  const [searchValue, setSearchValue] = useState(filters.name || "");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  // Local state for price slider - initialized from URL filters
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    filters.minPrice ?? priceRange.min,
    filters.maxPrice ?? priceRange.max,
  ]);

  // Handle debounced search (skip initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setFilters({ name: searchValue || null });
    }, 400);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchValue, setFilters]);

  const handleLocationSelect = (area: string | null) => {
    setFilters({ micromarket: area });
  };

  const handleTypeSelect = (type: string) => {
    // Toggle: if already selected, deselect
    if (filters.type === type) {
      setFilters({ type: null });
    } else {
      setFilters({ type });
    }
  };

  const handlePriceApply = () => {
    setFilters({
      minPrice: localPriceRange[0],
      maxPrice: localPriceRange[1],
    });
  };

  const handleClearPriceFilter = () => {
    setLocalPriceRange([priceRange.min, priceRange.max]);
    setFilters({ minPrice: null, maxPrice: null });
  };

  const selectedLocation = filters.micromarket || "All Areas";
  const hasPriceFilter = filters.minPrice !== null || filters.maxPrice !== null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="flex items-center gap-6 px-6 py-3">
        {/* Logo */}
        <button
          onClick={() => {
            window.history.replaceState(null, "", "/");
            window.location.reload();
          }}
          className="flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            {appName}
          </span>
        </button>

        {/* Center Search Bar */}
        <div className="flex-1 flex items-center gap-4">
          <LocationFilter
            micromarkets={micromarkets}
            selectedLocation={selectedLocation}
            isSelected={!!filters.micromarket}
            onLocationSelect={handleLocationSelect}
          />

          <ListingTypeFilter
            listingTypes={listingTypes}
            selectedType={filters.type}
            onTypeSelect={handleTypeSelect}
          />

          <SearchFilter
            isLoading={isLoading}
            value={searchValue}
            onChange={setSearchValue}
            onClear={() => setSearchValue("")}
          />
        </div>

        <div className="shrink-0">
          <BudgetFilter
            hasPriceFilter={hasPriceFilter}
            priceRange={priceRange}
            localPriceRange={localPriceRange}
            activeMinPrice={filters.minPrice}
            activeMaxPrice={filters.maxPrice}
            onLocalPriceRangeChange={setLocalPriceRange}
            onClear={handleClearPriceFilter}
            onApply={handlePriceApply}
          />
        </div>

        {/* Clear All Filters Button (only show if any filter is active) */}
        {(filters.micromarket ||
          filters.type ||
          filters.name ||
          hasPriceFilter) && (
            <button
              onClick={() => {
                window.history.replaceState(null, "", "/");
                window.location.reload();
              }}
              className="text-xs font-medium text-gray-500 hover:text-gray-700 underline underline-offset-2 shrink-0 cursor-pointer"
            >
              Clear all
            </button>
          )}
      </div>
    </header>
  );
}
