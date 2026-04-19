import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatProgress(season: number | null | undefined, episode: number): string {
  if (season) {
    return `S${season}E${String(episode).padStart(2, "0")}`;
  }
  return `Ep. ${episode}`;
}

export function validateTitle(title: string): boolean {
  return title.trim().length >= 1 && title.length <= 255;
}

export function validateEpisode(episode: number): boolean {
  return Number.isInteger(episode) && episode > 0 && episode <= 10000;
}
