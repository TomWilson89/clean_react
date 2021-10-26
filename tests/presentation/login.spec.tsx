import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { Login } from '@/presentation/pages';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import faker from 'faker';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { Helper } from './helper';
import {
  AuthenticationSpy,
  UpdateCurrentAccountMock,
  ValidationStub,
} from './mocks';

type SutTypes = {
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
  updateCurrentAccountMock: UpdateCurrentAccountMock;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });

const makeSut = (params?: SutParams): SutTypes => {
  const updateCurrentAccountMock = new UpdateCurrentAccountMock();
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;

  render(
    <Router history={history}>
      <Login
        validation={validationStub}
        authenticacion={authenticationSpy}
        updateCurrentAccount={updateCurrentAccountMock}
      />
    </Router>
  );

  return {
    validationStub,
    authenticationSpy,
    updateCurrentAccountMock,
  };
};

const simulateValidSubmit = async (
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('email', email);
  Helper.populateField('password', password);

  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe('Login component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.testChildCount('error-wrap', 0);
    Helper.testButtonIsDisable('submit', true);
    Helper.testFieldStatus('email', validationError);
    Helper.testFieldStatus('password', validationError);
  });

  test('Should show email error if validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('email');
    Helper.testFieldStatus('email', validationError);
  });

  test('Should show password error if validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    Helper.populateField('password');
    Helper.testFieldStatus('password', validationError);
  });

  test('Should valid state if email validation success', () => {
    makeSut();
    Helper.populateField('email');
    Helper.testFieldStatus('email');
  });

  test('Should valid state if password validation success', () => {
    makeSut();
    Helper.populateField('password');
    Helper.testFieldStatus('password');
  });

  test('Should enable submit button if form is valid', () => {
    makeSut();
    Helper.populateField('email');
    Helper.populateField('password');
    Helper.testButtonIsDisable('submit', false);
  });

  test('Should show spinner on submit', async () => {
    makeSut();
    await simulateValidSubmit();
    Helper.testElementExists('spinner');
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
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error);

    await simulateValidSubmit();

    Helper.testChildCount('error-wrap', 1);
    Helper.testElementContent('main-error', error.message);
  });

  test('Should call SaveAccessToken on success', async () => {
    const { authenticationSpy, updateCurrentAccountMock } = makeSut();

    await simulateValidSubmit();

    expect(updateCurrentAccountMock.account).toEqual(authenticationSpy.account);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  test('Should presnet error if SaveAccessToken fails', async () => {
    const { updateCurrentAccountMock } = makeSut();
    const error = new UnexpectedError();
    jest.spyOn(updateCurrentAccountMock, 'save').mockRejectedValueOnce(error);
    await simulateValidSubmit();

    Helper.testElementContent('main-error', error.message);

    Helper.testChildCount('error-wrap', 1);
  });

  test('Should go to sign up page', async () => {
    makeSut();

    await simulateValidSubmit();
    const signupLink = screen.getByTestId('signup-link');

    fireEvent.click(signupLink);

    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/signup');
  });
});
