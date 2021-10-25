import { Validation } from '@/presentation/protocols/validations';

export class ValidationStub implements Validation {
  public errorMessage = '';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(fieldName: string, value: string): string {
    return this.errorMessage;
  }
}
