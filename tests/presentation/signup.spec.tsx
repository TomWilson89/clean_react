import { Signup } from '@/presentation/pages';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

const makeSut = (): void => {
  render(<Signup />);
};

const testChildCount = (fieldName: string, count: number): void => {
  const el = screen.getByTestId(fieldName);
  expect(el.childElementCount).toBe(count);
};

const testButtonIsDisable = (fieldName: string, isDisable: boolean): void => {
  const button = screen.getByTestId(fieldName) as HTMLButtonElement;
  if (isDisable) {
    expect(button).toBeDisabled();
    return;
  }
  expect(button).toBeEnabled();
};

const testFieldStatus = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || '');
  expect(fieldStatus).toHaveTextContent(validationError ? '🔴' : '🟢');
};

describe('Signup component', () => {
  makeSut();
  const validationError = 'Required';
  test('should start with initial state', () => {
    testChildCount('error-wrap', 0);
    testButtonIsDisable('submit', true);
    testFieldStatus('name', validationError);
    testFieldStatus('email', validationError);
    testFieldStatus('password', validationError);
    testFieldStatus('passwordConfirmation', validationError);
  });
});
