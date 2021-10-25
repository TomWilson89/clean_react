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

  test('should return falsy if compare is valid', () => {
    const valueToCompare = faker.random.word();
    const sut = makeSut(valueToCompare);
    const error = sut.validate(valueToCompare);
    expect(error).toBeFalsy();
  });
});
