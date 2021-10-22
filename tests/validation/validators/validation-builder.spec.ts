import { ValidationBuilder } from '@/validation/builder';
import { RequiredFieldValidation } from '@/validation/validators';

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build();
    expect(validations).toEqual([new RequiredFieldValidation('any_field')]);
  });
});
