import { Login } from '@/presentation/pages';
import { Validation } from '@/presentation/protocols/validations';
import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import React from 'react';

type SutTypes = {
  validationSpy: ValidationSpy;
  sut: RenderResult;
};

class ValidationSpy implements Validation {
  public errorMessage: string;

  public input: Record<string, unknown>;

  validate(input: Record<string, unknown>): string {
    this.input = input;
    return this.errorMessage;
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const utils = render(<Login validation={validationSpy} />);

  return {
    validationSpy,
    sut: utils,
  };
};

describe('Login component', () => {
  test('Should with initial state', () => {
    makeSut();
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

  test('Should call Validation with correct email', () => {
    const { validationSpy } = makeSut();
    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: 'any_email' } });
    expect(validationSpy.input).toEqual({
      email: 'any_email',
    });
  });
});
