import { render, screen } from '@testing-library/react';
import { SubjectList } from '@/entities/book/ui/SubjectList';
import { describe, it, expect } from 'vitest';

describe('SubjectList', () => {
  it('renders each subject as a list item', () => {
    render(<SubjectList subjects={['Science Fiction', 'Adventure']} />);
    expect(screen.getByText('Science Fiction')).toBeInTheDocument();
    expect(screen.getByText('Adventure')).toBeInTheDocument();
  });

  it('shows N/A when subjects is empty', () => {
    render(<SubjectList subjects={[]} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('shows N/A when subjects is undefined', () => {
    render(<SubjectList />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
});
