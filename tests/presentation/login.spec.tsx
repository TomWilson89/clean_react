import { Login } from '@/presentation/pages';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from 'faker';
import React from 'react';
import { AuthenticationSpy, ValidationSpy } from './mocks';

type SutTypes = {
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  validationSpy.errorMessage = params?.validationError;

  render(
    <Login validation={validationSpy} authenticacion={authenticationSpy} />
  );

  return {
    validationSpy,
    authenticationSpy,
  };
};

const populateEmailField = (email = faker.internet.email()): void => {
  const emailInput = screen.getByTestId('email');
  fireEvent.input(emailInput, {
    target: { value: email },
  });
};

const populatePasswordField = (password = faker.internet.password()): void => {
  const passwordInput = screen.getByTestId('password');
  fireEvent.input(passwordInput, {
    target: { value: password },
  });
};

const simulateValidSubmit = (
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(email);
  populatePasswordField(password);
  const subtmiButton = screen.getByTestId('submit') as HTMLButtonElement;
  fireEvent.click(subtmiButton);
};

const simulateFieldStatus = (
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || '');
  expect(fieldStatus).toHaveTextContent(validationError ? '🔴' : '🟢');
};

describe('Login component', () => {
  test('Should with initial state', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    const errorWrap = screen.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
    const subtmiButton = screen.getByTestId('submit') as HTMLButtonElement;
    expect(subtmiButton).toBeDisabled();
    simulateFieldStatus('email', validationError);
    simulateFieldStatus('password', validationError);
  });

  test('Should call Validation with correct email', () => {
    const { validationSpy } = makeSut();
    const email = faker.internet.email();
    const emailInput = screen.getByTestId('email');
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
    populateEmailField();
    simulateFieldStatus('email', validationError);
  });

  test('Should show password error if validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    populatePasswordField();
    simulateFieldStatus('password', validationError);
  });

  test('Should valid state if email validation success', () => {
    makeSut();
    populateEmailField();
    simulateFieldStatus('email');
  });

  test('Should valid state if password validation success', () => {
    makeSut();
    populatePasswordField();
    simulateFieldStatus('password');
  });

  test('Should enable submit button if form is valid', () => {
    makeSut();
    populateEmailField();
    populatePasswordField();
    const subtmiButton = screen.getByTestId('submit') as HTMLButtonElement;
    expect(subtmiButton).toBeEnabled();
  });

  test('Should show spinner on submit', () => {
    makeSut();
    simulateValidSubmit();
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('Should call Authentication with correct values', () => {
    const { authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();

    simulateValidSubmit(email, password);

    expect(authenticationSpy.params).toEqual({ email, password });
  });
});
