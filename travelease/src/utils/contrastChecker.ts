/**
 * WCAG AA Contrast Ratio Checker
 * 
 * Verifies color contrast compliance for accessibility
 * WCAG AA Requirements:
 * - Normal text (< 18pt): 4.5:1 minimum
 * - Large text (>= 18pt or 14pt bold): 3:1 minimum
 * 
 * @see Requirements 10.6, 17.7
 */

import { logoColors, type RGBColor } from '@/styles/theme-colors';

/**
 * Calculate relative luminance of an RGB color
 * Formula from WCAG 2.1 specification
 */
function getRelativeLuminance(rgb: RGBColor): number {
  const [r, g, b] = rgb.map(val => {
    const sRGB = val / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 * Formula: (L1 + 0.05) / (L2 + 0.05) where L1 is lighter
 */
export function getContrastRatio(color1: RGBColor, color2: RGBColor): number {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA standards
 */
export function meetsWCAGAA(
  foreground: RGBColor,
  background: RGBColor,
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  const minimumRatio = isLargeText ? 3.0 : 4.5;
  return ratio >= minimumRatio;
}

/**
 * Format contrast ratio for display
 */
export function formatRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}

/**
 * Color combination to test
 */
interface ColorCombination {
  name: string;
  foreground: RGBColor;
  background: RGBColor;
  isLargeText?: boolean;
  context: string;
}

/**
 * Get all critical color combinations for testing
 */
export function getCriticalColorCombinations(isDark: boolean): ColorCombination[] {
  const colors = isDark ? logoColors.dark : logoColors.light;
  
  return [
    // Primary text on backgrounds
    {
      name: 'Primary text on neutral background',
      foreground: colors.neutral[900],
      background: colors.neutral[50],
      context: 'Body text, paragraphs',
    },
    {
      name: 'Primary text on white',
      foreground: colors.neutral[900],
      background: [255, 255, 255] as RGBColor,
      context: 'Body text on white cards',
    },
    
    // Interactive elements
    {
      name: 'Primary button text',
      foreground: colors.neutral[50],
      background: colors.primary[500],
      context: 'Primary button labels',
    },
    {
      name: 'Primary button hover',
      foreground: colors.neutral[50],
      background: colors.primary[600],
      context: 'Primary button hover state',
    },
    {
      name: 'Secondary button text',
      foreground: colors.neutral[50],
      background: colors.secondary[500],
      context: 'Secondary button labels',
    },
    {
      name: 'Accent button text',
      foreground: colors.neutral[900],
      background: colors.accent[500],
      context: 'Accent/CTA button labels',
    },
    
    // Links and interactive text
    {
      name: 'Primary link on light background',
      foreground: colors.primary[600],
      background: colors.neutral[50],
      context: 'Text links',
    },
    {
      name: 'Primary link hover',
      foreground: colors.primary[700],
      background: colors.neutral[50],
      context: 'Text links hover state',
    },
    
    // Focus indicators
    {
      name: 'Focus ring on light background',
      foreground: colors.primary[500],
      background: colors.neutral[50],
      context: 'Keyboard focus indicators',
    },
    
    // Card elements
    {
      name: 'Card title on card background',
      foreground: colors.neutral[900],
      background: colors.neutral[100],
      context: 'Card headings',
    },
    {
      name: 'Card text on card background',
      foreground: colors.neutral[700],
      background: colors.neutral[100],
      context: 'Card body text',
    },
    
    // Region filter tabs
    {
      name: 'Active tab text',
      foreground: colors.neutral[50],
      background: colors.primary[500],
      context: 'Selected region filter tab',
    },
    {
      name: 'Inactive tab text',
      foreground: colors.neutral[700],
      background: colors.neutral[200],
      context: 'Unselected region filter tab',
    },
    
    // Form inputs
    {
      name: 'Input text',
      foreground: colors.neutral[900],
      background: colors.neutral[50],
      context: 'Form input fields',
    },
    {
      name: 'Input placeholder',
      foreground: colors.neutral[400],
      background: colors.neutral[50],
      context: 'Form input placeholders',
    },
    
    // Headings (large text)
    {
      name: 'H1 heading',
      foreground: colors.neutral[900],
      background: colors.neutral[50],
      isLargeText: true,
      context: 'Main page headings',
    },
    {
      name: 'H2 heading',
      foreground: colors.primary[700],
      background: colors.neutral[50],
      isLargeText: true,
      context: 'Section headings',
    },
    
    // Navigation
    {
      name: 'Nav link',
      foreground: colors.neutral[700],
      background: colors.neutral[50],
      context: 'Navigation menu items',
    },
    {
      name: 'Nav link hover',
      foreground: colors.primary[600],
      background: colors.neutral[50],
      context: 'Navigation menu hover',
    },
    
    // Footer
    {
      name: 'Footer text',
      foreground: colors.neutral[400],
      background: colors.neutral[900],
      context: 'Footer content',
    },
    {
      name: 'Footer link',
      foreground: colors.neutral[300],
      background: colors.neutral[900],
      context: 'Footer links',
    },
  ];
}

/**
 * Test result for a color combination
 */
export interface ContrastTestResult {
  combination: ColorCombination;
  ratio: number;
  passes: boolean;
  minimumRequired: number;
}

/**
 * Run contrast tests for all critical combinations
 */
export function runContrastTests(isDark: boolean): ContrastTestResult[] {
  const combinations = getCriticalColorCombinations(isDark);
  
  return combinations.map(combination => {
    const ratio = getContrastRatio(combination.foreground, combination.background);
    const minimumRequired = combination.isLargeText ? 3.0 : 4.5;
    const passes = ratio >= minimumRequired;
    
    return {
      combination,
      ratio,
      passes,
      minimumRequired,
    };
  });
}

/**
 * Generate a report of all contrast test results
 */
export function generateContrastReport(isDark: boolean): string {
  const results = runContrastTests(isDark);
  const mode = isDark ? 'Dark' : 'Light';
  
  const passed = results.filter(r => r.passes).length;
  const failed = results.filter(r => !r.passes).length;
  
  let report = `\n=== WCAG AA Contrast Report (${mode} Mode) ===\n\n`;
  report += `Total Tests: ${results.length}\n`;
  report += `Passed: ${passed}\n`;
  report += `Failed: ${failed}\n\n`;
  
  if (failed > 0) {
    report += `FAILURES:\n`;
    results
      .filter(r => !r.passes)
      .forEach(result => {
        report += `\n❌ ${result.combination.name}\n`;
        report += `   Context: ${result.combination.context}\n`;
        report += `   Ratio: ${formatRatio(result.ratio)} (Required: ${result.minimumRequired}:1)\n`;
        report += `   Foreground: rgb(${result.combination.foreground.join(', ')})\n`;
        report += `   Background: rgb(${result.combination.background.join(', ')})\n`;
      });
    report += `\n`;
  }
  
  report += `PASSES:\n`;
  results
    .filter(r => r.passes)
    .forEach(result => {
      report += `\n✅ ${result.combination.name}\n`;
      report += `   Context: ${result.combination.context}\n`;
      report += `   Ratio: ${formatRatio(result.ratio)} (Required: ${result.minimumRequired}:1)\n`;
    });
  
  return report;
}
