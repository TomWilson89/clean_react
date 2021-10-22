import { Validation } from '@/presentation/protocols/validations';

export class ValidationSpy implements Validation {
  public errorMessage = '';

  public fileName = '';

  public value = '';

  validate(fieldName: string, value: string): string {
    this.fileName = fieldName;
    this.value = value;
    return this.errorMessage;
  }
}
