import { describe, it, expect, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { AnimatedCounter } from './AnimatedCounter';

describe('AnimatedCounter', () => {
  it('renders a span with count-in class', () => {
    const { container } = render(<AnimatedCounter target={100} />);

    expect(container.querySelector('.count-in')).toBeInTheDocument();
  });

  it('renders prefix and suffix around the value', () => {
    const { container } = render(<AnimatedCounter target={50} prefix="$" suffix="K" />);
    const span = container.querySelector('.count-in');

    expect(span?.textContent).toContain('$');
    expect(span?.textContent).toContain('K');
  });

  it('formats value with fixed decimals when decimals prop is set', () => {
    const { container } = render(<AnimatedCounter target={3.14} decimals={2} />);
    const span = container.querySelector('.count-in');

    // Initially at 0, formatted as "0.00"
    expect(span?.textContent).toMatch(/\d+\.\d{2}/);
  });

  it('animates to the target value over time', () => {
    let rAFCallback: FrameRequestCallback | null = null;
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      rAFCallback = cb;
      return 1;
    });
    vi.stubGlobal('cancelAnimationFrame', () => {});

    const { container } = render(<AnimatedCounter target={100} duration={1000} />);
    const span = container.querySelector('.count-in');

    expect(span?.textContent).toBe('0');

    act(() => {
      if (rAFCallback) (rAFCallback as FrameRequestCallback)(1);
    });

    act(() => {
      if (rAFCallback) (rAFCallback as FrameRequestCallback)(501);
    });

    expect(span?.textContent).toBe('87');

    act(() => {
      if (rAFCallback) (rAFCallback as FrameRequestCallback)(1001);
    });
    expect(span?.textContent).toBe('100');
  });
});
