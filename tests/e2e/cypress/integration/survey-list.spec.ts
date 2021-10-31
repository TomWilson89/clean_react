import faker from 'faker';
import { Helpers, HttpMocks } from '../utils';

const path = /surveys/;

const mockUnexpectedError = (): void => HttpMocks.mockServeError(path, 'GET');

const mockAccessDeniedError = (): void =>
  HttpMocks.mockForbiddenError(path, 'GET');

describe('SurveyList', () => {
  beforeEach(() => {
    Helpers.setLocalStorageItem('account', {
      accessToken: faker.datatype.uuid(),
      name: faker.name.findName(),
    });
    cy.visit('/');
  });

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError();
    cy.getByTestId('error').should(
      'contain.text',
      'Something went wrong. Please try again'
    );
  });

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError();
    Helpers.testUrl('/login');
  });

  it('Should Present correct username', () => {
    mockUnexpectedError();
    const { name } = Helpers.getLocalStorageItem('account');
    cy.getByTestId('username').should('contain.text', name);
  });

  it('Should logout on logout link click', () => {
    mockUnexpectedError();
    cy.getByTestId('logout').click();
    Helpers.testUrl('/login');
  });
});
