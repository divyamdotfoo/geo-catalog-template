"use client";

import { Building2, LayoutGrid, Trees, Warehouse } from "lucide-react";

const LISTING_TYPE_ICONS: Record<string, typeof Building2> = {
  Apartment: Building2,
  Villa: Trees,
  Plot: LayoutGrid,
  "Row House": Warehouse,
};

type ListingTypeFilterProps = {
  listingTypes: string[];
  selectedType: string | null;
  onTypeSelect: (type: string) => void;
};

export function ListingTypeFilter({
  listingTypes,
  selectedType,
  onTypeSelect,
}: ListingTypeFilterProps) {
  return (
    <div className="flex items-center gap-2">
      {listingTypes.slice(0, 4).map((type) => {
        const Icon = LISTING_TYPE_ICONS[type] || Building2;
        const isSelected = selectedType === type;
        return (
          <button
            key={type}
            onClick={() => onTypeSelect(type)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer border ${isSelected
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-400"
              }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {type}
          </button>
        );
      })}
    </div>
  );
}
