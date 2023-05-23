describe("The home page", () => {
  it("loads", () => {
    // connect to the dev server URL
    cy.visit("localhost:5173");
  });
});

describe("The login button", () => {
  it("takes you to the login page", () => {
    cy.visit("localhost:5173");
    cy.get("a").contains("Log in").click();

    cy.url().should("include", "/login");
  });
});
