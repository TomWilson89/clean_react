import { mockSurveyListModel } from '../../domain/mocks';
import { LoadSurveyList } from '@/domain/usecases';

export class LoadSurveyListSpy implements LoadSurveyList {
  public callsCount = 0;

  surveys = mockSurveyListModel();

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    this.callsCount++;
    return this.surveys;
  }
}
