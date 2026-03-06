"use client";

import { IndianRupee, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/utils/helpers";

type BudgetFilterProps = {
  hasPriceFilter: boolean;
  priceRange: { min: number; max: number };
  localPriceRange: [number, number];
  activeMinPrice: number | null;
  activeMaxPrice: number | null;
  onLocalPriceRangeChange: (value: [number, number]) => void;
  onClear: () => void;
  onApply: () => void;
};

export function BudgetFilter({
  hasPriceFilter,
  priceRange,
  localPriceRange,
  activeMinPrice,
  activeMaxPrice,
  onLocalPriceRangeChange,
  onClear,
  onApply,
}: BudgetFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-colors cursor-pointer ${hasPriceFilter
              ? "bg-emerald-50 border-emerald-300 text-emerald-700"
              : "border-gray-200 hover:border-gray-400 text-gray-700"
            }`}
        >
          <IndianRupee className="w-4 h-4" />
          <span className="text-sm font-semibold">
            {hasPriceFilter
              ? `₹${formatPrice(activeMinPrice || priceRange.min, false)} - ₹${formatPrice(
                activeMaxPrice || priceRange.max,
                false
              )}`
              : "Budget"}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Price Range</h3>
            <PopoverClose asChild>
              <button className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </PopoverClose>
          </div>

          <div className="flex justify-between text-sm font-semibold text-gray-900">
            <span>₹{formatPrice(localPriceRange[0], false)}</span>
            <span>₹{formatPrice(localPriceRange[1], false)}</span>
          </div>

          <Slider
            value={localPriceRange}
            onValueChange={(value) => onLocalPriceRangeChange(value as [number, number])}
            min={priceRange.min}
            max={priceRange.max}
            step={1000000}
          />

          <div className="flex gap-2">
            {hasPriceFilter && (
              <PopoverClose asChild>
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={onClear}
                  className="flex-1"
                >
                  Clear
                </Button>
              </PopoverClose>
            )}
            <PopoverClose asChild>
              <Button variant="primary" size="medium" onClick={onApply} className="flex-1">
                Apply
              </Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
