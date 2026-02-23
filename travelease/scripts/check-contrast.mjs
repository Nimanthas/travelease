#!/usr/bin/env node
/**
 * Contrast Ratio Verification Script
 * 
 * Runs WCAG AA contrast checks for both light and dark modes
 * and outputs a detailed report.
 * 
 * Usage: node scripts/check-contrast.mjs
 */

// Logo colors configuration
const logoColors = {
  light: {
    primary: {
      500: [26, 77, 46],
      600: [21, 61, 37],
      700: [16, 46, 28],
    },
    secondary: {
      500: [79, 121, 66],
      600: [63, 97, 53],
    },
    neutral: {
      50: [250, 248, 245],
      100: [245, 243, 240],
      200: [229, 227, 224],
      400: [82, 82, 91],
      500: [107, 114, 128],
      700: [55, 65, 81],
      900: [17, 24, 39],
    },
    accent: {
      500: [105, 82, 58],
    },
  },
  dark: {
    primary: {
      500: [102, 149, 114],
      600: [121, 167, 131],
    },
    secondary: {
      500: [107, 148, 86],
    },
    neutral: {
      50: [17, 24, 39],
      100: [31, 41, 55],
      200: [55, 65, 81],
      300: [75, 85, 99],
      400: [113, 113, 122],
      500: [156, 163, 175],
      700: [229, 231, 235],
      900: [249, 250, 251],
    },
    accent: {
      500: [232, 196, 160],
    },
  },
};

function getRelativeLuminance(rgb) {
  const [r, g, b] = rgb.map(val => {
    const sRGB = val / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(color1, color2) {
  const lum1 = getRelativeLuminance(color1);
  const lum2 = getRelativeLuminance(color2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

function formatRatio(ratio) {
  return `${ratio.toFixed(2)}:1`;
}

function getCriticalColorCombinations(isDark) {
  const colors = isDark ? logoColors.dark : logoColors.light;
  const white = [255, 255, 255];
  
  // Helper to safely get color or fallback
  const getColor = (obj, key) => obj[key] || white;
  
  return [
    // Primary text on backgrounds
    {
      name: 'Primary text on neutral background',
      foreground: getColor(colors.neutral, 900),
      background: getColor(colors.neutral, 50),
      minRatio: 4.5,
      context: 'Body text, paragraphs',
    },
    
    // Interactive elements
    {
      name: 'Primary button text',
      foreground: getColor(colors.neutral, 50),
      background: getColor(colors.primary, 500),
      minRatio: 4.5,
      context: 'Primary button labels',
    },
    {
      name: 'Primary button hover',
      foreground: getColor(colors.neutral, 50),
      background: getColor(colors.primary, 600),
      minRatio: 4.5,
      context: 'Primary button hover state',
    },
    {
      name: 'Secondary button text',
      foreground: getColor(colors.neutral, 50),
      background: getColor(colors.secondary, 500),
      minRatio: 4.5,
      context: 'Secondary button labels',
    },
    {
      name: 'Accent button text',
      foreground: getColor(colors.neutral, 50),
      background: getColor(colors.accent, 500),
      minRatio: 4.5,
      context: 'Accent/CTA button labels',
    },
    
    // Links and interactive text
    {
      name: 'Primary link on light background',
      foreground: getColor(colors.primary, 600),
      background: getColor(colors.neutral, 50),
      minRatio: 4.5,
      context: 'Text links',
    },
    {
      name: 'Primary link hover',
      foreground: getColor(colors.primary, 700),
      background: getColor(colors.neutral, 50),
      minRatio: 4.5,
      context: 'Text links hover state',
    },
    
    // Focus indicators
    {
      name: 'Focus ring on light background',
      foreground: getColor(colors.primary, 500),
      background: getColor(colors.neutral, 50),
      minRatio: 3.0,
      context: 'Keyboard focus indicators (non-text)',
    },
    
    // Card elements
    {
      name: 'Card title on card background',
      foreground: getColor(colors.neutral, 900),
      background: getColor(colors.neutral, 100),
      minRatio: 4.5,
      context: 'Card headings',
    },
    {
      name: 'Card text on card background',
      foreground: getColor(colors.neutral, 700),
      background: getColor(colors.neutral, 100),
      minRatio: 4.5,
      context: 'Card body text',
    },
    
    // Region filter tabs
    {
      name: 'Active tab text',
      foreground: getColor(colors.neutral, 50),
      background: getColor(colors.primary, 500),
      minRatio: 4.5,
      context: 'Selected region filter tab',
    },
    {
      name: 'Inactive tab text',
      foreground: getColor(colors.neutral, 700),
      background: getColor(colors.neutral, 200),
      minRatio: 4.5,
      context: 'Unselected region filter tab',
    },
    
    // Form inputs
    {
      name: 'Input text',
      foreground: getColor(colors.neutral, 900),
      background: getColor(colors.neutral, 50),
      minRatio: 4.5,
      context: 'Form input fields',
    },
    {
      name: 'Input placeholder',
      foreground: getColor(colors.neutral, 500),
      background: getColor(colors.neutral, 50),
      minRatio: 4.5,
      context: 'Form input placeholders',
    },
    
    // Headings (large text - 3:1 minimum)
    {
      name: 'H1 heading',
      foreground: getColor(colors.neutral, 900),
      background: getColor(colors.neutral, 50),
      minRatio: 3.0,
      context: 'Main page headings (large text)',
    },
    {
      name: 'H2 heading',
      foreground: getColor(colors.primary, 700),
      background: getColor(colors.neutral, 50),
      minRatio: 3.0,
      context: 'Section headings (large text)',
    },
    
    // Navigation
    {
      name: 'Nav link',
      foreground: getColor(colors.neutral, 700),
      background: getColor(colors.neutral, 50),
      minRatio: 4.5,
      context: 'Navigation menu items',
    },
    {
      name: 'Nav link hover',
      foreground: getColor(colors.primary, 600),
      background: getColor(colors.neutral, 50),
      minRatio: 4.5,
      context: 'Navigation menu hover',
    },
    
    // Footer
    {
      name: 'Footer text',
      foreground: getColor(colors.neutral, 300),
      background: getColor(colors.neutral, 900),
      minRatio: 4.5,
      context: 'Footer content',
    },
    {
      name: 'Footer link',
      foreground: getColor(colors.neutral, 300),
      background: getColor(colors.neutral, 900),
      minRatio: 4.5,
      context: 'Footer links',
    },
  ];
}

function runContrastTests(isDark) {
  const combinations = getCriticalColorCombinations(isDark);
  
  return combinations.map(combination => {
    const ratio = getContrastRatio(combination.foreground, combination.background);
    const passes = ratio >= combination.minRatio;
    
    return {
      combination,
      ratio,
      passes,
    };
  });
}

function generateReport(isDark) {
  const results = runContrastTests(isDark);
  const mode = isDark ? 'Dark' : 'Light';
  
  const passed = results.filter(r => r.passes).length;
  const failed = results.filter(r => !r.passes).length;
  
  let report = `\n${'='.repeat(60)}\n`;
  report += `WCAG AA Contrast Report (${mode} Mode)\n`;
  report += `${'='.repeat(60)}\n\n`;
  report += `Total Tests: ${results.length}\n`;
  report += `✅ Passed: ${passed}\n`;
  report += `❌ Failed: ${failed}\n\n`;
  
  if (failed > 0) {
    report += `${'='.repeat(60)}\n`;
    report += `FAILURES (Need Attention):\n`;
    report += `${'='.repeat(60)}\n`;
    results
      .filter(r => !r.passes)
      .forEach(result => {
        report += `\n❌ ${result.combination.name}\n`;
        report += `   Context: ${result.combination.context}\n`;
        report += `   Ratio: ${formatRatio(result.ratio)} (Required: ${result.combination.minRatio}:1)\n`;
        report += `   Foreground: rgb(${result.combination.foreground.join(', ')})\n`;
        report += `   Background: rgb(${result.combination.background.join(', ')})\n`;
      });
    report += `\n`;
  }
  
  report += `${'='.repeat(60)}\n`;
  report += `PASSES:\n`;
  report += `${'='.repeat(60)}\n`;
  results
    .filter(r => r.passes)
    .forEach(result => {
      report += `\n✅ ${result.combination.name}\n`;
      report += `   Context: ${result.combination.context}\n`;
      report += `   Ratio: ${formatRatio(result.ratio)} (Required: ${result.combination.minRatio}:1)\n`;
    });
  
  return report;
}

// Run tests
console.log('\n🔍 Running WCAG AA Contrast Verification...\n');

console.log(generateReport(false));
console.log('\n');
console.log(generateReport(true));

console.log('\n' + '='.repeat(60));
console.log('✨ Contrast verification complete.\n');
