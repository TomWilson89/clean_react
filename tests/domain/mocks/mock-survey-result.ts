import faker from 'faker';
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases';

export const mockSurveyResultModel = (): LoadSurveyResult.Model => {
  return {
    question: faker.random.words(10),
    date: faker.date.recent(),
    answers: [
      {
        image: faker.image.imageUrl(),
        answer: faker.random.words(10),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100),
        isCurrentAccountAnswer: true,
      },
      {
        answer: faker.random.words(2),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100),
        isCurrentAccountAnswer: false,
      },
    ],
  };
};

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.random.words(10),
});
