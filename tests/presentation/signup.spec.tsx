import { Signup } from '@/presentation/pages';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import faker from 'faker';
import React from 'react';
import { Helper } from './helper';
import { ValidationSpy } from './mocks';

type SutParams = {
  validationError: string;
};

type SutTypes = {
  validationSpy: ValidationSpy;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = params?.validationError;
  render(<Signup validation={validationSpy} />);

  return {
    validationSpy,
  };
};

const populateField = (
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = screen.getByTestId(fieldName);
  fireEvent.input(input, {
    target: { value },
  });
};

describe('Signup component', () => {
  test('should start with initial state', () => {
    const validationError = faker.random.word();
    makeSut({ validationError });
    Helper.testChildCount('error-wrap', 0);
    Helper.testButtonIsDisable('submit', true);
    Helper.testFieldStatus('name', validationError);
    Helper.testFieldStatus('email', 'Required');
    Helper.testFieldStatus('password', 'Required');
    Helper.testFieldStatus('passwordConfirmation', 'Required');
  });

  test('Should show name error if validation fails', () => {
    const validationError = faker.random.word();
    makeSut({ validationError });
    populateField('name');
    Helper.testFieldStatus('name', validationError);
  });
});
