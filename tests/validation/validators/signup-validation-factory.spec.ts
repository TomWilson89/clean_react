import { makeSignupValidation } from '@/main/factories/validation';
import { ValidationComposite } from '@/validation/composite';
import {
  CompareFieldValidation,
  EmailFieldValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '@/validation/validators';

describe('SignupValidationFactory', () => {
  test('should make ValidationComposite with correct validations', () => {
    const composite = makeSignupValidation();

    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('name'),
        new MinLengthValidation('name', 3),
        new RequiredFieldValidation('email'),
        new EmailFieldValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),
        new RequiredFieldValidation('passwordConfirmation'),
        new CompareFieldValidation('passwordConfirmation', 'password'),
      ])
    );
  });
});
