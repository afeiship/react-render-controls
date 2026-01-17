import type { RenderProp, RenderFn, KeyBy } from './render-list.type';

/**
 * Type guard: check if render is a function type
 */
export function isRenderFn<T>(render: RenderProp<T>): render is RenderFn<T> {
  return typeof render === 'function';
}

/**
 * Get the unique key for a list item
 */
export function getKey<T>(
  item: T,
  index: number,
  items: readonly T[],
  keyBy: KeyBy<T> | undefined,
): string | number {
  if (keyBy === undefined) {
    return index;
  }

  if (typeof keyBy === 'function') {
    return keyBy(item, index, items);
  }

  const value = (item as Record<string, unknown>)[keyBy as string];
  if (value === undefined || value === null) {
    console.warn(
      `RenderList: keyBy="${String(keyBy)}" but the field is undefined in ${JSON.stringify(item)}`,
    );
    return index;
  }

  return value as string | number;
}
