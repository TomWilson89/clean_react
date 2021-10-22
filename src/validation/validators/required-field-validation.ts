import { RequiredFieldError } from '../errors';
import { FieldValidation } from '../protocols';

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  public value = '';

  validate(value: string): Error {
    this.value = value;
    return new RequiredFieldError();
  }
}
