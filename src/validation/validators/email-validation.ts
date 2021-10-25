import { InvalidFieldError } from '../errors/invalid-field-error';
import { FieldValidation } from '../protocols';

export class EmailFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: Record<string, unknown>): Error {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return !input[this.field] || emailRegex.test(input[this.field] as string)
      ? null
      : new InvalidFieldError();
  }
}
