"use client";

import { Loader2, Search, X } from "lucide-react";

type SearchFilterProps = {
  isLoading: boolean;
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

export function SearchFilter({
  isLoading,
  value,
  onChange,
  onClear,
}: SearchFilterProps) {
  return (
    <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-50 border border-gray-200 focus-within:border-gray-300 transition-colors">
      {isLoading ? (
        <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
      ) : (
        <Search className="w-4 h-4 text-gray-400" />
      )}
      <input
        type="text"
        placeholder="Search by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
      />
      {value && (
        <button
          onClick={onClear}
          className="p-0.5 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X className="w-3.5 h-3.5 text-gray-500" />
        </button>
      )}
    </div>
  );
}
