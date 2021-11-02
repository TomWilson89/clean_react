import { Helpers, HttpMocks } from '../utils';

const path = /api\/surveys/;

const mockUnexpectedError = (): void => HttpMocks.mockServeError(path, 'GET');

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
});
