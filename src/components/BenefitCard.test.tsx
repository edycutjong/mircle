import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BenefitCard } from './BenefitCard';

const mockIcon = <span data-testid="icon">★</span>;

describe('BenefitCard', () => {
  it('renders title and description', () => {
    render(<BenefitCard icon={mockIcon} title="Security" description="Protect your wallet" />);

    expect(screen.getByText('Security')).toBeInTheDocument();
    expect(screen.getByText('Protect your wallet')).toBeInTheDocument();
  });

  it('renders metric badge when provided', () => {
    render(<BenefitCard icon={mockIcon} title="Security" description="Desc" metric="35M WALLETS" />);

    expect(screen.getByText('35M WALLETS')).toBeInTheDocument();
  });

  it('does not render metric badge when omitted', () => {
    render(<BenefitCard icon={mockIcon} title="Security" description="Desc" />);

    expect(screen.queryByText('35M WALLETS')).not.toBeInTheDocument();
  });
});
