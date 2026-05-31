import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Null-safe case-insensitive string search — prevents crash on null/undefined text fields */
export function safeIncludes(
  text: string | null | undefined,
  query: string
): boolean {
  if (text == null || query == null) return false;
  return text.toLowerCase().includes(query.toLowerCase());
}
