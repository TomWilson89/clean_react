import { Helpers, HttpMocks } from '../utils';

const path = /surveys/;

const mockUnexpectedError = (): void => HttpMocks.mockServeError(path, 'GET');

const mockAccessDeniedError = (): void =>
  HttpMocks.mockForbiddenError(path, 'GET');

const mockSuccess = (): void =>
  HttpMocks.mockSuccess(path, 'GET', 'survey-list.json');

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helpers.setLocalStorageItem('account', account);
    });
  });

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError();
    cy.visit('/');
    cy.getByTestId('error').should(
      'contain.text',
      'Something went wrong. Please try again'
    );
  });

  it('Should reload on button click', () => {
    mockUnexpectedError();
    cy.visit('/');
    cy.getByTestId('error').should(
      'contain.text',
      'Something went wrong. Please try again'
    );

    mockSuccess();
    cy.getByTestId('reload-button').click();
    cy.get('li:not(:empty)').should('have.length', 2);
  });

  it('Should logout on AccessDeniedError', () => {
    mockAccessDeniedError();
    cy.visit('/');
    Helpers.testUrl('/login');
  });

  it('Should Present correct username', () => {
    mockUnexpectedError();
    cy.visit('/');
    const { name } = Helpers.getLocalStorageItem('account');
    cy.getByTestId('username').should('contain.text', name);
  });

  it('Should logout on logout link click', () => {
    mockUnexpectedError();
    cy.visit('/');
    cy.getByTestId('logout').click();
    Helpers.testUrl('/login');
  });

  it('Should present survey items', () => {
    mockSuccess();
    cy.visit('/');
    cy.get('li:empty').should('have.length', 4);
    cy.get('li:not(:empty)').should('have.length', 2);
    cy.get('li:nth-child(1)').then((li) => {
      assert.equal(li.find('[data-testid="day"]').text(), '03');
      assert.equal(li.find('[data-testid="month"]').text(), 'feb');
      assert.equal(li.find('[data-testid="year"]').text(), '2018');
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 1');
      cy.fixture('icons.json').then((icon) => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp);
      });
    });

    cy.get('li:nth-child(2)').then((li) => {
      assert.equal(li.find('[data-testid="day"]').text(), '04');
      assert.equal(li.find('[data-testid="month"]').text(), 'oct');
      assert.equal(li.find('[data-testid="year"]').text(), '2020');
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 2');
      cy.fixture('icons.json').then((icon) => {
        assert.equal(
          li.find('[data-testid="icon"]').attr('src'),
          icon.thumbDown
        );
      });
    });
  });
});
