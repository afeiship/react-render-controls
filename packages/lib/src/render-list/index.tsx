import React from 'react';
import type { RenderListProps } from './render-list.type';
import { isRenderFn, getKey } from './render-list.utils';

/**
 * RenderList - Recommended list component
 *
 * @example Function style
 * ```tsx
 * <RenderList
 *   items={users}
 *   render={(user) => <UserCard user={user} />}
 *   keyBy="id"
 * />
 * ```
 *
 * @example Component style
 * ```tsx
 * <RenderList
 *   items={users}
 *   render={{
 *     component: UserCard,
 *     dataKey: "user",
 *     props: { variant: 'compact' }
 *   }}
 *   keyBy="id"
 * />
 * ```
 */
export default function RenderList<T>({ items, render, keyBy }: RenderListProps<T>) {
  return (
    <>
      {items.map((item, index) => {
        const key = getKey(item, index, keyBy);

        // If render is a function, call it directly
        if (isRenderFn(render)) {
          return <React.Fragment key={key}>{render(item, index)}</React.Fragment>;
        }

        // If render is component config, wrap props automatically
        const { component: Component, dataKey = 'item', props = {} } = render;
        const componentProps = {
          ...props,
          [dataKey]: item,
        };

        return (
          <React.Fragment key={key}>
            <Component {...componentProps} />
          </React.Fragment>
        );
      })}
    </>
  );
}
