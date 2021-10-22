import { InvalidFieldError } from '@/validation/errors';
import { EmailFieldValidation } from '@/validation/validators';
import faker from 'faker';

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailFieldValidation(faker.random.word());
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError());
  });

  test('Should return error if email is invalid', () => {
    const sut = new EmailFieldValidation(faker.random.word());
    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });
});
