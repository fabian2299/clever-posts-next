/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    signIn(email: string, password: string): Chainable<null>;
    register(name: string, email: string, password: string): Chainable<null>;
  }
}
