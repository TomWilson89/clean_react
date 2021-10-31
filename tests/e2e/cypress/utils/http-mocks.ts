import faker from 'faker';

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const mockUnauthorizedError = (url: RegExp): void => {
  cy.intercept('POST', url, {
    statusCode: 401,
    body: {
      error: faker.random.words(),
    },
  }).as('request');
};

export const mockForbiddenError = (url: RegExp, method: Methods): void => {
  cy.intercept(method, url, {
    statusCode: 403,
    body: {
      error: faker.random.words(),
    },
  }).as('request');
};

export const mockServeError = (url: RegExp, method: Methods): void => {
  cy.intercept(method, url, {
    statusCode: faker.helpers.randomize([500, 400, 404]),
    body: {
      error: faker.random.words(),
    },
  }).as('request');
};

export const mockSuccess = (
  url: RegExp,
  method: Methods,
  fixture: string
): void => {
  cy.intercept(method, url, {
    statusCode: 200,
    fixture,
  }).as('request');
};
