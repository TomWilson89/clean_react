import { RequiredFieldError } from '../errors';
import { FieldValidation } from '../protocols';

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: Record<string, unknown>): Error {
    return input[this.field] ? null : new RequiredFieldError();
  }
}
