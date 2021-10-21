import { Login } from '@/presentation/pages';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from 'faker';
import React from 'react';
import { ValidationSpy } from './mocks';

type SutTypes = {
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = faker.random.words();
  render(<Login validation={validationSpy} />);

  return {
    validationSpy,
  };
};

describe('Login component', () => {
  test('Should with initial state', () => {
    const { validationSpy } = makeSut();

    const errorWrap = screen.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
    const subtmiButton = screen.getByTestId('submit') as HTMLButtonElement;
    expect(subtmiButton).toBeDisabled();
    const emailStatus = screen.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus).toHaveTextContent('🔴');
    const passwordStatus = screen.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationSpy.errorMessage);
    expect(passwordStatus).toHaveTextContent('🔴');
  });

  test('Should call Validation with correct email', () => {
    const { validationSpy } = makeSut();
    const emailInput = screen.getByTestId('email');
    const email = faker.internet.email();
    fireEvent.input(emailInput, { target: { value: email } });
    expect(validationSpy.fileName).toBe('email');
    expect(validationSpy.value).toBe(email);
  });

  test('Should call Validation with correct password', () => {
    const { validationSpy } = makeSut();
    const passwordInput = screen.getByTestId('password');
    const password = faker.internet.password();
    fireEvent.input(passwordInput, { target: { value: password } });
    expect(validationSpy.fileName).toBe('password');
    expect(validationSpy.value).toEqual(password);
  });

  test('Should show email error if validation fails', () => {
    const { validationSpy } = makeSut();
    const errorMessage = faker.random.words();
    validationSpy.errorMessage = errorMessage;
    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = screen.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationSpy.errorMessage);
    expect(emailStatus).toHaveTextContent('🔴');
  });

  test('Should show password error if validation fails', () => {
    const { validationSpy } = makeSut();
    const errorMessage = faker.random.words();
    validationSpy.errorMessage = errorMessage;
    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = screen.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationSpy.errorMessage);
    expect(passwordStatus).toHaveTextContent('🔴');
  });
});
