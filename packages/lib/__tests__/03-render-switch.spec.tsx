/**
 * @file RenderSwitch 组件测试
 * @description 测试 RenderSwitch 组件的布尔条件切换渲染能力，包括：
 * - 默认模式（multiple=false）：渲染第一个匹配的子组件
 * - 多匹配模式（multiple=true）：渲染所有匹配的子组件
 * - fallback：无匹配时渲染备用内容
 * - 边界情况：全 false、全 true、cases 多于 children
 * - 工具函数：findTrueCaseIndex、findAllTrueCaseIndices、validateCasesLength
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RenderSwitch } from '../src/render-switch';
import {
  findTrueCaseIndex,
  findAllTrueCaseIndices,
  validateCasesLength,
} from '../src/render-switch/render-switch.utils';

describe('RenderSwitch', () => {
  describe('default mode (single match)', () => {
    it('should render the first matching child', () => {
      render(
        <RenderSwitch cases={[true, false, false]}>
          <span>First</span>
          <span>Second</span>
          <span>Third</span>
        </RenderSwitch>
      );
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.queryByText('Second')).not.toBeInTheDocument();
      expect(screen.queryByText('Third')).not.toBeInTheDocument();
    });

    it('should render the second matching child', () => {
      render(
        <RenderSwitch cases={[false, true, false]}>
          <span>First</span>
          <span>Second</span>
          <span>Third</span>
        </RenderSwitch>
      );
      expect(screen.queryByText('First')).not.toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('should render only the first match even when multiple are true', () => {
      render(
        <RenderSwitch cases={[true, true, false]}>
          <span>First</span>
          <span>Second</span>
          <span>Third</span>
        </RenderSwitch>
      );
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.queryByText('Second')).not.toBeInTheDocument();
    });
  });

  describe('multiple mode', () => {
    it('should render all matching children', () => {
      render(
        <RenderSwitch cases={[true, true, false]} multiple>
          <span>First</span>
          <span>Second</span>
          <span>Third</span>
        </RenderSwitch>
      );
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
      expect(screen.queryByText('Third')).not.toBeInTheDocument();
    });

    it('should render all children when all cases are true', () => {
      render(
        <RenderSwitch cases={[true, true, true]} multiple>
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </RenderSwitch>
      );
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
      expect(screen.getByText('C')).toBeInTheDocument();
    });

    it('should render nothing when all cases are false in multiple mode', () => {
      const { container } = render(
        <RenderSwitch cases={[false, false, false]} multiple>
          <span>A</span>
          <span>B</span>
          <span>C</span>
        </RenderSwitch>
      );
      expect(container.innerHTML).toBe('');
    });
  });

  describe('fallback', () => {
    it('should render fallback when no cases match', () => {
      render(
        <RenderSwitch cases={[false, false]} fallback={<span>Default</span>}>
          <span>A</span>
          <span>B</span>
        </RenderSwitch>
      );
      expect(screen.getByText('Default')).toBeInTheDocument();
    });

    it('should render fallback in multiple mode when no cases match', () => {
      render(
        <RenderSwitch cases={[false, false]} multiple fallback={<span>NoMatch</span>}>
          <span>A</span>
          <span>B</span>
        </RenderSwitch>
      );
      expect(screen.getByText('NoMatch')).toBeInTheDocument();
    });

    it('should not render fallback when a case matches', () => {
      render(
        <RenderSwitch cases={[true, false]} fallback={<span>Fallback</span>}>
          <span>Matched</span>
          <span>Other</span>
        </RenderSwitch>
      );
      expect(screen.getByText('Matched')).toBeInTheDocument();
      expect(screen.queryByText('Fallback')).not.toBeInTheDocument();
    });

    it('should render null by default when no cases match and no fallback', () => {
      const { container } = render(
        <RenderSwitch cases={[false, false]}>
          <span>A</span>
          <span>B</span>
        </RenderSwitch>
      );
      expect(container.innerHTML).toBe('');
    });
  });

  describe('edge cases', () => {
    it('should handle empty cases array', () => {
      const { container } = render(
        <RenderSwitch cases={[]}>
          <span>Child</span>
        </RenderSwitch>
      );
      expect(container.innerHTML).toBe('');
    });

    it('should handle single case', () => {
      render(
        <RenderSwitch cases={[true]}>
          <span>Only</span>
        </RenderSwitch>
      );
      expect(screen.getByText('Only')).toBeInTheDocument();
    });
  });
});

describe('findTrueCaseIndex', () => {
  it('should return index of first true value', () => {
    expect(findTrueCaseIndex([false, true, true])).toBe(1);
  });

  it('should return 0 when first element is true', () => {
    expect(findTrueCaseIndex([true, false])).toBe(0);
  });

  it('should return -1 when no true values', () => {
    expect(findTrueCaseIndex([false, false, false])).toBe(-1);
  });

  it('should return -1 for empty array', () => {
    expect(findTrueCaseIndex([])).toBe(-1);
  });
});

describe('findAllTrueCaseIndices', () => {
  it('should return all indices where value is true', () => {
    expect(findAllTrueCaseIndices([true, false, true])).toEqual([0, 2]);
  });

  it('should return empty array when all are false', () => {
    expect(findAllTrueCaseIndices([false, false])).toEqual([]);
  });

  it('should return all indices when all are true', () => {
    expect(findAllTrueCaseIndices([true, true, true])).toEqual([0, 1, 2]);
  });
});

describe('validateCasesLength', () => {
  it('should not warn when cases length <= children length', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    validateCasesLength(2, 3, 'Test');
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('should warn when cases length > children length', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    validateCasesLength(3, 2, 'Test');
    expect(warnSpy).toHaveBeenCalledWith(
      'Test: More cases (3) than children (2). Extra cases will be ignored.'
    );
    warnSpy.mockRestore();
  });
});
