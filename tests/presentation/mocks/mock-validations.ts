import { Validation } from '@/presentation/protocols/validations';

export class ValidationSpy implements Validation {
  public errorMessage = '';

  public fileName = '';

  public value = '';

  validate(fileName: string, value: string): string {
    this.fileName = fileName;
    this.value = value;
    return this.errorMessage;
  }
}
