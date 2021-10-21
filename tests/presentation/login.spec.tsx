import { Login } from '@/presentation/pages';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from 'faker';
import React from 'react';
import { ValidationSpy } from './mocks';

type SutTypes = {
  validationSpy: ValidationSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = params?.validationError;
  render(<Login validation={validationSpy} />);

  return {
    validationSpy,
  };
};

describe('Login component', () => {
  test('Should with initial state', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    const errorWrap = screen.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
    const subtmiButton = screen.getByTestId('submit') as HTMLButtonElement;
    expect(subtmiButton).toBeDisabled();
    const emailStatus = screen.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus).toHaveTextContent('🔴');
    const passwordStatus = screen.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
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
    const validationError = faker.random.words();
    makeSut({ validationError });
    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = screen.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus).toHaveTextContent('🔴');
  });

  test('Should show password error if validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = screen.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus).toHaveTextContent('🔴');
  });

  test('Should valid state if email validation success', () => {
    makeSut();
    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    const emailStatus = screen.getByTestId('email-status');
    expect(emailStatus.title).toBeFalsy();
    expect(emailStatus).toHaveTextContent('🟢');
  });

  test('Should valid state if password validation success', () => {
    makeSut();
    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = screen.getByTestId('password-status');
    expect(passwordStatus.title).toBeFalsy();
    expect(passwordStatus).toHaveTextContent('🟢');
  });

  test('Should enable submit button if form is valid', () => {
    makeSut();
    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    const passwordInput = screen.getByTestId('password');
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const subtmiButton = screen.getByTestId('submit') as HTMLButtonElement;
    expect(subtmiButton).toBeEnabled();
  });
});
