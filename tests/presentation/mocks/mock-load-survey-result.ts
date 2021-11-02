/* eslint-disable max-classes-per-file */
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases';
import { mockSurveyResultModel } from '../../domain/mocks';

export class LoadSurveyResultSpy implements LoadSurveyResult {
  public callsCount = 0;

  surveyResult = mockSurveyResultModel();

  async load(): Promise<LoadSurveyResult.Model> {
    this.callsCount++;
    return this.surveyResult;
  }
}

export class SaveSurveyResultSpy implements SaveSurveyResult {
  params: SaveSurveyResult.Params;

  surveyResult = mockSurveyResultModel();

  async save(params: SaveSurveyResult.Params): Promise<LoadSurveyResult.Model> {
    this.params = params;
    return this.surveyResult;
  }
}
