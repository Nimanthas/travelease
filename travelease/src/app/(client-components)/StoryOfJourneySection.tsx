"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { sectionEntranceStagger, childEntrance, staggerConfig } from "@/utils/animationVariants";

/**
 * StoryOfJourneySection Component
 * 
 * Narrative section with destination map and inspiring waypoint descriptions.
 * Displays a visual map with positioned markers showing Sri Lankan destinations.
 * 
 * Features:
 * - Visual map with positioned markers
 * - Animated marker entrance on scroll
 * - Connected to JourneyPath
 * - Responsive grid layout
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6
 */

export interface JourneyWaypoint {
  id: string;
  title: string;
  description: string;
  position: { x: number; y: number }; // percentage on map (0-100)
  image?: string;
}

export interface StoryOfJourneySectionProps {
  waypoints: JourneyWaypoint[];
  className?: string;
}

const StoryOfJourneySection = React.forwardRef<HTMLElement, StoryOfJourneySectionProps>(
  ({ waypoints, className = "" }, ref) => {
    return (
      <section
        ref={ref}
        className={`relative py-16 md:py-24 lg:py-32 ${className}`}
        aria-labelledby="story-of-journey-heading"
      >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            id="story-of-journey-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4"
          >
            Your Journey Through Paradise
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Discover the enchanting destinations that make Sri Lanka a treasure trove of experiences
          </p>
        </motion.div>

        {/* Destination Map with Waypoints */}
        <motion.div
          variants={sectionEntranceStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="relative w-full max-w-6xl mx-auto"
        >
          {/* Map Background */}
          <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 rounded-3xl overflow-hidden shadow-2xl">
            {/* Decorative map overlay */}
            <div className="absolute inset-0 opacity-10 dark:opacity-5">
              <svg
                className="w-full h-full"
                viewBox="0 0 800 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Decorative map lines */}
                <path
                  d="M100,300 Q200,250 300,300 T500,300 T700,300"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary-600 dark:text-primary-400"
                />
                <path
                  d="M400,100 Q400,200 350,300 T400,500"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-primary-600 dark:text-primary-400"
                />
              </svg>
            </div>

            {/* Waypoint Markers */}
            {waypoints.map((waypoint, index) => (
              <motion.div
                key={waypoint.id}
                variants={childEntrance}
                custom={index}
                transition={{
                  delay: index * staggerConfig.listItems,
                }}
                className="absolute"
                style={{
                  left: `${waypoint.position.x}%`,
                  top: `${waypoint.position.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Marker Pin */}
                <div className="relative group cursor-pointer">
                  {/* Pulse animation */}
                  <div className="absolute inset-0 -m-2">
                    <div className="w-full h-full rounded-full bg-accent-500 dark:bg-accent-400 opacity-0 group-hover:opacity-30 group-hover:animate-ping" />
                  </div>

                  {/* Pin */}
                  <div className="relative w-8 h-8 md:w-10 md:h-10 bg-accent-500 dark:bg-accent-400 rounded-full border-4 border-white dark:border-neutral-900 shadow-lg transition-transform duration-300 group-hover:scale-125">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full" />
                    </div>
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl p-4 min-w-[200px] max-w-[280px]">
                      <h3 className="text-sm md:text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                        {waypoint.title}
                      </h3>
                      <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                        {waypoint.description}
                      </p>
                      {/* Arrow */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-full">
                        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white dark:border-t-neutral-800" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Waypoint Details Grid */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {waypoints.map((waypoint, index) => (
              <motion.div
                key={`detail-${waypoint.id}`}
                variants={childEntrance}
                custom={index}
                transition={{
                  delay: (waypoints.length * staggerConfig.listItems) + (index * staggerConfig.cards),
                }}
                className="group"
              >
                <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  {/* Image */}
                  {waypoint.image && (
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={waypoint.image}
                        alt={waypoint.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Number badge */}
                      <div className="absolute top-4 left-4 w-10 h-10 bg-accent-500 dark:bg-accent-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                      {waypoint.title}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {waypoint.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

StoryOfJourneySection.displayName = "StoryOfJourneySection";

export default StoryOfJourneySection;
