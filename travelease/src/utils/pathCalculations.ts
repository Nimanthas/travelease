/**
 * Path Calculation Utilities for Journey Path
 * 
 * Provides bezier curve utilities for generating smooth SVG paths
 * connecting page sections.
 * 
 * Requirements: 3.3, 19.4
 */

export interface Point {
  x: number;
  y: number;
}

export interface PathCalculationResult {
  d: string;
  length: number;
}

/**
 * Calculate the center point of a DOM element
 * 
 * @param element - The HTML element to calculate center for
 * @returns Point with x, y coordinates, or null if element is invalid
 */
export function getElementCenter(element: HTMLElement | null): Point | null {
  if (!element) {
    return null;
  }

  const rect = element.getBoundingClientRect();
  
  // Check if element has valid dimensions
  if (rect.width === 0 || rect.height === 0) {
    return null;
  }

  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2 + window.scrollY,
  };
}

/**
 * Generate a quadratic bezier curve control point
 * 
 * Creates a control point offset to the side for natural curves
 * 
 * @param start - Starting point
 * @param end - Ending point
 * @param offset - Horizontal offset multiplier (default: 0.3)
 * @returns Control point coordinates
 */
export function getQuadraticControlPoint(
  start: Point,
  end: Point,
  offset: number = 0.3
): Point {
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;
  
  // Offset control point horizontally for curve
  const dx = end.x - start.x;
  const offsetX = dx * offset;
  
  return {
    x: midX + offsetX,
    y: midY,
  };
}

/**
 * Generate SVG path string from array of points using quadratic bezier curves
 * 
 * @param points - Array of points to connect
 * @returns SVG path string (e.g., "M 100 100 Q 150 150 200 200")
 */
export function generateBezierPath(points: Point[]): string {
  if (points.length === 0) {
    return "";
  }

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i];
    const end = points[i + 1];
    
    // Alternate offset direction for visual variety
    const offsetDirection = i % 2 === 0 ? 1 : -1;
    const control = getQuadraticControlPoint(start, end, 0.3 * offsetDirection);
    
    path += ` Q ${control.x} ${control.y} ${end.x} ${end.y}`;
  }

  return path;
}

/**
 * Calculate the approximate length of an SVG path
 * 
 * Uses the browser's native getTotalLength() method if available,
 * otherwise estimates based on point distances
 * 
 * @param pathString - SVG path string
 * @returns Approximate path length in pixels
 */
export function calculatePathLength(pathString: string): number {
  if (typeof document === 'undefined') {
    return 0;
  }

  try {
    // Create temporary SVG element to calculate length
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    path.setAttribute('d', pathString);
    svg.appendChild(path);
    document.body.appendChild(svg);
    
    const length = path.getTotalLength();
    
    document.body.removeChild(svg);
    
    return length;
  } catch (error) {
    console.warn('Failed to calculate path length:', error);
    return 0;
  }
}

/**
 * Validate that a point has valid coordinates
 * 
 * @param point - Point to validate
 * @returns true if point has valid x and y coordinates
 */
export function isValidPoint(point: Point | null): point is Point {
  return (
    point !== null &&
    typeof point.x === 'number' &&
    typeof point.y === 'number' &&
    !isNaN(point.x) &&
    !isNaN(point.y) &&
    isFinite(point.x) &&
    isFinite(point.y)
  );
}

/**
 * Calculate SVG path connecting section elements
 * 
 * Handles edge cases:
 * - Missing refs (skipped)
 * - Less than 2 sections (returns null)
 * - Invalid positions (skipped)
 * 
 * @param sectionRefs - Array of React refs to section elements
 * @returns PathCalculationResult with path string and length, or null if insufficient data
 */
export function calculateSectionPath(
  sectionRefs: Array<React.RefObject<HTMLElement>>
): PathCalculationResult | null {
  // Extract valid points from section refs
  const points: Point[] = [];

  for (const ref of sectionRefs) {
    if (!ref.current) {
      console.warn('Section ref is null, skipping');
      continue;
    }

    const center = getElementCenter(ref.current);
    
    if (!isValidPoint(center)) {
      console.warn('Invalid section position, skipping');
      continue;
    }

    points.push(center);
  }

  // Need at least 2 points to draw a path
  if (points.length < 2) {
    console.warn(`Insufficient sections for path calculation: ${points.length} valid points`);
    return null;
  }

  // Generate bezier path
  const pathString = generateBezierPath(points);
  
  if (!pathString) {
    console.warn('Failed to generate path string');
    return null;
  }

  // Calculate path length
  const length = calculatePathLength(pathString);

  if (length === 0) {
    console.warn('Path length is zero');
    return null;
  }

  return {
    d: pathString,
    length,
  };
}

/**
 * Check if an element is in the viewport
 * 
 * @param element - HTML element to check
 * @param threshold - Percentage of element that must be visible (0-1)
 * @returns true if element is sufficiently visible
 */
export function isInViewport(element: HTMLElement, threshold: number = 0.5): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
  const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const visibleRatio = visibleHeight / rect.height;

  return vertInView && horInView && visibleRatio >= threshold;
}
