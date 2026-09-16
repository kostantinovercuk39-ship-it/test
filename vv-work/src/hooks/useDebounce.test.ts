import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDebounce } from './useDebounce';

describe('useDebounce hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('повертає початкове значення одразу', () => {
    const { result } = renderHook(() => useDebounce('початкове', 300));
    expect(result.current).toBe('початкове');
  });

  it('оновлює значення тільки після закінчення вказаного таймауту', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) => useDebounce(value, delay),
      { initialProps: { value: 'тест', delay: 300 } }
    );

    rerender({ value: 'нове значення', delay: 300 });
    expect(result.current).toBe('тест');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('нове значення');
  });

  it('скидає таймер при швидкому повторному введенні', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) => useDebounce(value, delay),
      { initialProps: { value: 'a', delay: 300 } }
    );

    rerender({ value: 'ab', delay: 300 });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({ value: 'abc', delay: 300 });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('abc');
  });
});