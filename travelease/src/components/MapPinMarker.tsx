"use client";

import { motion } from "framer-motion";
import { mapPinVariants } from "@/utils/animationVariants";

/**
 * MapPinMarker Component
 * 
 * SVG circle marker for journey path waypoints with active/inactive states.
 * 
 * Features:
 * - Active/inactive visual states
 * - Scale and opacity animations
 * - Positioned at section waypoints
 * 
 * Requirements: 3.5, 4.3
 */

export interface MapPinMarkerProps {
  x: number;
  y: number;
  isActive: boolean;
  title?: string;
  className?: string;
}

export default function MapPinMarker({
  x,
  y,
  isActive,
  title,
  className = "",
}: MapPinMarkerProps) {
  return (
    <g className={className}>
      {/* Outer circle (glow effect when active) */}
      <motion.circle
        cx={x}
        cy={y}
        r={isActive ? 12 : 8}
        fill="currentColor"
        className="text-primary-500/20 dark:text-primary-400/20"
        variants={mapPinVariants}
        animate={isActive ? "active" : "inactive"}
      />
      
      {/* Inner circle (main marker) */}
      <motion.circle
        cx={x}
        cy={y}
        r={6}
        fill="currentColor"
        className="text-primary-500 dark:text-primary-400"
        variants={mapPinVariants}
        animate={isActive ? "active" : "inactive"}
      />
      
      {/* Center dot */}
      <motion.circle
        cx={x}
        cy={y}
        r={2}
        fill="white"
        variants={mapPinVariants}
        animate={isActive ? "active" : "inactive"}
      />
      
      {title && (
        <title>{title}</title>
      )}
    </g>
  );
}
