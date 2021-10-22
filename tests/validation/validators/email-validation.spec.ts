import { InvalidFieldError } from '@/validation/errors';
import { EmailFieldValidation } from '@/validation/validators';

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailFieldValidation('email');
    const error = sut.validate('');
    expect(error).toEqual(new InvalidFieldError());
  });
});
