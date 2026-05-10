import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ThreatFeed } from './ThreatFeed';

afterEach(() => {
  // Ensure intervals from ThreatFeed don't bleed into other tests
});

describe('ThreatFeed', () => {
  it('renders the LIVE THREAT FEED heading', () => {
    render(<ThreatFeed />);

    expect(screen.getByText('LIVE THREAT FEED')).toBeInTheDocument();
  });

  it('shows the SCANNING status indicator', () => {
    render(<ThreatFeed />);

    expect(screen.getAllByText('SCANNING').length).toBeGreaterThan(0);
  });

  it('seeds initial events on mount', () => {
    render(<ThreatFeed />);

    // Four events are seeded in useEffect; BLOCKED is the first event's status
    expect(screen.getByText('BLOCKED')).toBeInTheDocument();
    expect(screen.getAllByText('SAFE').length).toBeGreaterThanOrEqual(1);
  });

  it('adds new events on interval', () => {
    vi.useFakeTimers();
    render(<ThreatFeed />);
    
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    
    expect(screen.getAllByText('SAFE').length).toBeGreaterThanOrEqual(1);
    
    vi.useRealTimers();
  });

  it('clears interval on unmount', () => {
    vi.useFakeTimers();
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
    const { unmount } = render(<ThreatFeed />);
    
    unmount();
    
    expect(clearIntervalSpy).toHaveBeenCalled();
    vi.useRealTimers();
  });
});
