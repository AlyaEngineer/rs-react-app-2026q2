import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '@/entities/book/ui/Checkbox';
import { describe, it, expect, vi } from 'vitest';

describe('Checkbox', () => {
  it('has aria-checked=false when not selected', () => {
    render(<Checkbox isSelected={false} onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-checked',
      'false'
    );
  });

  it('has aria-checked=true when selected', () => {
    render(<Checkbox isSelected onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-checked',
      'true'
    );
  });

  it('calls onChange when clicked', () => {
    const onChange = vi.fn();
    render(<Checkbox isSelected={false} onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledOnce();
  });
});
