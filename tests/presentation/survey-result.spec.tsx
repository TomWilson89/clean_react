import { ApiContext } from '@/presentation/contexts';
import { SurveyResult } from '@/presentation/pages';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { mockAccountModel } from '../domain/mocks';

const makeSut = (): void => {
  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: () => mockAccountModel(),
      }}
    >
      <SurveyResult />
    </ApiContext.Provider>
  );
};
describe('SurveyList Component', () => {
  test('should present correct initial state', () => {
    makeSut();
    const surveyResult = screen.getByTestId('survey-result');
    expect(surveyResult.childElementCount).toBe(0);

    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });
});
