import faker from 'faker';

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const mockInvalidCredentialsError = (url: RegExp): void => {
  cy.intercept('POST', url, {
    statusCode: 401,
    body: {
      error: faker.random.words(),
    },
  }).as('request');
};

export const mockEmailInUserError = (url: RegExp): void => {
  cy.intercept('POST', url, {
    statusCode: 403,
    body: {
      error: faker.random.words(),
    },
  }).as('request');
};

export const mockUnexpectedError = (url: RegExp, method: Methods): void => {
  cy.intercept(method, url, {
    statusCode: 400,
    body: {
      error: faker.random.words(),
    },
  }).as('request');
};

export const mockSuccess = (
  url: RegExp,
  method: Methods,
  body: string | boolean | Record<string, unknown>
): void => {
  cy.intercept(method, url, {
    statusCode: 200,
    body,
  }).as('request');
};
