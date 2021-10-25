import { InvalidFieldError } from '../errors';
import { FieldValidation } from '../protocols';

export class CompareFieldValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate(input: Record<string, unknown>): Error {
    return input[this.field] !== input[this.fieldToCompare]
      ? new InvalidFieldError()
      : null;
  }
}
