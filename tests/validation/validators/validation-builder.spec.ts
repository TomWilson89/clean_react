import { ValidationBuilder } from '@/validation/builder';
import {
  EmailFieldValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '@/validation/validators';

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').required().build();
    expect(validations).toStrictEqual([
      new RequiredFieldValidation('any_field'),
    ]);
  });

  test('should return EmailFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').email().build();
    expect(validations).toStrictEqual([new EmailFieldValidation('any_field')]);
  });

  test('should return MinLengthFieldValidation', () => {
    const validations = ValidationBuilder.field('any_field').min(5).build();
    expect(validations).toStrictEqual([
      new MinLengthValidation('any_field', 5),
    ]);
  });
});
