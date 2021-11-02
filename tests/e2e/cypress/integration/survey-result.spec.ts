import { Helpers, HttpMocks } from '../utils';

const path = /api\/surveys/;

const mockUnexpectedError = (): void => HttpMocks.mockServeError(path, 'GET');

const mockAccessDeniedError = (): void =>
  HttpMocks.mockForbiddenError(path, 'GET');

const mockSuccess = (): void =>
  HttpMocks.mockSuccess(path, 'GET', 'survey-result.json');

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helpers.setLocalStorageItem('account', account);
    });
  });

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError();
    cy.visit('/surveys/any_id');
    cy.getByTestId('error').should(
      'contain.text',
      'Something went wrong. Please try again'
    );
  });

  it('Should reload on button click', () => {
    mockUnexpectedError();
    cy.visit('/surveys/any_id');

    cy.getByTestId('error').should(
      'contain.text',
      'Something went wrong. Please try again'
    );

    mockSuccess();
    cy.getByTestId('reload-button').click();
    cy.getByTestId('question').should('exist');
  });

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError();
    cy.visit('/surveys/any_id');
    Helpers.testUrl('/login');
  });
});
