import { LoadSurveyResult } from '@/domain/usecases';
import faker from 'faker';

export const mockSurveyResultModel = (): LoadSurveyResult.Model => {
  return {
    question: faker.random.words(10),
    date: faker.date.recent(),
    answers: [
      {
        image: faker.image.imageUrl(),
        answer: faker.random.word(),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100),
        isCurrentAccountAnswer: faker.datatype.boolean(),
      },
      {
        answer: faker.random.word(),
        count: faker.datatype.number(),
        percent: faker.datatype.number(100),
        isCurrentAccountAnswer: faker.datatype.boolean(),
      },
    ],
  };
};
