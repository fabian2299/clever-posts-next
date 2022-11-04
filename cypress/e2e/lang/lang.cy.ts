it("home page shows correct translations", () => {
  cy.visit("/");
  cy.findByText(/welcome/i).should("exist");

  // change language
  cy.findByRole("combobox").select("es");
  cy.findByText(/bienvenido/i).should("exist");
});
