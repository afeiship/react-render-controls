import type { MatchValue } from './render-match.type';

/**
 * Find the index of the item that matches the value
 * @param items The items to search in
 * @param value The value to match
 * @returns The matched index, or -1 if not found
 */
export function findMatchIndex(
  value: string,
  items: readonly MatchValue[]
): number {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (typeof item === 'string') {
      if (item === value) {
        return i;
      }
    } else {
      // item is string[]
      if (item.includes(value)) {
        return i;
      }
    }
  }
  return -1;
}

/**
 * Get all possible values from items (flatten string arrays)
 * @param items The items to get values from
 * @returns The flattened string array of all values
 */
export function getAllValues(items: readonly MatchValue[]): string[] {
  const result: string[] = [];
  for (const item of items) {
    if (typeof item === 'string') {
      result.push(item);
    } else {
      result.push(...item);
    }
  }
  return result;
}
