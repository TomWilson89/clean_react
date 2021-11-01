import { UnexpectedError } from '@/domain/errors';
import { ApiContext } from '@/presentation/contexts';
import { SurveyResult } from '@/presentation/pages';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { mockAccountModel, mockSurveyResultModel } from '../domain/mocks';
import { LoadSurveyResultSpy } from './mocks/mock-load-survey-result';

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy;
};

const makeSut = (loadSurveyResultSpy = new LoadSurveyResultSpy()): SutTypes => {
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
    </ApiContext.Provider>
  );

  return {
    loadSurveyResultSpy,
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
});
