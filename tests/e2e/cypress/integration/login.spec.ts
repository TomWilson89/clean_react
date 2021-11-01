import faker from 'faker';
import { FormHelper, Helpers, HttpMocks } from '../utils';

const path = /login/;
const mockInvalidCredentialsError = (): void =>
  HttpMocks.mockUnauthorizedError(path);

const mockUnexpectedError = (): void => HttpMocks.mockServeError(path, 'POST');

const mockSuccess = (): void =>
  HttpMocks.mockSuccess(path, 'POST', 'account.json');

const populatefield = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email());
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
};

const simulateValidSubmit = (): void => {
  populatefield();
  cy.getByTestId('submit').click();
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelper.testInputStatus('email', 'Required');

    cy.getByTestId('password').should('have.attr', 'readOnly');

    FormHelper.testInputStatus('password', 'Required');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());

    FormHelper.testInputStatus('email', 'Invalid Field');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3));

    FormHelper.testInputStatus('password', 'Field Is Too Short');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());

    FormHelper.testInputStatus('email');

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
    FormHelper.testInputStatus('password');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present InvalidCredentialsError on 401', () => {
    mockInvalidCredentialsError();

    simulateValidSubmit();

    FormHelper.testMainError('Invalid Credentials');

    Helpers.testUrl('/login');
  });

  it('Should present UnexpectedError on 400 ', () => {
    mockUnexpectedError();
    simulateValidSubmit();

    FormHelper.testMainError('Something went wrong. Please try again');
    Helpers.testUrl('/login');
  });

  it('Should save accessToken if valid credentials are provided', () => {
    mockSuccess();
    simulateValidSubmit();

    Helpers.testUrl('/');

    Helpers.testLocalStorageItem('account');
  });

  it('Should prevent multiple submits', () => {
    mockSuccess();

    populatefield();
    cy.getByTestId('submit').dblclick();
    cy.wait('@request');
    cy.get('@request.all').should('have.length', 1);
  });

  it('Should not call submit if form is invalid', () => {
    mockSuccess();

    cy.getByTestId('email')
      .focus()
      .type(faker.internet.email())
      .type('{enter}');

    Helpers.testHttpCallsCount(0);
  });
});
