import { Validation } from '@/presentation/protocols/validations';
import { FieldValidation } from '../protocols';

export class ValidationComposite implements Validation {
  constructor(private readonly validators: FieldValidation[]) {}

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
