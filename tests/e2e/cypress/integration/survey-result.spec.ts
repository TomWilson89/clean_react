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

  it('Should present survey result', () => {
    mockSuccess();
    cy.visit('/surveys/any_id');
    cy.getByTestId('question').should('have.text', 'Question');
    cy.getByTestId('day').should('have.text', '03');
    cy.getByTestId('month').should('have.text', 'feb');
    cy.getByTestId('year').should('have.text', '2018');
    cy.get('li:nth-child(1)').then((li) => {
      assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer');
      assert.equal(li.find('[data-testid="image"]').attr('src'), 'any_image');
      assert.equal(li.find('[data-testid="percent"]').text(), '70%');
    });

    cy.get('li:nth-child(2)').then((li) => {
      assert.equal(li.find('[data-testid="answer"]').text(), 'any_answer_2');
      assert.equal(li.find('[data-testid="percent"]').text(), '30%');
      assert.notExists(li.find('[data-testid="image"]'));
    });
  });

  it('Should go to SurveyList on back button click', () => {
    mockSuccess();
    cy.visit('/');
    cy.visit('/surveys/any_id');
    cy.getByTestId('back-button').click();
    Helpers.testUrl('/');
  });
});
