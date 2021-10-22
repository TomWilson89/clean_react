import { Validation } from '@/presentation/protocols/validations';
import { FieldValidation } from '../protocols';

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  public static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  validate(fieldName: string, value: string): string {
    const validators = this.validators.filter((v) => v.field === fieldName);
    for (const validator of validators) {
      const error = validator.validate(value);
      if (error) {
        return error.message;
      }
    }

    return null;
  }
}
