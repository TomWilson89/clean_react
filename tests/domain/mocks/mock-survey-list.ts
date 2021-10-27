import { SurveyModel } from '@/domain/models';
import faker from 'faker';

export const mockSurveyModel = (): SurveyModel => {
  return {
    id: faker.datatype.uuid(),
    question: faker.random.words(10),
    date: faker.date.recent(),
    didAnswer: faker.datatype.boolean(),
    answers: [
      {
        image: faker.image.avatar(),
        answer: faker.random.words(4),
      },
      {
        image: faker.image.avatar(),
        answer: faker.random.words(5),
      },
      {
        image: faker.image.avatar(),
        answer: faker.random.words(10),
      },
    ],
  };
};

export const mockSurveyListModel = (): SurveyModel[] => {
  const list = [mockSurveyModel(), mockSurveyModel(), mockSurveyModel()];

  return list;
};
