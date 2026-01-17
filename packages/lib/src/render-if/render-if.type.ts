import { type ReactElement } from 'react';

export interface RenderIfProps {
  /**
   * Condition to determine which child to render
   * - true: renders the first child
   * - false: renders the second child (if provided)
   */
  when: boolean;
  /**
   * Children to render based on condition
   * - 1 child: renders when `when` is true, nothing when false
   * - 2 children: first renders when `when` is true, second when false
   */
  children: [ReactElement] | [ReactElement, ReactElement];
}
