import { Authentication } from '@/domain/usecases';
import { Header } from '@/presentation/components';
import { ApiContext } from '@/presentation/contexts';
import { fireEvent, render, screen } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

type SutTypes = {
  history: MemoryHistory;

  setCurrentAccountMock: (account: Authentication.Model) => void;
};

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Header />
      </Router>
    </ApiContext.Provider>
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
});
