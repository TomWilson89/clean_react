import { createMemoryHistory } from 'history';
import { PrivateRoute } from '@/presentation/components';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mockAccountModel } from '../domain/mocks';
import { renderWithHistory } from './mocks';

type SutTypes = {
  history: ReturnType<typeof createMemoryHistory>;
};

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });

  renderWithHistory({
    history,
    Page: PrivateRoute,
    account,
  });

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
