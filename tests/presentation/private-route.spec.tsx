import { PrivateRoute } from '@/presentation/components';
import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

type SutTypes = {
  history: ReturnType<typeof createMemoryHistory>;
};

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <Router history={history}>
      <PrivateRoute />
    </Router>
  );

  return {
    history,
  };
};

describe('PrivateRoute', () => {
  test('should redirect to /login if token token is empty', () => {
    const { history } = makeSut();
    expect(history.location.pathname).toBe('/login');
  });
});
