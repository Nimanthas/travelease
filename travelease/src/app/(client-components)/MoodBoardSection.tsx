"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { sectionEntranceStagger, childEntrance, staggerConfig } from "@/utils/animationVariants";

/**
 * MoodBoardSection Component
 * 
 * Image collage showcasing Sri Lankan destinations in a tile layout.
 * Displays a visual mood board with optimized, lazy-loaded images.
 * 
 * Features:
 * - CSS Grid tile layout with responsive columns
 * - Next.js Image optimization with lazy loading
 * - Preserved aspect ratios with object-fit
 * - Journey Path integration
 * - Responsive: 1 col (mobile), 2 cols (tablet), 3-4 cols (desktop)
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.6, 5.7
 */

export interface MoodBoardImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: number;
  priority?: boolean;
  cloudinaryId?: string;
}

export interface MoodBoardSectionProps {
  images: MoodBoardImage[];
  className?: string;
}

const MoodBoardSection = React.forwardRef<HTMLElement, MoodBoardSectionProps>(
  ({ images, className = "" }, ref) => {
    return (
      <section
        ref={ref}
        className={`relative py-16 md:py-24 lg:py-32 ${className}`}
        aria-labelledby="mood-board-heading"
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
            id="mood-board-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4"
          >
            Discover Sri Lanka
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            A visual journey through the island&apos;s most captivating destinations
          </p>
        </motion.div>

        {/* Image Grid */}
        <motion.div
          variants={sectionEntranceStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              variants={childEntrance}
              custom={index}
              transition={{
                delay: index * staggerConfig.cards,
              }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              style={{
                aspectRatio: image.aspectRatio,
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                loading={image.priority ? "eager" : "lazy"}
                priority={image.priority}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = "/images/placeholder-mood-board.jpg";
                }}
              />
              
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Optional: Add image title overlay on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm md:text-base font-medium">
                  {image.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

MoodBoardSection.displayName = "MoodBoardSection";

export default MoodBoardSection;
