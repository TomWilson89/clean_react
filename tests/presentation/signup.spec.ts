import { fireEvent, screen, waitFor } from '@testing-library/react';
import faker from 'faker';
import { createMemoryHistory } from 'history';
import { EmailInUserError } from '@/domain/errors';
import { AddAccount } from '@/domain/usecases';
import { Signup } from '@/presentation/pages';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Helper } from './helper';
import { AddAccountSpy, renderWithHistory, ValidationStub } from './mocks';

type SutParams = {
  validationError: string;
};

type SutTypes = {
  validationStub: ValidationStub;
  addAccountSpy: AddAccountSpy;
  setCurrentAccountMock: (account: AddAccount.Model) => void;
};

const history = createMemoryHistory({ initialEntries: ['/signup'] });

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const addAccountSpy = new AddAccountSpy();
  validationStub.errorMessage = params?.validationError;

  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () =>
      Signup({ validation: validationStub, addAccount: addAccountSpy }),
  });

  return {
    validationStub,
    addAccountSpy,
    setCurrentAccountMock,
  };
};

const simulateValidSubmit = async (
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('name', name);
  Helper.populateField('email', email);
  Helper.populateField('password', password);
  Helper.populateField('passwordConfirmation', password);

  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe('Signup component', () => {
  test('should start with initial state', () => {
    const validationError = faker.random.word();
    makeSut({ validationError });
    expect(screen.getByTestId('error-wrap').childElementCount).toBe(0);
    expect(screen.getByTestId('submit')).toBeDisabled();
    Helper.testFieldStatus('name', validationError);
    Helper.testFieldStatus('email', validationError);
    Helper.testFieldStatus('password', validationError);
    Helper.testFieldStatus('passwordConfirmation', validationError);
  });

  test('Should show name error if validation fails', () => {
    const validationError = faker.random.word();
    makeSut({ validationError });
    Helper.populateField('name');
    Helper.testFieldStatus('name', validationError);
  });

  test('Should show email error if validation fails', () => {
    const validationError = faker.random.word();
    makeSut({ validationError });
    Helper.populateField('email');
    Helper.testFieldStatus('email', validationError);
  });

  test('Should show email error if validation fails', () => {
    const validationError = faker.random.word();
    makeSut({ validationError });
    Helper.populateField('password');
    Helper.testFieldStatus('password', validationError);
  });

  test('Should show passwordConfirmation error if validation fails', () => {
    const validationError = faker.random.word();
    makeSut({ validationError });
    Helper.populateField('passwordConfirmation');
    Helper.testFieldStatus('passwordConfirmation', validationError);
  });

  test('Should valid state if name validation success', () => {
    makeSut();
    Helper.populateField('name');
    Helper.testFieldStatus('name');
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

  test('Should valid state if passwordConfirmation validation success', () => {
    makeSut();
    Helper.populateField('passwordConfirmation');
    Helper.testFieldStatus('passwordConfirmation');
  });

  test('Should enable submit button if form is valid', () => {
    makeSut();
    Helper.populateField('name');
    Helper.populateField('email');
    Helper.populateField('password');
    Helper.populateField('passwordConfirmation');
    expect(screen.getByTestId('submit')).toBeEnabled();
  });

  test('Should show spinner on submit', async () => {
    makeSut();
    await simulateValidSubmit();
    expect(screen.queryByTestId('spinner')).toBeInTheDocument();
  });

  test('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut();
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await simulateValidSubmit(name, email, password);

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    });
  });

  test('Should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut();

    await simulateValidSubmit();
    await simulateValidSubmit();

    expect(addAccountSpy.callsCount).toBe(1);
  });

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { addAccountSpy } = makeSut({ validationError });
    await simulateValidSubmit();

    expect(addAccountSpy.callsCount).toBe(0);
  });

  test('Should present error if add account fails', async () => {
    const { addAccountSpy } = makeSut();
    const error = new EmailInUserError();
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error);

    await simulateValidSubmit();

    expect(screen.getByTestId('error-wrap').childElementCount).toBe(1);
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message);
  });

  test('Should call SaveAccessToken on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut();

    await simulateValidSubmit();

    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  test('Should go to login page', async () => {
    makeSut();

    await simulateValidSubmit();
    const loginLink = screen.getByTestId('login-link');

    fireEvent.click(loginLink);

    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/login');
  });
});
