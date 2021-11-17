import { fireEvent, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { SurveyList } from '@/presentation/pages';
// eslint-disable-next-line import/no-extraneous-dependencies
import { renderWithHistory } from './mocks';
import { LoadSurveyListSpy } from './mocks/mock-load-survey-list';

type SutType = {
  loadSurveyListSpy: LoadSurveyListSpy;
  setCurrentAccountMock: (account: AccountModel) => void;
  history: MemoryHistory;
};

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutType => {
  const history = createMemoryHistory({ initialEntries: ['/'] });

  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () => SurveyList({ loadSurveyList: loadSurveyListSpy }),
  });

  return {
    loadSurveyListSpy,
    setCurrentAccountMock,
    history,
  };
};

describe('SurveyList Component', () => {
  test('should present 4 empty list items on start', async () => {
    makeSut();
    const surveyList = await screen.findAllByTestId('empty-list-item');
    expect(surveyList.length).toBe(4);

    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    await waitFor(() => surveyList);
  });

  test('should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await screen.findByRole('heading');
  });

  test('should render SurveyItems on success', async () => {
    makeSut();

    const surveyItems = await screen.findAllByTestId('list-item');
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(surveyItems).toHaveLength(3);
  });

  test('should render error on UnexpectedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();

    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error);

    makeSut(loadSurveyListSpy);
    await waitFor(() => screen.findByRole('heading'));

    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent(error.message);
  });

  test('should logout on AccessDenied', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();

    jest
      .spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(new AccessDeniedError());

    const { setCurrentAccountMock, history } = makeSut(loadSurveyListSpy);
    await waitFor(() => screen.findByRole('heading'));

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });

  test('should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();

    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error);

    makeSut(loadSurveyListSpy);
    await waitFor(() => screen.findByRole('heading'));
    fireEvent.click(screen.getByTestId('reload-button'));
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.findByRole('heading'));
  });
});
