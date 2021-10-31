import { Helpers } from '../utils';

describe('Private Routes', () => {
  it('Should logout if survey-list has no token', () => {
    cy.visit('/');

    Helpers.testUrl('/login');
  });
});
