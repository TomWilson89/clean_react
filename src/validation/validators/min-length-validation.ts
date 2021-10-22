import { MinLengthError } from '../errors';
import { FieldValidation } from '../protocols';

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  value = '';

  validate(value: string): Error {
    this.value = value;
    return new MinLengthError();
  }
}
