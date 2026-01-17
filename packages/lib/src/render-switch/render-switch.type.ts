import { type ReactNode } from 'react';

export interface RenderSwitchProps {
  /**
   * Array of boolean conditions to match against children
   * - The first true condition determines which child to render
   * @example [true, false, false] renders the first child
   * @example [false, true, false] renders the second child
   */
  cases: readonly boolean[];
  /**
   * Children to render based on matching case
   * - First child renders when cases[0] is true
   * - Second child renders when cases[1] is true
   * - And so on...
   */
  children: ReactNode;
  /**
   * Fallback content to render when no cases match
   * @default null
   */
  fallback?: ReactNode;
}
