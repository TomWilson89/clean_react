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
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
    });
    makeSut(survey);

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
  });

  test('should render with correct values ', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
    });
    makeSut(survey);

    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      IconName.thumbDown
    );

    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
  });
});
