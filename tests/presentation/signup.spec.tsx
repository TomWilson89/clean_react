import { Signup } from '@/presentation/pages';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { Helper } from './helper';

const makeSut = (): void => {
  render(<Signup />);
};

describe('Signup component', () => {
  makeSut();
  const validationError = 'Required';
  test('should start with initial state', () => {
    Helper.testChildCount('error-wrap', 0);
    Helper.testButtonIsDisable('submit', true);
    Helper.testFieldStatus('name', validationError);
    Helper.testFieldStatus('email', validationError);
    Helper.testFieldStatus('password', validationError);
    Helper.testFieldStatus('passwordConfirmation', validationError);
  });
});
