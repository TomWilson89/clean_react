import { InvalidCredentialsError } from '@/domain/errors';
import { Login } from '@/presentation/pages';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import faker from 'faker';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { AuthenticationSpy, SaveAccessTokenMock, ValidationSpy } from './mocks';

type SutTypes = {
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });

const makeSut = (params?: SutParams): SutTypes => {
  const saveAccessTokenMock = new SaveAccessTokenMock();
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  validationSpy.errorMessage = params?.validationError;

  render(
    <Router history={history}>
      <Login
        validation={validationSpy}
        authenticacion={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  );

  return {
    validationSpy,
    authenticationSpy,
    saveAccessTokenMock,
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

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateEmailField(email);
  populatePasswordField(password);

  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

const testFieldStatus = (fieldName: string, validationError?: string): void => {
  const fieldStatus = screen.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || '');
  expect(fieldStatus).toHaveTextContent(validationError ? '🔴' : '🟢');
};

const testErrorWrapperChildCount = (count: number): void => {
  const errorWrap = screen.getByTestId('error-wrap');
  expect(errorWrap.childElementCount).toBe(count);
};

const testElementContent = (fieldName: string, content: string): void => {
  const element = screen.getByTestId(fieldName);

  expect(element).toHaveTextContent(content);
};

const testButtonIsDisable = (fieldName: string, isDisable: boolean): void => {
  const button = screen.getByTestId(fieldName) as HTMLButtonElement;
  if (isDisable) {
    expect(button).toBeDisabled();
    return;
  }
  expect(button).toBeEnabled();
};

describe('Login component', () => {
  test('Should with initial state', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    testErrorWrapperChildCount(0);
    testButtonIsDisable('submit', true);
    testFieldStatus('email', validationError);
    testFieldStatus('password', validationError);
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
    testFieldStatus('email', validationError);
  });

  test('Should show password error if validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    populatePasswordField();
    testFieldStatus('password', validationError);
  });

  test('Should valid state if email validation success', () => {
    makeSut();
    populateEmailField();
    testFieldStatus('email');
  });

  test('Should valid state if password validation success', () => {
    makeSut();
    populatePasswordField();
    testFieldStatus('password');
  });

  test('Should enable submit button if form is valid', () => {
    makeSut();
    populateEmailField();
    populatePasswordField();
    testButtonIsDisable('submit', false);
  });

  test('Should show spinner on submit', async () => {
    makeSut();
    await simulateValidSubmit();
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(email, password);

    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut();

    await simulateValidSubmit();
    await simulateValidSubmit();

    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { authenticationSpy } = makeSut({ validationError });
    await simulateValidSubmit();

    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present error if authentication fails', async () => {
    const { authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error));

    await simulateValidSubmit();

    testErrorWrapperChildCount(1);
    testElementContent('main-error', error.message);
  });

  test('Should call SaveAccessToken on success', async () => {
    const { authenticationSpy, saveAccessTokenMock } = makeSut();

    await simulateValidSubmit();

    expect(saveAccessTokenMock.value).toBe(
      authenticationSpy.account.accessToken
    );
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  test('Should go to sign up page', async () => {
    makeSut();

    await simulateValidSubmit();
    const signup = screen.getByTestId('signup');

    fireEvent.click(signup);

    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/signup');
  });
});
