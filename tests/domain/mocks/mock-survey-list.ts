import faker from 'faker';
import { LoadSurveyList } from '@/domain/usecases';

export const mockSurveyModel = (): LoadSurveyList.Model => {
  return {
    id: faker.datatype.uuid(),
    question: faker.random.words(10),
    date: faker.date.recent(),
    didAnswer: faker.datatype.boolean(),
  };
};

export const mockSurveyListModel = (): LoadSurveyList.Model[] => {
  const list = [mockSurveyModel(), mockSurveyModel(), mockSurveyModel()];

  return list;
};
