import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './state/store';

test('React Bookstore', () => {
  render(<Provider store={store}>
    <App />
  </Provider>);
  const linkElement = screen.getByText(/React Bookstore/i);
  expect(linkElement).toBeInTheDocument();
});
