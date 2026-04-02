/**
 * @file RenderIf 组件测试
 * @description 测试 RenderIf 组件的条件渲染能力，包括：
 * - 单子节点：when 为 truthy 时渲染，falsy 时返回 null
 * - 双子节点：when 为 truthy 渲染第一个，falsy 渲染第二个（if/else 模式）
 * - 边界情况：无子节点、超过 2 个子节点、各种 falsy 值
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RenderIf } from '../src/render-if';

describe('RenderIf', () => {
  describe('single child - if mode', () => {
    it('should render child when condition is truthy', () => {
      render(
        <RenderIf when={true}>
          <span>Hello</span>
        </RenderIf>
      );
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    it('should not render child when condition is falsy', () => {
      render(
        <RenderIf when={false}>
          <span>Hello</span>
        </RenderIf>
      );
      expect(screen.queryByText('Hello')).not.toBeInTheDocument();
    });

    it('should render child when condition is a truthy number', () => {
      render(
        <RenderIf when={1}>
          <span>Visible</span>
        </RenderIf>
      );
      expect(screen.getByText('Visible')).toBeInTheDocument();
    });

    it('should not render child when condition is 0', () => {
      render(
        <RenderIf when={0}>
          <span>Hidden</span>
        </RenderIf>
      );
      expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
    });

    it('should render child when condition is a non-empty string', () => {
      render(
        <RenderIf when="yes">
          <span>Shown</span>
        </RenderIf>
      );
      expect(screen.getByText('Shown')).toBeInTheDocument();
    });

    it('should not render child when condition is empty string', () => {
      render(
        <RenderIf when="">
          <span>Hidden</span>
        </RenderIf>
      );
      expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
    });

    it('should not render child when condition is null', () => {
      render(
        <RenderIf when={null}>
          <span>Hidden</span>
        </RenderIf>
      );
      expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
    });

    it('should not render child when condition is undefined', () => {
      render(
        <RenderIf when={undefined}>
          <span>Hidden</span>
        </RenderIf>
      );
      expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
    });
  });

  describe('two children - if/else mode', () => {
    it('should render first child when condition is truthy', () => {
      render(
        <RenderIf when={true}>
          <span>Yes</span>
          <span>No</span>
        </RenderIf>
      );
      expect(screen.getByText('Yes')).toBeInTheDocument();
      expect(screen.queryByText('No')).not.toBeInTheDocument();
    });

    it('should render second child when condition is falsy', () => {
      render(
        <RenderIf when={false}>
          <span>Yes</span>
          <span>No</span>
        </RenderIf>
      );
      expect(screen.queryByText('Yes')).not.toBeInTheDocument();
      expect(screen.getByText('No')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should return null when no children are provided', () => {
      const { container } = render(<RenderIf when={true}>{''}</RenderIf>);
      expect(container.innerHTML).toBe('');
    });

    it('should only use first two children when more than two are provided', () => {
      render(
        <RenderIf when={true}>
          <span>First</span>
          <span>Second</span>
          <span>Third</span>
        </RenderIf>
      );
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.queryByText('Third')).not.toBeInTheDocument();
    });

    it('should handle array values as condition', () => {
      render(
        <RenderIf when={[1, 2, 3]}>
          <span>Array is truthy</span>
        </RenderIf>
      );
      expect(screen.getByText('Array is truthy')).toBeInTheDocument();
    });
  });
});
