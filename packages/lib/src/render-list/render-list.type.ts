import { type ElementType, type ReactNode } from 'react';

export type RenderFn<T> = (item: T, index: number) => ReactNode;

export interface RenderComponentConfig<P> {
  component: ElementType<P & { children?: ReactNode }>;
  /**
   * Specifies the name of the data field
   * @example dataKey="user" will pass item as user prop to the component
   */
  dataKey?: string;
  /** Additional props to pass to the component */
  props?: P;
}

export type RenderProp<T> = RenderFn<T> | RenderComponentConfig<any>;

export type KeyBy<T> = ((item: T, index: number) => string | number) | keyof T;

export interface RenderListProps<T> {
  items: readonly T[];
  /**
   * Unified render prop
   *
   * @example Function
   * render={(user) => <UserCard user={user} />}
   *
   * @example Component
   * render={{
   *   component: UserCard,
   *   dataKey: "user",
   *   props: { variant: 'compact' }
   * }}
   */
  render: RenderProp<T>;
  /**
   * Specifies how to get the unique key for each item
   * - Pass a function: (item) => item.id
   * - Pass a field name: "id"
   * @default (item, index) => index
   */
  keyBy?: KeyBy<T>;
}
