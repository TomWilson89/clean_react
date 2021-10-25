import { makeLoginValidation } from '@/main/factories/validation';
import { ValidationBuilder } from '@/validation/builder';
import { ValidationComposite } from '@/validation/composite';

describe('LoginValidationFactory', () => {
  test('should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation();

    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build(),
      ])
    );
  });
});
