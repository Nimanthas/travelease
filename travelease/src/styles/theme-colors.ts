/**
 * Theme Color Configuration - Sri Lankan Luxury Jungle
 * 
 * Color palette extracted from design/Logo.jpg and design/Travel Ease Logo.png
 * Supports both light and dark theme modes with proper TypeScript interfaces
 * 
 * @see Requirements 1.1, 1.2, 1.3, 14.5, 17.4
 */

/**
 * RGB color tuple representing red, green, and blue values (0-255)
 */
export type RGBColor = readonly [number, number, number];

/**
 * Color scale from 50 (lightest) to 900 (darkest)
 */
export interface ColorScale {
  50: RGBColor;
  100: RGBColor;
  200: RGBColor;
  300: RGBColor;
  400: RGBColor;
  500: RGBColor;
  600: RGBColor;
  700: RGBColor;
  800: RGBColor;
  900: RGBColor;
}

/**
 * Complete color scheme with primary, secondary, neutral, and accent colors
 */
export interface ColorScheme {
  primary: ColorScale;
  secondary: ColorScale;
  neutral: ColorScale;
  accent: ColorScale;
}

/**
 * Theme configuration with light and dark mode variants
 */
export interface ThemeColors {
  light: ColorScheme;
  dark: ColorScheme;
}

/**
 * Sri Lankan Luxury Jungle Color Palette
 * 
 * Light Mode:
 * - Primary: Deep Jungle Green (rgb(26, 77, 46) at 500)
 * - Secondary: Forest Green (rgb(79, 121, 66) at 500)
 * - Neutral: Warm Grays
 * - Accent: Warm Gold/Amber (rgb(212, 165, 116) at 500)
 * 
 * Dark Mode:
 * - Primary: Lighter Jungle Green (rgb(45, 95, 63) at 500)
 * - Secondary: Lighter Forest Green (rgb(107, 148, 86) at 500)
 * - Neutral: Dark backgrounds
 * - Accent: Lighter Gold/Amber (rgb(232, 196, 160) at 500)
 */
export const logoColors: ThemeColors = {
  light: {
    primary: {
      50: [240, 247, 243],
      100: [217, 235, 224],
      200: [179, 215, 193],
      300: [140, 195, 162],
      400: [102, 175, 131],
      500: [26, 77, 46],
      600: [21, 61, 37],
      700: [16, 46, 28],
      800: [11, 30, 19],
      900: [5, 15, 9],
    },
    secondary: {
      50: [244, 247, 242],
      100: [227, 235, 224],
      200: [199, 215, 193],
      300: [171, 195, 162],
      400: [143, 175, 131],
      500: [79, 121, 66],
      600: [63, 97, 53],
      700: [47, 73, 40],
      800: [32, 48, 26],
      900: [16, 24, 13],
    },
    neutral: {
      50: [250, 248, 245],
      100: [245, 243, 240],
      200: [229, 227, 224],
      300: [209, 207, 204],
      400: [82, 82, 91],
      500: [107, 114, 128],
      600: [75, 85, 99],
      700: [55, 65, 81],
      800: [31, 41, 55],
      900: [17, 24, 39],
    },
    accent: {
      50: [250, 246, 240],
      100: [243, 233, 217],
      200: [231, 211, 179],
      300: [219, 189, 141],
      400: [207, 167, 103],
      500: [105, 82, 58],
      600: [85, 66, 47],
      700: [70, 54, 38],
      800: [56, 43, 30],
      900: [42, 33, 23],
    },
  },
  dark: {
    primary: {
      50: [5, 15, 9],
      100: [11, 30, 19],
      200: [16, 46, 28],
      300: [21, 61, 37],
      400: [26, 77, 46],
      500: [102, 149, 114],
      600: [121, 167, 131],
      700: [140, 185, 148],
      800: [159, 203, 165],
      900: [178, 221, 182],
    },
    secondary: {
      50: [16, 24, 13],
      100: [32, 48, 26],
      200: [47, 73, 40],
      300: [63, 97, 53],
      400: [79, 121, 66],
      500: [107, 148, 86],
      600: [135, 175, 106],
      700: [163, 202, 126],
      800: [191, 229, 146],
      900: [219, 255, 166],
    },
    neutral: {
      50: [17, 24, 39],
      100: [31, 41, 55],
      200: [55, 65, 81],
      300: [75, 85, 99],
      400: [113, 113, 122],
      500: [156, 163, 175],
      600: [209, 213, 219],
      700: [229, 231, 235],
      800: [243, 244, 246],
      900: [249, 250, 251],
    },
    accent: {
      50: [42, 33, 23],
      100: [85, 66, 47],
      200: [127, 99, 70],
      300: [170, 132, 93],
      400: [212, 165, 116],
      500: [232, 196, 160],
      600: [240, 215, 190],
      700: [245, 230, 215],
      800: [250, 242, 235],
      900: [255, 250, 245],
    },
  },
};

/**
 * Utility function to convert RGB tuple to CSS rgb() string
 * @param color RGB color tuple
 * @returns CSS rgb() string
 */
export function rgbToString(color: RGBColor): string {
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

/**
 * Utility function to convert RGB tuple to CSS rgba() string with alpha
 * @param color RGB color tuple
 * @param alpha Alpha value (0-1)
 * @returns CSS rgba() string
 */
export function rgbToRgba(color: RGBColor, alpha: number): string {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
}

/**
 * Utility function to convert RGB tuple to hex color string
 * @param color RGB color tuple
 * @returns Hex color string (e.g., "#1a4d2e")
 */
export function rgbToHex(color: RGBColor): string {
  const [r, g, b] = color;
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Get color value for current theme mode
 * @param isDark Whether dark mode is active
 * @returns Color scheme for the current mode
 */
export function getThemeColors(isDark: boolean): ColorScheme {
  return isDark ? logoColors.dark : logoColors.light;
}
