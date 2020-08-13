import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders h1 element', () => {
  const { getByText } = render(<App />);
  const h1Element = getByText(/Giphy Client/i);
  expect(h1Element).toBeInTheDocument();
});
