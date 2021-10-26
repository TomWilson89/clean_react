import { FormHelper } from '../utils';

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
});
