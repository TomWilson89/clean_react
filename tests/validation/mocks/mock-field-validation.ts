import { FieldValidation } from '@/validation/protocols';

export class FieldValidationSpy implements FieldValidation {
  public error: Error = null;

  constructor(readonly field: string) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(input: Record<string, unknown>): Error {
    return this.error;
  }
}
