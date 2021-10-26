import faker from 'faker';

const { baseUrl } = Cypress.config();

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly');
    cy.getByTestId('password').should('have.attr', 'readOnly');
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Required')
      .should('contain.text', '🔴');

    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Required')
      .should('contain.text', '🔴');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3));

    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Invalid Field')
      .should('contain.text', '🔴');
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Field Is Too Short')
      .should('contain.text', '🔴');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));

    cy.getByTestId('email-status').should('contain.text', '🟢');
    cy.getByTestId('password-status').should('contain.text', '🟢');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present InvalidCredentialsError on 401', () => {
    cy.intercept('POST', /login/, {
      statusCode: 401,
      body: {
        error: faker.random.words(),
      },
    });

    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));

    cy.getByTestId('submit').click();

    cy.getByTestId('spinner').should('not.exist');
    cy.getByTestId('main-error').should('contain.text', 'Invalid Credentials');

    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should present UnexpectedError on 400 ', () => {
    cy.intercept('POST', /login/, {
      statusCode: 400,
      body: {
        error: faker.random.words(),
      },
    });

    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));

    cy.getByTestId('submit').click();

    cy.getByTestId('spinner').should('not.exist');
    cy.getByTestId('main-error').should(
      'contain.text',
      'Something went wrong. Please try again'
    );

    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should present UnexpectedError if invalid data is returned', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        invalidProperty: faker.datatype.uuid(),
      },
    });
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));

    cy.getByTestId('submit').click();

    cy.getByTestId('spinner').should('not.exist');
    cy.getByTestId('main-error').should(
      'contain.text',
      'Something went wrong. Please try again'
    );
  });

  it('Should save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.datatype.uuid(),
      },
    });
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));

    cy.getByTestId('submit').click();

    cy.getByTestId('main-error').should('not.exist');
    cy.getByTestId('spinner').should('not.exist');

    cy.url().should('eq', `${baseUrl}/`);

    cy.window().then((window) =>
      assert.isOk(window.localStorage.getItem('accessToken'))
    );
  });

  it('Should prevent multiple submits', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.datatype.uuid(),
      },
    }).as('request');

    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));

    cy.getByTestId('submit').dblclick();
    cy.get('@request.all').should('have.length', 1);
  });

  it('Should submit form by clicking enter', () => {
    cy.intercept('POST', /login/, {
      statusCode: 200,
      body: {
        accessToken: faker.datatype.uuid(),
      },
    }).as('request');

    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password')
      .focus()
      .type(faker.random.alphaNumeric(5))
      .type('{enter}');

    cy.get('@request.all').should('have.length', 1);
  });
});
