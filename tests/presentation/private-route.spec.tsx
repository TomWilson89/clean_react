import { PrivateRoute } from '@/presentation/components';
import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';

describe('PrivateRoute', () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });

  beforeEach(() => {
    render(
      <Router history={history}>
        <PrivateRoute />
      </Router>
    );
  });

  test('should redirect to /login if token token is empty', () => {
    expect(history.location.pathname).toBe('/login');
  });
});
