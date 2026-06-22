import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AboutPage } from '@/views/about/ui/AboutPage';

describe('AboutPage', () => {
  it('should render about page', () => {
    render(<AboutPage />);
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });

  it('should render About the App section', () => {
    render(<AboutPage />);
    expect(screen.getByText('About the App')).toBeInTheDocument();
  });

  it('should render About the Author section', () => {
    render(<AboutPage />);
    expect(screen.getByText('About the Author')).toBeInTheDocument();
  });
});
