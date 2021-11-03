import { AccountModel } from '@/domain/models';
import { currentAccountState, Header } from '@/presentation/components';
import { fireEvent, render, screen } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { mockAccountModel } from '../domain/mocks';

type SutTypes = {
  history: MemoryHistory;

  setCurrentAccountMock: (account: AccountModel) => void;
};

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const setCurrentAccountMock = jest.fn();

  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account,
  };
  render(
    <RecoilRoot
      initializeState={({ set }) => set(currentAccountState, mockedState)}
    >
      <Router history={history}>
        <Header />
      </Router>
    </RecoilRoot>
  );

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
