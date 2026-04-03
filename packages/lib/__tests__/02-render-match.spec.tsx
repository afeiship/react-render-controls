/**
 * @file RenderMatch 组件测试
 * @description 测试 RenderMatch 组件的字符串值模式匹配渲染能力，包括：
 * - 基本匹配：根据 value 在 items 中的位置渲染对应子组件
 * - 数组匹配：items 中支持字符串数组（多个值映射到同一个子组件）
 * - 未匹配处理：value 不在 items 中时返回 null
 * - 子组件不足处理：匹配到的索引超过子组件数量时返回 null
 * - 工具函数：findMatchIndex、getAllValues
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RenderMatch } from '../src/render-match';
import { findMatchIndex, getAllValues } from '../src/render-match/render-match.utils';

describe('RenderMatch', () => {
  describe('basic string matching', () => {
    it('should render the first child when value matches items[0]', () => {
      render(
        <RenderMatch value="pending" items={['pending', 'success', 'error']}>
          <span>Pending</span>
          <span>Success</span>
          <span>Error</span>
        </RenderMatch>
      );
      expect(screen.getByText('Pending')).toBeInTheDocument();
      expect(screen.queryByText('Success')).not.toBeInTheDocument();
      expect(screen.queryByText('Error')).not.toBeInTheDocument();
    });

    it('should render the second child when value matches items[1]', () => {
      render(
        <RenderMatch value="success" items={['pending', 'success', 'error']}>
          <span>Pending</span>
          <span>Success</span>
          <span>Error</span>
        </RenderMatch>
      );
      expect(screen.queryByText('Pending')).not.toBeInTheDocument();
      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.queryByText('Error')).not.toBeInTheDocument();
    });

    it('should render the third child when value matches items[2]', () => {
      render(
        <RenderMatch value="error" items={['pending', 'success', 'error']}>
          <span>Pending</span>
          <span>Success</span>
          <span>Error</span>
        </RenderMatch>
      );
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });

  describe('array value matching', () => {
    it('should match value against array items', () => {
      render(
        <RenderMatch
          value="processing"
          items={[['pending', 'processing'], 'success', 'error']}
        >
          <span>Loading</span>
          <span>Success</span>
          <span>Error</span>
        </RenderMatch>
      );
      expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    it('should match first value in array items', () => {
      render(
        <RenderMatch
          value="pending"
          items={[['pending', 'processing'], 'success']}
        >
          <span>Loading</span>
          <span>Done</span>
        </RenderMatch>
      );
      expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    it('should match mixed string and array items', () => {
      render(
        <RenderMatch
          value="b"
          items={['a', ['b', 'c'], 'd']}
        >
          <span>A</span>
          <span>BC</span>
          <span>D</span>
        </RenderMatch>
      );
      expect(screen.getByText('BC')).toBeInTheDocument();
    });
  });

  describe('no match', () => {
    it('should return null when value does not match any item', () => {
      const { container } = render(
        <RenderMatch value="unknown" items={['a', 'b']}>
          <span>A</span>
          <span>B</span>
        </RenderMatch>
      );
      expect(container.innerHTML).toBe('');
    });
  });

  describe('not enough children', () => {
    it('should return null when matched index exceeds children count', () => {
      const { container } = render(
        <RenderMatch value="c" items={['a', 'b', 'c']}>
          <span>A</span>
          <span>B</span>
        </RenderMatch>
      );
      expect(container.innerHTML).toBe('');
    });
  });
});

describe('findMatchIndex', () => {
  it('should return index of matched string', () => {
    expect(findMatchIndex('b', ['a', 'b', 'c'])).toBe(1);
  });

  it('should return index of matched array item', () => {
    expect(findMatchIndex('x', [['x', 'y'], 'z'])).toBe(0);
  });

  it('should return -1 when no match', () => {
    expect(findMatchIndex('missing', ['a', 'b'])).toBe(-1);
  });

  it('should return first match when multiple items could match', () => {
    expect(findMatchIndex('a', ['a', ['a', 'b'], 'c'])).toBe(0);
  });
});

describe('getAllValues', () => {
  it('should flatten all items into a single string array', () => {
    expect(getAllValues(['a', ['b', 'c'], 'd'])).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should handle all string items', () => {
    expect(getAllValues(['x', 'y', 'z'])).toEqual(['x', 'y', 'z']);
  });

  it('should handle all array items', () => {
    expect(getAllValues([['a', 'b'], ['c', 'd']])).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should return empty array for empty input', () => {
    expect(getAllValues([])).toEqual([]);
  });
});
