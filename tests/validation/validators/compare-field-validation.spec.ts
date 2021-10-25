import { InvalidFieldError } from '@/validation/errors';
import { CompareFieldValidation } from '@/validation/validators';
import faker from 'faker';

const makeSut = (valutToCompare: string): CompareFieldValidation =>
  new CompareFieldValidation(faker.database.column(), valutToCompare);

describe('CompareFieldValidation', () => {
  test('should return Error if compare is invalid', () => {
    const sut = makeSut(faker.random.word());
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError());
  });
});
