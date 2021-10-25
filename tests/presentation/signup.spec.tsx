import { Signup } from '@/presentation/pages';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
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

describe('Signup component', () => {
  test('should start with initial state', () => {
    const validationError = faker.random.word();
    makeSut({ validationError });
    Helper.testChildCount('error-wrap', 0);
    Helper.testButtonIsDisable('submit', true);
    Helper.testFieldStatus('name', validationError);
    Helper.testFieldStatus('email', validationError);
    Helper.testFieldStatus('password', validationError);
    Helper.testFieldStatus('passwordConfirmation', 'Required');
  });

  test('Should show name error if validation fails', () => {
    const validationError = faker.random.word();
    makeSut({ validationError });
    Helper.populateField('name');
    Helper.testFieldStatus('name', validationError);
  });

  test('Should show email error if validation fails', () => {
    const validationError = faker.random.word();
    makeSut({ validationError });
    Helper.populateField('email');
    Helper.testFieldStatus('email', validationError);
  });

  test('Should show email error if validation fails', () => {
    const validationError = faker.random.word();
    makeSut({ validationError });
    Helper.populateField('password');
    Helper.testFieldStatus('password', validationError);
  });
});
