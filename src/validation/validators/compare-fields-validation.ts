import { InvalidFieldError } from '../errors';
import { FieldValidation } from '../protocols';

export class CompareFieldValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly valueToCompare: string
  ) {}

  validate(input: string): Error {
    return input !== this.valueToCompare ? new InvalidFieldError() : null;
  }
}
