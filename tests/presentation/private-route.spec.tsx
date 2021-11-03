import { currentAccountState, PrivateRoute } from '@/presentation/components';
import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { mockAccountModel } from '../domain/mocks';

type SutTypes = {
  history: ReturnType<typeof createMemoryHistory>;
};

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const mockedState = {
    setCurrentAccount: jest.fn(),
    getCurrentAccount: () => account,
  };
  render(
    <RecoilRoot
      initializeState={({ set }) => set(currentAccountState, mockedState)}
    >
      <Router history={history}>
        <PrivateRoute />
      </Router>
    </RecoilRoot>
  );

  return {
    history,
  };
};

describe('PrivateRoute', () => {
  test('should redirect to /login if token token is empty', () => {
    const { history } = makeSut(null);
    expect(history.location.pathname).toBe('/login');
  });

  test('should render current component if token is not empty', () => {
    const { history } = makeSut();
    expect(history.location.pathname).toBe('/');
  });
});
