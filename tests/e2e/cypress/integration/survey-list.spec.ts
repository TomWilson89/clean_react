import faker from 'faker';
import { Helpers, HttpMocks } from '../utils';

const path = /surveys/;

const mockUnexpectedError = (): void => HttpMocks.mockServeError(path, 'GET');

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
});
