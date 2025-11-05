import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main heading with name', () => {
  render(<App />);
  const nameElement = screen.getByText(/Filmon Mehari/i);
  expect(nameElement).toBeInTheDocument();
});
