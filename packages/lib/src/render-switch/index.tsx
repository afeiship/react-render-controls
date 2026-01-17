import { Children, isValidElement, type ReactElement } from 'react';
import type { RenderSwitchProps } from './render-switch.type';
import { findTrueCaseIndex, validateCasesLength } from './render-switch.utils';

/**
 * RenderSwitch - Switch-style conditional rendering
 *
 * Renders the first child whose corresponding case condition is true.
 * If none matches, renders `fallback` (or null if not provided).
 *
 * @example Basic usage
 * ```tsx
 * <RenderSwitch cases={[isLoading, isError, isSuccess]}>
 *   <LoadingSpinner />
 *   <ErrorDisplay />
 *   <SuccessMessage />
 * </RenderSwitch>
 * ```
 *
 * @example With fallback
 * ```tsx
 * <RenderSwitch
 *   cases={[isAdmin, isModerator]}
 *   fallback={<AccessDenied />}
 * >
 *   <AdminPanel />
 *   <ModeratorPanel />
 * </RenderSwitch>
 * ```
 */
export function RenderSwitch({
  cases,
  children,
  fallback = null,
}: RenderSwitchProps) {
  const childArray = Children.toArray(children).filter(
    (child): child is ReactElement => isValidElement(child)
  );

  validateCasesLength(cases.length, childArray.length, 'RenderSwitch');

  const matchedIndex = findTrueCaseIndex(cases);

  // Check if the matched index is within the children bounds
  if (matchedIndex >= 0 && matchedIndex < childArray.length) {
    return childArray[matchedIndex];
  }

  return fallback;
}

export default RenderSwitch;
