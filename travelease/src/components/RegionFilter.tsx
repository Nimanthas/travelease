"use client";

import React, { FC } from "react";

export type RegionCategory = "South" | "Central" | "North" | "West";

export interface RegionFilterProps {
  regions: RegionCategory[];
  selectedRegion: RegionCategory | null;
  onRegionChange: (region: RegionCategory | null) => void;
  tourCounts: Record<string, number>;
  className?: string;
}

const RegionFilter: FC<RegionFilterProps> = ({
  regions,
  selectedRegion,
  onRegionChange,
  tourCounts,
  className = "",
}) => {
  const totalCount = Object.values(tourCounts).reduce((a, b) => a + b, 0);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    region: RegionCategory | null,
    index: number
  ) => {
    const buttons = document.querySelectorAll('[data-region-filter-btn]');
    
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (index + 1) % buttons.length;
      (buttons[nextIndex] as HTMLButtonElement).focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (index - 1 + buttons.length) % buttons.length;
      (buttons[prevIndex] as HTMLButtonElement).focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onRegionChange(region);
    }
  };

  return (
    <div className={`flex flex-wrap gap-3 justify-center mb-8 ${className}`}>
      <button
        data-region-filter-btn
        onClick={() => onRegionChange(null)}
        onKeyDown={(e) => handleKeyDown(e, null, 0)}
        className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
          !selectedRegion
            ? "bg-primary-600 dark:bg-primary-500 text-white shadow-lg"
            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
        }`}
        aria-pressed={!selectedRegion}
        aria-label={`Show all regions, ${totalCount} tours`}
      >
        All Regions
        <span className="ml-2 text-sm opacity-75">({totalCount})</span>
      </button>

      {regions.map((region, index) => (
        <button
          key={region}
          data-region-filter-btn
          onClick={() => onRegionChange(region)}
          onKeyDown={(e) => handleKeyDown(e, region, index + 1)}
          className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
            selectedRegion === region
              ? "bg-primary-600 dark:bg-primary-500 text-white shadow-lg"
              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
          }`}
          aria-pressed={selectedRegion === region}
          aria-label={`Filter by ${region} region, ${tourCounts[region] || 0} tours`}
        >
          {region}
          <span className="ml-2 text-sm opacity-75">
            ({tourCounts[region] || 0})
          </span>
        </button>
      ))}
    </div>
  );
};

export default RegionFilter;
