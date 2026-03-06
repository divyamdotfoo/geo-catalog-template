"use client";

import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type LocationFilterProps = {
  micromarkets: string[];
  selectedLocation: string;
  isSelected: boolean;
  onLocationSelect: (area: string | null) => void;
};

export function LocationFilter({
  micromarkets,
  selectedLocation,
  isSelected,
  onLocationSelect,
}: LocationFilterProps) {
  return (
    <Select
      value={selectedLocation === "All Areas" ? "all" : selectedLocation}
      onValueChange={(value) => {
        if (value === "all") {
          onLocationSelect(null);
        } else {
          onLocationSelect(value);
        }
      }}
    >
      <SelectTrigger
        hideIcon
        className={`gap-2 px-4 py-2.5 rounded-full h-auto cursor-pointer ${isSelected
            ? "bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            : "bg-gray-50 hover:bg-gray-100 border-gray-200"
          }`}
      >
        <MapPin
          className={`w-4 h-4 shrink-0 ${isSelected ? "text-emerald-600" : "text-gray-600"
            }`}
        />
        <div className="flex flex-col items-start gap-0">
          <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wide leading-none">
            Location
          </span>
          <span
            className={`text-sm font-semibold leading-tight ${isSelected ? "text-emerald-700" : "text-gray-900"
              }`}
          >
            <SelectValue />
          </span>
        </div>
      </SelectTrigger>
      <SelectContent
        className="w-56 rounded-xl border-gray-100 shadow-lg p-2 max-h-96 overflow-y-auto"
        align="start"
        position="popper"
        sideOffset={8}
      >
        <SelectItem
          value="all"
          hideIndicator
          className={`px-4 py-2.5 rounded-md ${!isSelected
              ? "text-emerald-600 font-semibold bg-emerald-50 hover:bg-emerald-50 focus:bg-emerald-50"
              : "text-gray-700 hover:bg-gray-50 focus:bg-gray-50"
            }`}
        >
          All Areas
        </SelectItem>
        {micromarkets.map((area) => (
          <SelectItem
            key={area}
            value={area}
            hideIndicator
            className={`px-4 py-2.5 rounded-md ${selectedLocation === area
                ? "text-emerald-600 font-semibold bg-emerald-50 hover:bg-emerald-50 focus:bg-emerald-50"
                : "text-gray-700 hover:bg-gray-50 focus:bg-gray-50"
              }`}
          >
            {area}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
