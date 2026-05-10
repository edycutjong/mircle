import { describe, it, expect, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { ConfettiExplosion } from './ConfettiExplosion';

describe('ConfettiExplosion', () => {
  it('renders nothing when inactive', () => {
    const { container } = render(<ConfettiExplosion active={false} />);

    expect(container.firstChild).toBeNull();
  });

  it('renders 50 confetti pieces when active', () => {
    const { container } = render(<ConfettiExplosion active={true} />);

    const pieces = container.querySelectorAll('.confetti-piece');
    expect(pieces.length).toBe(50);
  });

  it('clears pieces after 4000ms', async () => {
    vi.useFakeTimers();
    const { container } = render(<ConfettiExplosion active={true} />);
    
    expect(container.querySelectorAll('.confetti-piece').length).toBe(50);
    
    await act(async () => {
      await vi.advanceTimersByTimeAsync(4000);
    });
    expect(container.querySelectorAll('.confetti-piece').length).toBe(0);

    // Also test cleanup
    const { container: container2, unmount: unmount2 } = render(<ConfettiExplosion active={true} />);
    expect(container2.querySelectorAll('.confetti-piece').length).toBe(50);
    unmount2(); // triggers clearTimeout

    vi.useRealTimers();
  });
});
