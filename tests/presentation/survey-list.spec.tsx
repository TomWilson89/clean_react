import { UnexpectedError } from '@/domain/errors';
import { ApiContext } from '@/presentation/contexts';
import { SurveyList } from '@/presentation/pages';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { LoadSurveyListSpy } from './mocks/mock-load-survey-list';

type SutType = {
  loadSurveyListSpy: LoadSurveyListSpy;
};

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutType => {
  render(
    <ApiContext.Provider value={{ setCurrentAccount: jest.fn() }}>
      <Router history={createMemoryHistory()}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </ApiContext.Provider>
  );

  return {
    loadSurveyListSpy,
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

  test('should render error on failure', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();

    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error);

    makeSut(loadSurveyListSpy);
    await waitFor(() => screen.findByRole('heading'));

    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent(error.message);
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
