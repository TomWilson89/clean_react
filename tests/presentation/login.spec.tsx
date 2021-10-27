import { InvalidCredentialsError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { ApiContext } from '@/presentation/contexts';
import { Login } from '@/presentation/pages';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import faker from 'faker';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { Helper } from './helper';
import { AuthenticationSpy, ValidationStub } from './mocks';

type SutTypes = {
  validationStub: ValidationStub;
  authenticationSpy: AuthenticationSpy;
  setCurrentAccountMock: (account: AccountModel) => void;
};

type SutParams = {
  validationError: string;
};

const history = createMemoryHistory({ initialEntries: ['/login'] });

const makeSut = (params?: SutParams): SutTypes => {
  const setCurrentAccountMock = jest.fn();
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Login validation={validationStub} authenticacion={authenticationSpy} />
      </Router>
    </ApiContext.Provider>
  );

  return {
    validationStub,
    authenticationSpy,
    setCurrentAccountMock,
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
    expect(screen.getByTestId('error-wrap').childElementCount).toBe(0);

    expect(screen.getByTestId('submit')).toBeDisabled();
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
    expect(screen.getByTestId('submit')).toBeEnabled();
  });

  test('Should show spinner on submit', async () => {
    makeSut();
    await simulateValidSubmit();
    expect(screen.queryByTestId('spinner')).toBeInTheDocument();
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

    expect(screen.getByTestId('error-wrap').childElementCount).toBe(1);
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message);
  });

  test('Should call SaveAccessToken on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut();

    await simulateValidSubmit();

    expect(setCurrentAccountMock).toHaveBeenCalledWith(
      authenticationSpy.account
    );
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
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
