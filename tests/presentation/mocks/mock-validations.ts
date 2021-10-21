import { Validation } from '@/presentation/protocols/validations';

export class ValidationSpy implements Validation {
  public errorMessage: string;

  public fileName: string;

  public value: string;

  validate(fileName: string, value: string): string {
    this.fileName = fileName;
    this.value = value;
    return this.errorMessage;
  }
}
