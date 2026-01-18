import { Children, isValidElement, type ReactElement } from 'react';
import type { RenderSwitchProps } from './render-switch.type';
import { findTrueCaseIndex, findAllTrueCaseIndices, validateCasesLength } from './render-switch.utils';
import React from 'react';

/**
 * RenderSwitch - Switch-style conditional rendering
 *
 * By `default` (multiple=false), renders only the first matching child.
 * When multiple=true, renders all children whose corresponding case conditions are true.
 * If none matches, renders `fallback` (or null if not provided).
 *
 * @example Basic usage - render only first match
 * ```tsx
 * <RenderSwitch cases={[isLoading, isError, isSuccess]}>
 *   <LoadingSpinner />
 *   <ErrorDisplay />
 *   <SuccessMessage />
 * </RenderSwitch>
 * // Only renders the first matching child
 * ```
 *
 * @example With multiple - render all matches
 * ```tsx
 * <RenderSwitch cases={[hasRead, hasWrite, hasDelete]} multiple>
 *   <ReadPermission />
 *   <WritePermission />
 *   <DeletePermission />
 * </RenderSwitch>
 * // If hasRead=true, hasWrite=true, hasDelete=false,
 * // renders both ReadPermission and WritePermission
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
  multiple = false,
}: RenderSwitchProps) {
  const childArray = Children.toArray(children).filter(
    (child): child is ReactElement => isValidElement(child)
  );

  validateCasesLength(cases.length, childArray.length, 'RenderSwitch');

  if (multiple) {
    // Render all matches
    const matchedIndices = findAllTrueCaseIndices(cases);
    const matchedChildren = matchedIndices
      .filter(index => index >= 0 && index < childArray.length)
      .map(index => childArray[index]);

    if (matchedChildren.length > 0) {
      return <>{matchedChildren}</>;
    }
  } else {
    // Default behavior: only render first match
    const matchedIndex = findTrueCaseIndex(cases);

    if (matchedIndex >= 0 && matchedIndex < childArray.length) {
      return childArray[matchedIndex];
    }
  }

  return fallback;
}

export default RenderSwitch;
