import { Login } from '@/presentation/pages';
import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import faker from 'faker';
import React from 'react';
import { ValidationSpy } from './mocks';

type SutTypes = {
  validationSpy: ValidationSpy;
  sut: RenderResult;
};

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
});
