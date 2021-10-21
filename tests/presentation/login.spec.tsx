import { Login } from '@/presentation/pages';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Login component', () => {
  test('Should not render spinner and error on start', () => {
    render(<Login />);
    const errorWrap = screen.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
  });
});
