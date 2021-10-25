import { makeSignupValidation } from '@/main/factories/validation';
import { ValidationBuilder } from '@/validation/builder';
import { ValidationComposite } from '@/validation/composite';

describe('SignupValidationFactory', () => {
  test('should make ValidationComposite with correct validations', () => {
    const composite = makeSignupValidation();

    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('name').required().min(3).build(),
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build(),
        ...ValidationBuilder.field('passwordConfirmation')
          .required()
          .sameAs('password')
          .build(),
      ])
    );
  });
});
