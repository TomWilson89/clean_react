import { FieldValidation } from '../protocols';
import { Validation } from '@/presentation/protocols/validations';

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  public static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  validate(fieldName: string, input: Record<string, unknown>): string {
    const validators = this.validators.filter((v) => v.field === fieldName);
    for (const validator of validators) {
      const error = validator.validate(input);
      if (error) {
        return error.message;
      }
    }

    return null;
  }
}
