import { MinLengthError } from '@/validation/errors';
import { MinLengthValidation } from '@/validation/validators';
import faker from 'faker';

const minLength = faker.datatype.number();

const makeSut = (): MinLengthValidation => {
  return new MinLengthValidation(faker.database.column(), minLength);
};
describe('MinLengthValidation', () => {
  test('Should return error if value  is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(minLength - 1));
    expect(error).toEqual(new MinLengthError());
  });

  test('Should return falsy if value  is valid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.alphaNumeric(minLength));
    expect(error).toBeFalsy();
  });
});
