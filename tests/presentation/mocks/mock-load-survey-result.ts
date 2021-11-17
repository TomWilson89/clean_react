/* eslint-disable max-classes-per-file */
import { mockSurveyResultModel } from '../../domain/mocks';
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases';

export class LoadSurveyResultSpy implements LoadSurveyResult {
  public callsCount = 0;

  surveyResult = mockSurveyResultModel();

  async load(): Promise<LoadSurveyResult.Model> {
    this.callsCount++;
    return this.surveyResult;
  }
}

export class SaveSurveyResultSpy implements SaveSurveyResult {
  public callsCount = 0;

  params: SaveSurveyResult.Params;

  surveyResult = mockSurveyResultModel();

  async save(params: SaveSurveyResult.Params): Promise<LoadSurveyResult.Model> {
    this.callsCount++;
    this.params = params;
    return this.surveyResult;
  }
}
