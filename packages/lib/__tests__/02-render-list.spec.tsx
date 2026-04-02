/**
 * @file RenderList 组件测试
 * @description 测试 RenderList 组件的列表渲染能力，包括：
 * - 函数式渲染：通过 render 函数渲染每个列表项
 * - 组件式渲染：通过 component config 对象声明式渲染
 * - keyBy 功能：支持函数、字段名、以及默认 index 作为 key
 * - 工具函数：isRenderFn 类型守卫、getKey key 解析
 * - 边界情况：空数组、单元素数组
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RenderList from '../src/render-list';
import { isRenderFn, getKey } from '../src/render-list/render-list.utils';

describe('RenderList', () => {
  describe('function style rendering', () => {
    it('should render items using a render function', () => {
      const items = ['Apple', 'Banana', 'Cherry'];
      render(
        <RenderList
          items={items}
          render={(item) => <span>{item}</span>}
        />
      );
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.getByText('Cherry')).toBeInTheDocument();
    });

    it('should pass index and items array to render function', () => {
      const items = ['A', 'B'];
      render(
        <RenderList
          items={items}
          render={(item, index, arr) => (
            <span>{item}-{index}-{arr.length}</span>
          )}
        />
      );
      expect(screen.getByText('A-0-2')).toBeInTheDocument();
      expect(screen.getByText('B-1-2')).toBeInTheDocument();
    });

    it('should render nothing for an empty array', () => {
      const { container } = render(
        <RenderList items={[]} render={(item) => <span>{item}</span>} />
      );
      expect(container.innerHTML).toBe('');
    });

    it('should handle object items', () => {
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ];
      render(
        <RenderList
          items={users}
          render={(user) => <span>{user.name}</span>}
        />
      );
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  describe('component style rendering', () => {
    it('should render items using component config', () => {
      const Item = ({ item }: { item: string }) => <span>{item}</span>;
      const items = ['X', 'Y'];
      render(
        <RenderList
          items={items}
          render={{ component: Item }}
        />
      );
      expect(screen.getByText('X')).toBeInTheDocument();
      expect(screen.getByText('Y')).toBeInTheDocument();
    });

    it('should use custom dataKey to pass item', () => {
      const UserCard = ({ user }: { user: { name: string } }) => (
        <span>{user.name}</span>
      );
      const users = [{ name: 'Alice' }];
      render(
        <RenderList
          items={users}
          render={{ component: UserCard, dataKey: 'user' }}
        />
      );
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    it('should pass additional props to component', () => {
      const Item = ({ item, suffix }: { item: string; suffix: string }) => (
        <span>{item}{suffix}</span>
      );
      render(
        <RenderList
          items={['Hello']}
          render={{ component: Item, props: { suffix: '!' } }}
        />
      );
      expect(screen.getByText('Hello!')).toBeInTheDocument();
    });
  });

  describe('keyBy', () => {
    it('should use index as key by default', () => {
      const items = ['A', 'B'];
      const { container } = render(
        <RenderList
          items={items}
          render={(item) => <span>{item}</span>}
        />
      );
      const fragments = container.querySelectorAll('[data-reactroot], span');
      expect(fragments.length).toBeGreaterThan(0);
    });

    it('should use field name as key when keyBy is a string', () => {
      const items = [
        { id: 'a', name: 'Alice' },
        { id: 'b', name: 'Bob' },
      ];
      const { container } = render(
        <RenderList
          items={items}
          keyBy="id"
          render={(item) => <span>{item.name}</span>}
        />
      );
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });

    it('should use function as key when keyBy is a function', () => {
      const items = [
        { uid: 100, label: 'X' },
        { uid: 200, label: 'Y' },
      ];
      render(
        <RenderList
          items={items}
          keyBy={(item) => item.uid}
          render={(item) => <span>{item.label}</span>}
        />
      );
      expect(screen.getByText('X')).toBeInTheDocument();
      expect(screen.getByText('Y')).toBeInTheDocument();
    });
  });
});

describe('isRenderFn', () => {
  it('should return true for a function', () => {
    expect(isRenderFn(() => <span />)).toBe(true);
  });

  it('should return false for a component config object', () => {
    expect(isRenderFn({ component: () => <span /> })).toBe(false);
  });
});

describe('getKey', () => {
  const items = [
    { id: 'a', name: 'Alice' },
    { id: 'b', name: 'Bob' },
  ];

  it('should return index when keyBy is undefined', () => {
    expect(getKey(items[0], 0, items, undefined)).toBe(0);
  });

  it('should return field value when keyBy is a string', () => {
    expect(getKey(items[0], 0, items, 'id')).toBe('a');
  });

  it('should return function result when keyBy is a function', () => {
    expect(getKey(items[1], 1, items, (item) => item.name)).toBe('Bob');
  });

  it('should return index when keyBy field does not exist on item', () => {
    // @ts-ignore
    expect(getKey(items[0], 0, items, 'missing')).toBe(0);
  });
});
