import { Signup } from '@/presentation/pages';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import faker from 'faker';
import React from 'react';
import { Helper } from './helper';
import { ValidationStub } from './mocks';

type SutParams = {
  validationError: string;
};

type SutTypes = {
  validationStub: ValidationStub;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  render(<Signup validation={validationStub} />);

  return {
    validationStub,
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
    Helper.testFieldStatus('passwordConfirmation', validationError);
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

  test('Should show passwordConfirmation error if validation fails', () => {
    const validationError = faker.random.word();
    makeSut({ validationError });
    Helper.populateField('passwordConfirmation');
    Helper.testFieldStatus('passwordConfirmation', validationError);
  });

  test('Should valid state if name validation success', () => {
    makeSut();
    Helper.populateField('name');
    Helper.testFieldStatus('name');
  });

  test('Should valid state if email validation success', () => {
    makeSut();
    Helper.populateField('email');
    Helper.testFieldStatus('email');
  });

  test('Should valid state if password validation success', () => {
    makeSut();
    Helper.populateField('password');
    Helper.testFieldStatus('password');
  });

  test('Should valid state if passwordConfirmation validation success', () => {
    makeSut();
    Helper.populateField('passwordConfirmation');
    Helper.testFieldStatus('passwordConfirmation');
  });
});
