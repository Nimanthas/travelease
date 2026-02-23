#!/usr/bin/env ts-node
/**
 * Contrast Ratio Verification Script
 * 
 * Runs WCAG AA contrast checks for both light and dark modes
 * and outputs a detailed report.
 * 
 * Usage: npx ts-node scripts/check-contrast.ts
 */

import { generateContrastReport } from '../src/utils/contrastChecker';

console.log('Running WCAG AA Contrast Verification...\n');

// Test light mode
console.log(generateContrastReport(false));

// Test dark mode
console.log('\n' + '='.repeat(60) + '\n');
console.log(generateContrastReport(true));

console.log('\n' + '='.repeat(60));
console.log('\nContrast verification complete.');
