/// <reference types="cypress" />

import "@testing-library/cypress/add-commands";

Cypress.Commands.add("signIn", (email: string, password: string) => {
  cy.visit("/auth/login");

  cy.findByLabelText(/email/i).clear().type(email);

  cy.findByLabelText(/password/i)
    .clear()
    .type(password);

  cy.findByRole("main").within(() => {
    cy.findByRole("button", { name: /login/i }).click();
  });
});

Cypress.Commands.add(
  "register",
  (name: string, email: string, password: string) => {
    cy.visit("/auth/register");

    cy.findByLabelText(/name/i).clear().type(name);

    cy.findByLabelText(/email/i).clear().type(email);

    cy.findByLabelText(/password/i)
      .clear()
      .type(password);

    cy.findByRole("main").within(() => {
      cy.findByRole("button", { name: /sign up/i }).click();
    });
  }
);
