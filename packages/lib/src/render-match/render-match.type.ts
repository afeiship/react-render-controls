import { type ReactNode } from 'react';

export type MatchValue = string | readonly string[];

export interface RenderMatchProps<T = string> {
  /**
   * The value to match against items
   * @example "pending" | "success" | "error"
   */
  value: T;
  /**
   * List of match values
   * - Can be a single string: "pending"
   * - Can be an array of strings: ["pending", "processing"]
   *
   * The index of the matched item determines which child to render
   */
  items: readonly MatchValue[];
  /**
   * Children to render based on matched index
   * - First child renders when value matches items[0]
   * - Second child renders when value matches items[1]
   * - And so on...
   */
  children: ReactNode;
}
