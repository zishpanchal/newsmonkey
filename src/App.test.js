import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app navigation', () => {
  render(<App />);
  const businessLink = screen.getByText(/business/i);
  expect(businessLink).toBeInTheDocument();
});
