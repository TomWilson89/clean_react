import { MinLengthError } from '../errors';
import { FieldValidation } from '../protocols';

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(input: Record<string, unknown>): Error {
    return (input[this.field] as string)?.length < this.minLength
      ? new MinLengthError()
      : null;
  }
}
