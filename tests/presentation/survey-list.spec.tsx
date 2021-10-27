import { SurveyModel } from '@/domain/models';
import { LoadSurveyList } from '@/domain/usecases';
import { SurveyList } from '@/presentation/pages';
import { render, screen } from '@testing-library/react';
import React from 'react';

class LoadSurveyListSpy implements LoadSurveyList {
  public callsCount = 0;

  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++;
    return [];
  }
}

type SutType = {
  loadSurveyListSpy: LoadSurveyListSpy;
};

const makeSut = (): SutType => {
  const loadSurveyListSpy = new LoadSurveyListSpy();

  render(<SurveyList loadSurveyList={loadSurveyListSpy} />);

  return {
    loadSurveyListSpy,
  };
};

describe('SurveyList Component', () => {
  test('should present 4 empty list items on start', () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    // eslint-disable-next-line testing-library/no-node-access
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
  });

  test('should call LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });
});
