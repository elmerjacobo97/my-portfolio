import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================
// FUNCTIONS FORMATS
// ============================================

export function getNumberSuffix(num: number): string {
  if (num >= 1_000_000_000) return 'B+';
  if (num >= 1_000_000) return 'M+';
  if (num >= 1_000) return 'K+';
  return '';
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
