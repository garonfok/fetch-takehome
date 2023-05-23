import { DEV } from "./dev";

const PROD_URL = "https://bright-starlight-9f4a7b.netlify.app";
const DEV_URL = "http://localhost:5173";

const url = DEV ? DEV_URL : PROD_URL;

describe("The home page", () => {
  it("loads", () => {
    // connect to the dev server URL
    cy.visit(url);
  });
});

describe("The login button", () => {
  it("takes you to the login page", () => {
    cy.visit(url);
    cy.get("a").contains("Log in").click();

    cy.url().should("include", "/login");
  });
});
