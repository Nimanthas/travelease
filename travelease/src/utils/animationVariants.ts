/**
 * Animation Configuration for Sri Lankan Luxury Jungle Redesign
 * 
 * This file defines:
 * - Easing functions for smooth animations
 * - Duration standards (fast, normal, slow)
 * - Parallax intensity configurations for desktop and mobile
 * - Stagger timing for cards, lists, and sections
 * 
 * Requirements: 15.1, 15.2, 9.4
 */

/**
 * Easing Functions
 * 
 * Cubic bezier curves for natural motion
 * Format: [x1, y1, x2, y2]
 */
export const easings = {
  easeInOut: [0.4, 0.0, 0.2, 1] as const,
  easeOut: [0.0, 0.0, 0.2, 1] as const,
  easeIn: [0.4, 0.0, 1, 1] as const,
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
};

/**
 * Duration Standards (in seconds)
 * 
 * - fast: Hover states, focus indicators
 * - normal: Theme transitions, modals
 * - slow: Page transitions, complex animations
 * - wind: Monstera leaf wind motion loop
 */
export const durations = {
  fast: 0.2,      // 200ms
  normal: 0.3,    // 300ms
  slow: 0.5,      // 500ms
  wind: 4,        // 4000ms
} as const;

/**
 * Parallax Intensity Configuration
 * 
 * Controls scroll-based parallax effects
 * Values represent the multiplier of scroll speed:
 * - 1.0 = normal scroll speed (no parallax)
 * - 0.5 = moves at 50% of scroll speed
 * - 0.3 = moves at 30% of scroll speed
 * 
 * Mobile has reduced intensity for performance
 */
export const parallaxConfig = {
  desktop: {
    background: 0.5,    // Hero video background
    midground: 0.7,     // Mid-layer elements
    foreground: 1.0,    // Normal scroll (no parallax)
    leaves: {
      layer1: 0.3,      // Deepest leaf layer (slowest)
      layer2: 0.5,      // Middle leaf layer
      layer3: 0.7,      // Front leaf layer (fastest)
    },
  },
  mobile: {
    background: 0.8,    // Reduced parallax for performance
    midground: 0.9,
    foreground: 1.0,
    leaves: {
      layer1: 0.9,      // Minimal parallax on mobile
      layer2: 0.95,
      layer3: 1.0,      // No parallax for front layer
    },
  },
} as const;

/**
 * Stagger Timing Configuration (in seconds)
 * 
 * Delays between sequential animations for choreographed effects
 * - cards: Tour cards, service cards
 * - listItems: List items, menu items
 * - sections: Section entrance animations
 */
export const staggerConfig = {
  cards: 0.1,           // 100ms between card animations
  listItems: 0.05,      // 50ms between list items
  sections: 0.2,        // 200ms between section entrances
} as const;

/**
 * Framer Motion Variants
 * 
 * Reusable animation variants for common patterns
 */

// Fade in from below
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.easeOut,
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: durations.fast,
      ease: easings.easeIn,
    },
  },
};

// Fade in with scale
export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: durations.normal,
      ease: easings.easeOut,
    },
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: {
      duration: durations.fast,
      ease: easings.easeIn,
    },
  },
};

// Staggered children container
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerConfig.cards,
    },
  },
};

// Card hover effect
export const cardHover = {
  rest: { 
    scale: 1, 
    y: 0,
    transition: {
      duration: durations.fast,
      ease: easings.easeOut,
    },
  },
  hover: { 
    scale: 1.02, 
    y: -4,
    transition: {
      duration: durations.fast,
      ease: easings.easeOut,
    },
  },
};

// Wind motion for Monstera leaves
export const windMotion = (initialRotation: number) => ({
  rotate: [initialRotation - 5, initialRotation + 5, initialRotation - 5],
  x: [0, 10, 0],
  y: [0, 5, 0],
  transition: {
    duration: durations.wind,
    repeat: Infinity,
    ease: easings.easeInOut,
  },
});

// Section entrance animation
export const sectionEntrance = {
  initial: { opacity: 0, y: 40 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: durations.slow,
      ease: easings.easeOut,
    },
  },
  viewport: { once: true, margin: '-100px' },
};

// Section entrance with stagger for children
export const sectionEntranceStagger = {
  initial: { opacity: 0 },
  whileInView: { 
    opacity: 1,
    transition: {
      staggerChildren: staggerConfig.listItems,
      delayChildren: 0.1,
    },
  },
  viewport: { once: true, margin: '-100px' },
};

// Child element entrance (for use with sectionEntranceStagger)
export const childEntrance = {
  initial: { opacity: 0, y: 20 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.easeOut,
    },
  },
};

// Card entrance animation (for grids)
export const cardEntrance = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  whileInView: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easings.easeOut,
    },
  },
  viewport: { once: true, margin: '-50px' },
};

// Grid container with stagger
export const gridEntranceStagger = {
  initial: { opacity: 0 },
  whileInView: { 
    opacity: 1,
    transition: {
      staggerChildren: staggerConfig.cards,
      delayChildren: 0.2,
    },
  },
  viewport: { once: true, margin: '-100px' },
};

// Map pin marker animation
export const mapPinVariants = {
  inactive: {
    scale: 0.5,
    opacity: 0.5,
    transition: {
      duration: durations.normal,
      ease: easings.easeOut,
    },
  },
  active: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: easings.spring,
    },
  },
};

// Journey path reveal animation
export const pathReveal = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { 
    pathLength: 1, 
    opacity: 1,
    transition: {
      pathLength: {
        duration: durations.slow,
        ease: easings.easeInOut,
      },
      opacity: {
        duration: durations.fast,
      },
    },
  },
};

/**
 * Utility function to get parallax intensity based on viewport width
 * 
 * @param isMobile - Whether the viewport is mobile-sized (<640px)
 * @returns Parallax configuration object for the current viewport
 */
export function getParallaxIntensity(isMobile: boolean) {
  return isMobile ? parallaxConfig.mobile : parallaxConfig.desktop;
}

/**
 * Utility function to check if reduced motion is preferred
 * 
 * @returns true if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Utility function to get adjusted animation duration
 * Respects user's reduced motion preference
 * 
 * @param duration - Base duration in seconds
 * @returns Adjusted duration (0 if reduced motion is preferred)
 */
export function getAnimationDuration(duration: number): number {
  return prefersReducedMotion() ? 0 : duration;
}

/**
 * Utility function to get adjusted parallax intensity
 * Disables parallax if reduced motion is preferred
 * 
 * @param intensity - Base parallax intensity (0-1)
 * @returns Adjusted intensity (1.0 if reduced motion is preferred, meaning no parallax)
 */
export function getAdjustedParallaxIntensity(intensity: number): number {
  return prefersReducedMotion() ? 1.0 : intensity;
}

/**
 * Creates reduced-motion-aware animation variants
 * Returns static variants when reduced motion is preferred
 * 
 * @param variants - Original animation variants
 * @param shouldRespectReducedMotion - Whether to check reduced motion preference
 * @returns Adjusted variants
 */
export function getAccessibleVariants<T extends Record<string, any>>(
  variants: T,
  shouldRespectReducedMotion: boolean = true
): T {
  if (!shouldRespectReducedMotion || !prefersReducedMotion()) {
    return variants;
  }

  const staticVariants = {} as T;
  
  for (const key in variants) {
    const variant = variants[key];
    
    if (typeof variant === 'object' && variant !== null) {
      if ('transition' in variant) {
        const { transition, ...rest } = variant;
        staticVariants[key] = { ...rest, transition: { duration: 0 } } as any;
      } else {
        staticVariants[key] = variant;
      }
    } else {
      staticVariants[key] = variant;
    }
  }
  
  return staticVariants;
}

/**
 * Legacy variants function for backward compatibility
 * Used by existing slider components
 * 
 * @param duration - Animation duration in milliseconds
 * @param delay - Animation delay multiplier
 * @returns Framer Motion variants object
 */
export const variants = (duration: number = 200, delay: number = 1) => ({
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: duration / 1000 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: duration / 1000 },
    },
  }),
});
