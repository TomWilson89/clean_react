import faker from 'faker';
import { ValidationComposite } from '@/validation/composite';
import { FieldValidationSpy } from '../mocks/mock-field-validation';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];

  const sut = ValidationComposite.build(fieldValidationsSpy);

  return {
    sut,
    fieldValidationsSpy,
  };
};
describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const firstError = faker.random.words();
    const fieldName = faker.database.column();
    const { sut, fieldValidationsSpy } = makeSut(fieldName);
    fieldValidationsSpy[0].error = new Error(firstError);
    fieldValidationsSpy[1].error = new Error(faker.random.words());
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() });
    expect(error).toBe(firstError);
  });

  test('should return falsy if any validation success', () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);
    const error = sut.validate(fieldName, { [fieldName]: faker.random.word() });
    expect(error).toBeFalsy();
  });
});
