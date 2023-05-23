import { DEV } from "./dev"

const PROD_URL = "https://bright-starlight-9f4a7b.netlify.app";
const DEV_URL = "http:/`localhost:5173";

describe("The login page", () => {
  it("loads", () => {
    // connect to the dev server URL
    cy.visit(`localhost:5173/login`);
  });
});

describe("The logo on the navbar", () => {
  it("takes you to the home page", () => {
    cy.visit(`localhost:5173/login`);
    cy.get("img").click();
    cy.url().should("include", "/");
  });
});

describe("Login form data", () => {
  it("should be valid for name 'Bob' and email 'bob@gmail.com'", () => {
    cy.visit(`localhost:5173/login`);
    cy.get("input[id='name']").type("Bob");
    cy.get("input[id='email']").type("bob@gmail.com");
    cy.get("input[value='Log in']").contains("Log in").click();
    cy.url().should("include", "/dashboard");
  });

  it("should be invalid for name 'a' and email 'a@a.a'", () => {
    cy.visit(`localhost:5173/login`);
    cy.get("input[id='name']").type("a");
    cy.get("input[id='email']").type("a@a.a");
    cy.get("input[value='Log in']").contains("Log in").click();
    cy.url().should("include", "/login");
    cy.get("span").contains(
      "An error occurred trying to log in. Please try again"
    );
  });
});
