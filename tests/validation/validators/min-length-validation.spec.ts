import { MinLengthError } from '@/validation/errors';
import { MinLengthValidation } from '@/validation/validators';
import faker from 'faker';

const minLength = faker.datatype.number();

const makeSut = (field: string): MinLengthValidation => {
  return new MinLengthValidation(field, minLength);
};
describe('MinLengthValidation', () => {
  test('Should return error if value  is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({
      [field]: faker.random.alphaNumeric(minLength - 1),
    });
    expect(error).toEqual(new MinLengthError());
  });

  test('Should return falsy if value is valid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({
      [field]: faker.random.alphaNumeric(minLength),
    });
    expect(error).toBeFalsy();
  });

  test('Should return falsy if value if field not exists in schema', () => {
    const sut = makeSut('any_field');
    const error = sut.validate({
      invalidField: faker.random.alphaNumeric(minLength),
    });
    expect(error).toBeFalsy();
  });
});
