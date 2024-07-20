import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome component', () => {
  render(<App />);
  const titleElement = screen.getByText("Welcome to Tenants app");
  expect(titleElement).toBeInTheDocument();
});
