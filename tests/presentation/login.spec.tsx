import { Login } from '@/presentation/pages';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Login component', () => {
  test('Should with initial state', () => {
    render(<Login />);
    const errorWrap = screen.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
    const subtmiButton = screen.getByTestId('submit') as HTMLButtonElement;
    expect(subtmiButton).toBeDisabled();
    const emailStatus = screen.getByTestId('email-status');
    expect(emailStatus.title).toBe('Required');
    expect(emailStatus).toHaveTextContent('🔴');
    const passwordStatus = screen.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Required');
    expect(passwordStatus).toHaveTextContent('🔴');
  });
});
