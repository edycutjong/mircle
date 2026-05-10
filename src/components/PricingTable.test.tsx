import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PricingTable } from './PricingTable';

describe('PricingTable', () => {
  it('renders both FREE and PRO tier names', () => {
    render(<PricingTable />);

    expect(screen.getByText('FREE')).toBeInTheDocument();
    expect(screen.getByText('PRO')).toBeInTheDocument();
  });

  it('shows LIFETIME FREE badge on the PRO tier', () => {
    render(<PricingTable />);

    expect(screen.getByText('LIFETIME FREE')).toBeInTheDocument();
  });

  it('displays correct prices for each tier', () => {
    render(<PricingTable />);

    expect(screen.getByText('$0')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();
  });

  it('lists features once per tier (two rows for shared features)', () => {
    render(<PricingTable />);

    // Each tier renders the feature in its own <span>
    const basicScans = screen.getAllByText('Basic transaction scan', { selector: 'span' });
    expect(basicScans.length).toBe(2);
  });

  it('handles mouse hover to highlight tier', () => {
    const { container } = render(<PricingTable />);
    const cards = container.querySelectorAll('.glass-card');
    
    fireEvent.mouseEnter(cards[0]);
    expect(cards[0].className).toContain('scale-[1.02]');
    
    fireEvent.mouseLeave(cards[0]);
    expect(cards[0].className).not.toContain('scale-[1.02]');
  });
});
