import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { ApiContext } from '@/presentation/contexts';
import { SurveyResult } from '@/presentation/pages';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { mockAccountModel, mockSurveyResultModel } from '../domain/mocks';
import { LoadSurveyResultSpy } from './mocks/mock-load-survey-result';

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy;
  setCurrentAccountMock: (account: AccountModel) => void;
  history: MemoryHistory;
};

const makeSut = (loadSurveyResultSpy = new LoadSurveyResultSpy()): SutTypes => {
  const setCurrentAccountMock = jest.fn();
  const history = createMemoryHistory({
    initialEntries: ['/', '/surveys/any_id'],
    initialIndex: 1,
  });
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <Router history={history}>
        <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
      </Router>
    </ApiContext.Provider>
  );

  return {
    loadSurveyResultSpy,
    setCurrentAccountMock,
    history,
  };
};
describe('SurveyList Component', () => {
  test('should present correct initial state', async () => {
    makeSut();
    const surveyResult = screen.getByTestId('survey-result');
    expect(surveyResult.childElementCount).toBe(0);

    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    await screen.findByTestId('survey-result');
  });

  test('should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut();
    await screen.findByTestId('survey-result');
    expect(loadSurveyResultSpy.callsCount).toBe(1);
  });

  test('should presnet SurveyResult data on success', async () => {
    const loadServeyResultSpy = new LoadSurveyResultSpy();
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2019-02-03T00:00:00'),
    });

    loadServeyResultSpy.surveyResult = surveyResult;

    makeSut(loadServeyResultSpy);
    await screen.findByTestId('survey-result');

    expect(screen.getByTestId('day')).toHaveTextContent('03');
    expect(screen.getByTestId('month')).toHaveTextContent('feb');
    expect(screen.getByTestId('year')).toHaveTextContent('2019');
    expect(screen.getByTestId('question')).toHaveTextContent(
      surveyResult.question
    );

    expect(screen.getByTestId('answers').childElementCount).toBe(2);
    const answerWrap = screen.queryAllByTestId('answer-wrap');

    expect(answerWrap[0]).toHaveClass('active');
    expect(answerWrap[1]).not.toHaveClass('active');

    const images = screen.queryAllByTestId('image');
    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image);
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer);
    expect(images[1]).toBeFalsy();
    const answers = screen.queryAllByTestId('answer');
    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer);
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer);
    const percents = screen.queryAllByTestId('percent');
    expect(percents[0]).toHaveTextContent(
      `${surveyResult.answers[0].percent}%`
    );
    expect(percents[1]).toHaveTextContent(
      `${surveyResult.answers[1].percent}%`
    );
  });

  test('should render error on UnexpectedError', async () => {
    const loadServeyResultSpy = new LoadSurveyResultSpy();

    const error = new UnexpectedError();

    jest.spyOn(loadServeyResultSpy, 'load').mockRejectedValueOnce(error);

    makeSut(loadServeyResultSpy);
    await waitFor(() => screen.findByRole('main'));

    expect(screen.queryByTestId('question')).not.toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent(error.message);
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  test('should logout on AccessDenied', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();

    jest
      .spyOn(loadSurveyResultSpy, 'load')
      .mockRejectedValueOnce(new AccessDeniedError());

    const { setCurrentAccountMock, history } = makeSut(loadSurveyResultSpy);

    await waitFor(() => screen.findByRole('main'));

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });

  test('should call LoadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    const error = new UnexpectedError();

    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error);

    makeSut(loadSurveyResultSpy);
    await waitFor(() => screen.findByRole('main'));
    fireEvent.click(screen.getByTestId('reload-button'));
    expect(loadSurveyResultSpy.callsCount).toBe(1);
    await waitFor(() => screen.findByRole('main'));
  });

  test('should go to SurveyList on back button click', async () => {
    const { history } = makeSut();
    await waitFor(() => screen.findByRole('main'));
    fireEvent.click(screen.getByTestId('back-button'));
    expect(history.location.pathname).toBe('/');
  });

  test('should not present loading on active answer click', async () => {
    makeSut();
    await waitFor(() => screen.findByRole('main'));

    const answerWrap = screen.queryAllByTestId('answer-wrap');
    fireEvent.click(answerWrap[0]);
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });
});
