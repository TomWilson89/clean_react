import faker from 'faker';
import { FormHelper, Helpers, HttpMocks } from '../utils';

const path = /api\/signup/;
const mockEmailInUserError = (): void =>
  HttpMocks.mockForbiddenError(path, 'POST');

const mockUnexpectedError = (): void => HttpMocks.mockServeError(path, 'POST');

const mockSuccess = (): void => {
  HttpMocks.mockSuccess({
    url: path,
    method: 'POST',
    fixture: 'account',
    alias: 'signUpRequest',
  });
  HttpMocks.mockSuccess({
    url: /api\/surveys/,
    method: 'POST',
    fixture: 'survey-list',
  });
};

const populateFields = (): void => {
  cy.getByTestId('name').focus().type(faker.name.findName());
  cy.getByTestId('email').focus().type(faker.internet.email());
  const password = faker.internet.password();
  cy.getByTestId('password').focus().type(password);

  cy.getByTestId('passwordConfirmation').focus().type(password);
};

const simulateValidSubmit = (): void => {
  populateFields();
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

  it('Should reset state on page load', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelper.testInputStatus('email');
    cy.getByTestId('login-link').click();
    cy.getByTestId('signup-link').click();
    FormHelper.testInputStatus('email', 'Required');
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

    Helpers.testUrl('/signup');
  });

  it('Should present UnexpectedError on 400 ', () => {
    mockUnexpectedError();
    simulateValidSubmit();

    FormHelper.testMainError('Something went wrong. Please try again');
    Helpers.testUrl('/signup');
  });

  it('Should save accessToken if valid credentials are provided', () => {
    mockSuccess();
    simulateValidSubmit();

    Helpers.testUrl('/');

    Helpers.testLocalStorageItem('account');
  });

  it('Should prevent multiple submits', () => {
    mockSuccess();

    populateFields();
    cy.getByTestId('submit').dblclick();
    cy.wait('@signUpRequest');
    cy.get('@signUpRequest.all').should('have.length', 1);
  });

  it('Should not call submit if form is invalid', () => {
    mockSuccess();

    cy.getByTestId('email')
      .focus()
      .type(faker.internet.email())
      .type('{enter}');
    cy.get('@signUpRequest.all').should('have.length', 0);
  });
});
