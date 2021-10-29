import { makeLoginValidation } from '@/main/factories/validation';
import { ValidationComposite } from '@/validation/composite';
import {
  EmailFieldValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '@/validation/validators';

describe('LoginValidationFactory', () => {
  test('should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation();

    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('email'),
        new EmailFieldValidation('email'),
        new RequiredFieldValidation('password'),
        new MinLengthValidation('password', 5),
      ])
    );
  });
});
