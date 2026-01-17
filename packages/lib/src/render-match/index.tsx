import { Children, isValidElement, type ReactElement } from 'react';
import type { RenderMatchProps } from './render-match.type';
import { findMatchIndex, getAllValues } from './render-match.utils';
import { isDev } from '../shared/env';

/**
 * RenderMatch - Match value against items and render corresponding child
 *
 * @example Basic usage
 * ```tsx
 * <RenderMatch value="success" items={['pending', 'success', 'error']}>
 *   <PendingState />
 *   <SuccessState />
 *   <ErrorState />
 * </RenderMatch>
 * ```
 *
 * @example With array values (multiple values map to same child)
 * ```tsx
 * <RenderMatch
 *   value="processing"
 *   items={[['pending', 'processing'], 'success', 'error']}
 * >
 *   <LoadingState />
 *   <SuccessState />
 *   <ErrorState />
 * </RenderMatch>
 * ```
 */
export function RenderMatch<T extends string = string>({
  value,
  items,
  children,
}: RenderMatchProps<T>) {
  // Find the matched slot index
  const matchedIndex = findMatchIndex(value, items);

  if (matchedIndex === -1) {
    if (isDev) {
      const allValues = getAllValues(items);
      console.warn(
        `RenderMatch: Value "${value}" not found in any of the items. Available values: [${allValues.join(', ')}]`
      );
    }
    return null;
  }

  const validChildren = Children.toArray(children).filter(
    (child): child is ReactElement => isValidElement(child)
  );

  if (matchedIndex >= validChildren.length) {
    if (isDev) {
      console.warn(
        `RenderMatch: Not enough children provided. Expected at least ${matchedIndex + 1}, but got ${validChildren.length}.`
      );
    }
    return null;
  }

  return validChildren[matchedIndex] ?? null;
}

export default RenderMatch;
