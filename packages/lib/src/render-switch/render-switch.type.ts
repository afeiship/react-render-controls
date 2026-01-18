import { type ReactNode } from 'react';

export interface RenderSwitchProps {
  /**
   * Array of boolean conditions to match against children
   * - By default (multiple=false), only the first true condition's child is rendered
   * - When multiple=true, all true conditions' corresponding children will be rendered
   * @example [true, false, false] renders the first child
   * @example [false, true, false] renders the second child
   * @example [true, true, false] renders first child only (default)
   * @example [true, true, false] renders first and second children (when multiple=true)
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
  /**
   * If true, render all matching children
   * If false (default), only render the first matching child
   * @default false
   */
  multiple?: boolean;
}
