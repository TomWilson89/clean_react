import { LoadSurveyResult } from '@/domain/usecases';
import { mockSurveyResultModel } from '../../domain/mocks';

export class LoadSurveyResultSpy implements LoadSurveyResult {
  public callsCount = 0;

  surveyResult = mockSurveyResultModel();

  async load(): Promise<LoadSurveyResult.Model> {
    this.callsCount++;
    return this.surveyResult;
  }
}
