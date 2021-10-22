import { MinLengthError } from '@/validation/errors';
import { MinLengthValidation } from '@/validation/validators';

describe('MinLengthValidation', () => {
  test('Should return error if value  is invalid', () => {
    const sut = new MinLengthValidation('field', 5);
    const error = sut.validate('123');
    expect(error).toEqual(new MinLengthError());
  });

  test('Should return falsy if value  is valid', () => {
    const sut = new MinLengthValidation('field', 5);
    const error = sut.validate('123555');
    expect(error).toBeFalsy();
  });
});
