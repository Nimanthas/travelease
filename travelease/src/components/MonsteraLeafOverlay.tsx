"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface MonsteraLeafProps {
  depth: number;
  position: { x: number; y: number };
  rotation: number;
}

// Debounce helper for resize events
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default function MonsteraLeafOverlay({
  depth,
  position,
  rotation,
}: MonsteraLeafProps) {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    
    // Debounce resize handler for performance
    const debouncedResize = debounce(checkMobile, 150);
    window.addEventListener("resize", debouncedResize);
    
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  const parallaxRate = isMobile ? 0.95 : 1 - depth * 0.2;
  const y = useTransform(scrollY, [0, 500], [0, 500 * (1 - parallaxRate)]);

  const windAnimation = {
    rotate: [rotation - 5, rotation + 5, rotation - 5],
    x: [0, 10, 0],
    y: [0, 5, 0],
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        y,
        zIndex: depth,
        willChange: "transform",
      }}
      animate={windAnimation}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 200 300"
        className="w-32 md:w-48 lg:w-64 text-primary-600 dark:text-primary-400"
        style={{ opacity: 0.15 }}
        role="img"
        aria-label="Decorative monstera leaf illustration"
      >
        <path
          d="M100,10 Q120,50 110,90 L100,150 L90,210 Q85,240 100,270 M100,150 L130,140 M100,150 L70,140 M100,210 L120,200 M100,210 L80,200"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
