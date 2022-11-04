// I have to run test in one "it" because cypress clears the localStorage between tests.

it("auth flow", () => {
  // register user
  cy.register(
    Cypress.env("TEST_NAME"),
    Cypress.env("TEST_USER_EMAIL"),
    Cypress.env("TEST_PASSWORD")
  );

  // check correct redirect to /posts
  cy.findByRole("button", { name: /sign up/i }).should("not.exist");

  // log out user
  cy.findByRole("menu").click();
  cy.findByRole("button", { name: /logout/i }).click();

  // sign in user with wrong email
  cy.signIn("test@test.com", Cypress.env("TEST_PASSWORD"));
  // check correct error message
  cy.findByText(/user not found/i).should("exist");

  // sign in user with wrong password
  cy.signIn(Cypress.env("TEST_USER_EMAIL"), "wrongpassword");
  // check correct error message
  cy.findByText(/password is incorrect/i).should("exist");
});

it("verified protected page and correct redirect", () => {
  // check redirect to /auth/login
  cy.visit("/posts");
  cy.findByRole("button", { name: /login/i }).should("exist");
});

export {};
