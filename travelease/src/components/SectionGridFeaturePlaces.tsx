"use client";

import React, { FC, ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "./StayCard";
import StayCard2 from "./StayCardAlternate";
import RegionFilter, { RegionCategory } from "./RegionFilter";
import { TourListing } from "@/data/sri-lankan-tours";
import { sectionEntrance, cardEntrance } from "@/utils/animationVariants";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
  regionFilter?: boolean;
  regions?: RegionCategory[];
  tourListings?: TourListing[];
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Featured places to stay",
  subHeading = "Popular places to stay that Chisfis recommends for you",
  headingIsCenter,
  tabs = ["New York", "Tokyo", "Paris", "London"],
  cardType = "card2",
  regionFilter = false,
  regions = ["South", "Central", "North", "West"],
  tourListings,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedRegion, setSelectedRegion] = useState<RegionCategory | null>(null);
  const [filteredListings, setFilteredListings] = useState<StayDataType[]>(stayListings);

  useEffect(() => {
    const regionParam = searchParams.get("region") as RegionCategory | null;
    if (regionParam && regions.includes(regionParam)) {
      setSelectedRegion(regionParam);
    }
  }, [searchParams, regions]);

  useEffect(() => {
    if (!regionFilter || !tourListings) {
      setFilteredListings(stayListings);
      return;
    }

    if (!selectedRegion) {
      setFilteredListings(tourListings);
    } else {
      const filtered = tourListings.filter(
        (tour) => (tour as TourListing).region === selectedRegion
      );
      setFilteredListings(filtered);
    }
  }, [selectedRegion, regionFilter, tourListings, stayListings]);

  const handleRegionChange = (region: RegionCategory | null) => {
    setSelectedRegion(region);

    const params = new URLSearchParams(searchParams.toString());
    if (region) {
      params.set("region", region);
    } else {
      params.delete("region");
    }
    const queryString = params.toString();
    router.push((queryString ? `?${queryString}` : window.location.pathname) as any, { scroll: false });
  };

  const getTourCounts = (): Record<string, number> => {
    if (!tourListings) return {};

    const counts: Record<string, number> = {};
    regions.forEach((region) => {
      counts[region] = tourListings.filter(
        (tour) => (tour as TourListing).region === region
      ).length;
    });
    return counts;
  };

  const renderCard = (stay: StayDataType) => {
    let CardName = StayCard;
    switch (cardType) {
      case "card1":
        CardName = StayCard;
        break;
      case "card2":
        CardName = StayCard2;
        break;

      default:
        CardName = StayCard;
    }

    return <CardName key={stay.id} data={stay} />;
  };

  return (
    <motion.div 
      className="nc-SectionGridFeaturePlaces relative"
      {...sectionEntrance}
    >
      <HeaderFilter
        tabActive={"New York"}
        subHeading={subHeading}
        tabs={regionFilter ? [] : tabs}
        heading={heading}
      />
      
      {regionFilter && (
        <RegionFilter
          regions={regions}
          selectedRegion={selectedRegion}
          onRegionChange={handleRegionChange}
          tourCounts={getTourCounts()}
        />
      )}

      {/* Screen reader announcement for filtered results */}
      <div 
        className="sr-only" 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {regionFilter && (
          selectedRegion 
            ? `Showing ${filteredListings.length} tours in ${selectedRegion} region`
            : `Showing all ${filteredListings.length} tours`
        )}
      </div>

      <motion.div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        {filteredListings.map((stay, index) => (
          <motion.div
            key={stay.id}
            {...cardEntrance}
            transition={{ delay: index * 0.05 }}
          >
            {renderCard(stay)}
          </motion.div>
        ))}
      </motion.div>
      <motion.div 
        className="flex mt-16 justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </motion.div>
    </motion.div>
  );
};

export default SectionGridFeaturePlaces;
