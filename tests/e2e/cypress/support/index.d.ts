declare namespace Cypress {
  interface Chainable<Subject = any> {
    getByTestId(id: string): Chainable<Subject>;
  }
}
