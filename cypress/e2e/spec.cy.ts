describe("empty spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");

    cy.findByRole("heading", { name: "Kitchen Sink" }).should("exist");
  });
});
