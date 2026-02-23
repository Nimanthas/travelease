"use client";

import { RefObject, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { calculateSectionPath, getElementCenter } from "@/utils/pathCalculations";
import MapPinMarker from "./MapPinMarker";
import { useReducedMotion } from "@/utils/useReducedMotion";

/**
 * JourneyPath Component
 * 
 * Animated SVG dotted line connecting all page sections with map pin markers.
 * 
 * Features:
 * - SVG path generation based on section positions
 * - Stroke-dashoffset animation on scroll
 * - IntersectionObserver for section detection
 * - Responsive path recalculation on resize
 * - Map pin markers at waypoints
 * 
 * Requirements: 3.1, 3.2, 19.1
 */

export interface MapPinContent {
  title: string;
  description: string;
  icon?: string;
}

export interface SectionWaypoint {
  id: string;
  sectionRef: RefObject<HTMLElement>;
  markerContent?: MapPinContent;
}

export interface JourneyPathProps {
  sections: SectionWaypoint[];
  className?: string;
}

interface PathData {
  d: string;
  length: number;
}

export default function JourneyPath({ sections, className = "" }: JourneyPathProps) {
  const [pathData, setPathData] = useState<PathData | null>(null);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [markerPositions, setMarkerPositions] = useState<Array<{ x: number; y: number }>>([]);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Use path length for stroke-dasharray and animate with scrollYProgress
  const pathLength = pathData?.length || 0;
  
  // Calculate stroke offset animation (must be called unconditionally)
  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [pathLength, 0]);

  // Calculate path from section refs
  const calculatePath = useCallback(() => {
    const sectionRefs = sections.map(s => s.sectionRef);
    return calculateSectionPath(sectionRefs);
  }, [sections]);

  // Initial path calculation
  useEffect(() => {
    const path = calculatePath();
    setPathData(path);
    
    // Calculate marker positions from section refs
    const positions = sections.map(section => {
      const center = getElementCenter(section.sectionRef.current);
      return center || { x: 0, y: 0 };
    });
    setMarkerPositions(positions);
  }, [calculatePath, sections]);

  // IntersectionObserver for section detection
  useEffect(() => {
    if (typeof window === 'undefined' || sections.length === 0) {
      return;
    }

    const observers: IntersectionObserver[] = [];

    sections.forEach((section, index) => {
      if (!section.sectionRef.current) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(index);
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: '0px',
        }
      );

      observer.observe(section.sectionRef.current);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  // Debounced resize handler for responsive recalculation
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const path = calculatePath();
        setPathData(path);
        
        // Recalculate marker positions
        const positions = sections.map(section => {
          const center = getElementCenter(section.sectionRef.current);
          return center || { x: 0, y: 0 };
        });
        setMarkerPositions(positions);
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [calculatePath, sections]);

  // Don't render if no path data
  if (!pathData) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-10 ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <motion.path
          d={pathData.d}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={`${pathLength} ${pathLength}`}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary-500 dark:text-primary-400"
          style={{
            strokeDashoffset: prefersReducedMotion ? 0 : strokeDashoffset,
          }}
        />

        {/* Map pin markers at section waypoints */}
        {markerPositions.map((position, index) => (
          <MapPinMarker
            key={sections[index]?.id || index}
            x={position.x}
            y={position.y}
            isActive={index === activeSection}
            title={sections[index]?.markerContent?.title}
          />
        ))}
      </svg>
    </div>
  );
}
