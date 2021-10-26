import faker from 'faker';
import { FormHelper, HttpMocks } from '../utils';

const path = /signup/;
const mockEmailInUserError = (): void => HttpMocks.mockEmailInUserError(path);

const mockUnexpectedError = (): void =>
  HttpMocks.mockUnexpectedError(path, 'POST');

const mockInvalidResponse = (): void =>
  HttpMocks.mockSuccess(path, 'POST', { invalidData: faker.datatype.uuid() });

const simulateValidSubmit = (): void => {
  cy.getByTestId('name').focus().type(faker.name.findName());
  cy.getByTestId('email').focus().type(faker.internet.email());
  const password = faker.internet.password();
  cy.getByTestId('password').focus().type(password);

  cy.getByTestId('passwordConfirmation').focus().type(password);

  cy.getByTestId('submit').click();
};

describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup');
  });

  it('Should load with correct initial state', () => {
    cy.getByTestId('name').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('name', 'Required');

    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', 'Required');

    cy.getByTestId('password').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('password', 'Required');

    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('passwordConfirmation', 'Required');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(2));
    FormHelper.testInputStatus('name', 'Field Is Too Short');

    cy.getByTestId('email').focus().type(faker.random.word());
    FormHelper.testInputStatus('email', 'Invalid Field');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('password', 'Field Is Too Short');

    cy.getByTestId('passwordConfirmation')
      .focus()
      .type(faker.random.alphaNumeric(4));
    FormHelper.testInputStatus('passwordConfirmation', 'Invalid Field');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('name').focus().type(faker.name.findName());
    FormHelper.testInputStatus('name');

    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');

    const password = faker.internet.password();
    cy.getByTestId('password').focus().type(password);
    FormHelper.testInputStatus('password');

    cy.getByTestId('passwordConfirmation').focus().type(password);
    FormHelper.testInputStatus('passwordConfirmation');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present EmailInUseError on 403', () => {
    mockEmailInUserError();

    simulateValidSubmit();

    FormHelper.testMainError('Email already in use');

    FormHelper.testUrl('/signup');
  });

  it('Should present UnexpectedError on 400 ', () => {
    mockUnexpectedError();
    simulateValidSubmit();

    FormHelper.testMainError('Something went wrong. Please try again');
    FormHelper.testUrl('/signup');
  });

  it('Should present UnexpectedError if invalid data is returned', () => {
    mockInvalidResponse();
    simulateValidSubmit();

    FormHelper.testMainError('Something went wrong. Please try again');
  });
});
