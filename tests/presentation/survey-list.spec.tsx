import { SurveyList } from '@/presentation/pages';
import { render, screen } from '@testing-library/react';
import React from 'react';

const makeSut = (): void => {
  render(<SurveyList />);
};

describe('SurveyList Component', () => {
  test('should present 4 empty list items on start', () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    // eslint-disable-next-line testing-library/no-node-access
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
  });
});
