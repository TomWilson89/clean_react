import { Validation } from '@/presentation/protocols/validations';

export class ValidationStub implements Validation {
  public errorMessage = '';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(fieldName: string, input: Record<string, unknown>): string {
    return this.errorMessage;
  }
}
