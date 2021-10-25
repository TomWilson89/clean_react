import { InvalidFieldError } from '@/validation/errors';
import { CompareFieldValidation } from '@/validation/validators';
import faker from 'faker';

const makeSut = (
  field: string,
  valutToCompare: string
): CompareFieldValidation => new CompareFieldValidation(field, valutToCompare);

describe('CompareFieldValidation', () => {
  test('should return Error if compare is invalid', () => {
    const field = faker.random.word();
    const fieldToCompare = faker.random.word();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word(),
    });
    expect(error).toEqual(new InvalidFieldError());
  });

  test('should return falsy if compare is valid', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const value = faker.random.word();
    const sut = makeSut(field, fieldToCompare);
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value,
    });
    expect(error).toBeFalsy();
  });
});
