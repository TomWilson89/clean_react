import { RequiredFieldError } from '@/validation/errors';
import { RequiredFieldValidation } from '@/validation/validators';
import faker from 'faker';

const makeSut = (field: string): RequiredFieldValidation => {
  return new RequiredFieldValidation(field);
};

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: '' });
    expect(error).toEqual(new RequiredFieldError());
  });

  test('Should return null if field is not empty', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.word() });
    expect(error).toBeFalsy();
  });
});
