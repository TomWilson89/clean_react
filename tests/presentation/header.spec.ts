import { AccountModel } from '@/domain/models';
import { Header } from '@/presentation/components';
import { fireEvent, screen } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory, MemoryHistory } from 'history';
import { mockAccountModel } from '../domain/mocks';
import { renderWithHistory } from './mocks';

type SutTypes = {
  history: MemoryHistory;

  setCurrentAccountMock: (account: AccountModel) => void;
};

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });

  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: Header,
    account,
  });

  return {
    setCurrentAccountMock,
    history,
  };
};

describe('Header component', () => {
  test('should call setSurrentAccount to null', () => {
    const { history, setCurrentAccountMock } = makeSut();
    const logoutButton = screen.getByTestId('logout');

    fireEvent.click(logoutButton);

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });

  test('should render username correctly', () => {
    const account = mockAccountModel();
    makeSut(account);
    expect(screen.getByTestId('username')).toHaveTextContent(account.name);
  });
});
