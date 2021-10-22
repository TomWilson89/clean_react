import { FieldValidation } from '../protocols';
import {
  EmailFieldValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '../validators';

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  public required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  public email(): ValidationBuilder {
    this.validations.push(new EmailFieldValidation(this.fieldName));
    return this;
  }

  public min(minLength: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, minLength));
    return this;
  }

  public build(): FieldValidation[] {
    return this.validations;
  }
}
