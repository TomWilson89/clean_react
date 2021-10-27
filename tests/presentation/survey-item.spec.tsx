import { IconName } from '@/presentation/components/icon/icon';
import { SurveyItem } from '@/presentation/pages/survey-list/components';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { mockSurveyModel } from '../domain/mocks';

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />);
};
describe('SurveyItem', () => {
  test('should render with correct values ', () => {
    const survey = mockSurveyModel();
    survey.didAnswer = true;
    survey.date = new Date('2020-01-10T00:00:00');
    makeSut(survey);

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);

    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('10');
    expect(screen.getByTestId('month')).toHaveTextContent('ene');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
  });
});
