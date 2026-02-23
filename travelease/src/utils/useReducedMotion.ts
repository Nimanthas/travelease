import { useEffect, useState } from 'react';

/**
 * Custom hook to detect user's reduced motion preference
 * 
 * Monitors the prefers-reduced-motion media query and updates reactively
 * when the user's preference changes.
 * 
 * Requirements: 9.6, 15.7, 20.8
 * 
 * @returns boolean - true if user prefers reduced motion
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const prefersReducedMotion = useReducedMotion();
 *   
 *   return (
 *     <motion.div
 *       animate={{ x: prefersReducedMotion ? 0 : 100 }}
 *     >
 *       Content
 *     </motion.div>
 *   );
 * }
 * ```
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
