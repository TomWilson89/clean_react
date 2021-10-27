import { PrivateRoute } from '@/presentation/components';
import { ApiContext } from '@/presentation/contexts';
import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { mockAccountModel } from '../domain/mocks';

type SutTypes = {
  history: ReturnType<typeof createMemoryHistory>;
};

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router history={history}>
        <PrivateRoute />
      </Router>
    </ApiContext.Provider>
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
