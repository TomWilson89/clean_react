import { IconName } from '@/presentation/components/icon/icon';
import { SurveyItem } from '@/presentation/pages/survey-list/components';
import { fireEvent, render, screen } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory, MemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { mockSurveyModel } from '../domain/mocks';

type SutType = {
  history: MemoryHistory;
};

const makeSut = (survey = mockSurveyModel()): SutType => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <Router history={history}>
      <SurveyItem survey={survey} />
    </Router>
  );

  return {
    history,
  };
};

describe('SurveyItem', () => {
  test('should render with correct values ', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2020-01-10T00:00:00'),
    });
    makeSut(survey);

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('10');
    expect(screen.getByTestId('month')).toHaveTextContent('ene');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
  });

  test('should render with correct values ', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2019-02-03T00:00:00'),
    });
    makeSut(survey);

    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      IconName.thumbDown
    );

    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('03');
    expect(screen.getByTestId('month')).toHaveTextContent('feb');
    expect(screen.getByTestId('year')).toHaveTextContent('2019');
  });

  test('should go to survey result ', () => {
    const survey = mockSurveyModel();
    const { history } = makeSut(survey);

    fireEvent.click(screen.getByTestId('link'));

    expect(history.location.pathname).toBe(`/surveys/${survey.id}`);
  });
});
