/**
 * WCAG AA Contrast Ratio Validator
 * Validates color combinations meet WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
 */

interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Calculate relative luminance
 */
function getLuminance(rgb: RGB): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    const sRGB = val / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(hexToRgb(color1));
  const lum2 = getLuminance(hexToRgb(color2));
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA standards
 */
export function meetsWCAGAA(
  foreground: string,
  background: string,
  largeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  const threshold = largeText ? 3.0 : 4.5;
  return ratio >= threshold;
}

/**
 * Validate theme color combinations
 */
export function validateThemeContrast(theme: {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
}): {
  valid: boolean;
  results: Array<{
    combination: string;
    ratio: number;
    passes: boolean;
    threshold: number;
  }>;
} {
  const combinations = [
    { name: 'Primary on Background', fg: theme.primary, bg: theme.background },
    { name: 'Secondary on Background', fg: theme.secondary, bg: theme.background },
    { name: 'Accent on Background', fg: theme.accent, bg: theme.background },
    { name: 'Foreground on Background', fg: theme.foreground, bg: theme.background },
    { name: 'Background on Primary', fg: theme.background, bg: theme.primary },
    { name: 'Background on Accent', fg: theme.background, bg: theme.accent },
  ];

  const results = combinations.map(({ name, fg, bg }) => {
    const ratio = getContrastRatio(fg, bg);
    const passes = ratio >= 4.5;
    return {
      combination: name,
      ratio: parseFloat(ratio.toFixed(2)),
      passes,
      threshold: 4.5,
    };
  });

  return {
    valid: results.every((r) => r.passes),
    results,
  };
}
