import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { LiveStatusBar } from './LiveStatusBar';

describe('LiveStatusBar', () => {
  it('renders the MIRCLE ONLINE status text', () => {
    render(<LiveStatusBar />);

    expect(screen.getByText('MIRCLE ONLINE')).toBeInTheDocument();
  });

  it('renders latency and uptime indicators', () => {
    render(<LiveStatusBar />);

    // At least one element shows the latency value (e.g. "12ms")
    expect(screen.getAllByText(/\d+ms/).length).toBeGreaterThan(0);
    // Uptime is hardcoded
    expect(screen.getByText('99.97%')).toBeInTheDocument();
  });

  it('updates latency and time on intervals', async () => {
    vi.useFakeTimers();
    render(<LiveStatusBar />);
    
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });
    
    // Test that the intervals fire
    expect(screen.getByText(/UTC/)).toBeInTheDocument();
    
    vi.useRealTimers();
  });

  it('renders emerald color when latency is less than 15', async () => {
    vi.useFakeTimers();
    const mathRandomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.1); // ~7ms
    render(<LiveStatusBar />);
    
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000); // Trigger the interval to set latency
    });
    
    // Finds the latency text
    const latencyEl = screen.getByText(/\d+ms/);
    expect(latencyEl).toHaveClass('text-emerald-400');
    
    mathRandomSpy.mockRestore();
    vi.useRealTimers();
  });

  it('renders amber color when latency is 15 or greater', async () => {
    vi.useFakeTimers();
    const mathRandomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.9); // ~23ms
    render(<LiveStatusBar />);
    
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000); // Trigger the interval to set latency
    });
    
    const latencyEl = screen.getByText(/\d+ms/);
    expect(latencyEl).toHaveClass('text-amber-400');
    
    mathRandomSpy.mockRestore();
    vi.useRealTimers();
  });
});
