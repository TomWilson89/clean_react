import { InvalidFieldError } from '../errors/invalid-field-error';
import { FieldValidation } from '../protocols';

export class EmailFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  value = '';

  validate(value: string): Error {
    this.value = value;
    return new InvalidFieldError();
  }
}
