import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format episode number with season (if exists)
 */
export function formatProgress(season?: number, episode: number): string {
  if (season) {
    return `S${season}E${String(episode).padStart(2, "0")}`;
  }
  return `Ep. ${episode}`;
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.min((current / total) * 100, 100);
}

/**
 * Validate anime title
 */
export function validateTitle(title: string): boolean {
  return title.trim().length >= 1 && title.length <= 255;
}

/**
 * Validate episode number
 */
export function validateEpisode(episode: number): boolean {
  return Number.isInteger(episode) && episode > 0 && episode <= 10000;
}
