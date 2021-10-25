import { InvalidFieldError } from '../errors';
import { FieldValidation } from '../protocols';

export class CompareFieldValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly valueToCompare: string
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(input: string): Error {
    return new InvalidFieldError();
  }
}
