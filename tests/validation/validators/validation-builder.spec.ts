import { ValidationBuilder } from '@/validation/builder';
import {
  EmailFieldValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '@/validation/validators';
import faker from 'faker';

describe('ValidationBuilder', () => {
  test('should return RequiredFieldValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).required().build();
    expect(validations).toStrictEqual([new RequiredFieldValidation(field)]);
  });

  test('should return EmailFieldValidation', () => {
    const field = faker.database.column();
    const validations = ValidationBuilder.field(field).email().build();
    expect(validations).toStrictEqual([new EmailFieldValidation(field)]);
  });

  test('should return MinLengthFieldValidation', () => {
    const field = faker.database.column();
    const length = faker.datatype.number();
    const validations = ValidationBuilder.field(field).min(length).build();
    expect(validations).toStrictEqual([new MinLengthValidation(field, length)]);
  });

  test('should return a list of validations', () => {
    const field = faker.database.column();
    const length = faker.datatype.number();
    const validations = ValidationBuilder.field(field)
      .required()
      .min(length)
      .email()
      .build();
    expect(validations).toStrictEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailFieldValidation(field),
    ]);
  });
});
