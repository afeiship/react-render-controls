import { Children } from 'react';
import type { RenderIfProps } from './render-if.type';
import { isDev } from '../shared/env';

/**
 * RenderIf - Conditional rendering component
 *
 * @example Single child (render when true, nothing when false)
 * ```tsx
 * <RenderIf when={isLoggedIn}>
 *   <Dashboard />
 * </RenderIf>
 * ```
 *
 * @example Two children (if/else pattern)
 * ```tsx
 * <RenderIf when={isLoggedIn}>
 *   <Dashboard />
 *   <Login />
 * </RenderIf>
 * ```
 */
export function RenderIf({ when, children }: RenderIfProps) {
  const childArray = Children.toArray(children);

  if (childArray.length === 0) {
    return null;
  }

  if (childArray.length > 2) {
    if (isDev) {
      console.warn(
        `RenderIf: Expected at most 2 children, but got ${childArray.length}. Only the first 2 children will be used.`
      );
    }
  }

  if (childArray.length === 1) {
    return when ? childArray[0] : null;
  }

  // length >= 2: first child for true, second for false
  return when ? childArray[0] : childArray[1];
}

export default RenderIf;
