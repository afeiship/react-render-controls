import { type ReactNode } from 'react';

export interface RenderIfProps {
  /**
   * Condition to determine which child to render
   * Accepts any type and will be wrapped with `Boolean()` for evaluation
   * - true/truthy: renders the first child
   * - false/falsy: renders the second child (if provided)
   *
   * @example
   * ```tsx
   * // Boolean
   * <RenderIf when={true}>...</RenderIf>
   * // Number (0 is falsy, others are truthy)
   * <RenderIf when={count}>...</RenderIf>
   * // String (empty string is falsy, others are truthy)
   * <RenderIf when={message}>...</RenderIf>
   * // Object/Array (null is falsy, others are truthy)
   * <RenderIf when={items}>...</RenderIf>
   * ```
   */
  when: unknown;
  /**
   * Children to render based on condition
   * - 1 child: renders when `when` is true, nothing when false
   * - 2 children: first renders when `when` is true, second when false
   */
  children: ReactNode;
}
