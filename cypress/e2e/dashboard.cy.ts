import { DEV } from "./dev"

const PROD_URL = "https://bright-starlight-9f4a7b.netlify.app"
const DEV_URL = "http://localhost:5173"

const url = DEV ? DEV_URL : PROD_URL

describe("The dashboard", () => {
  it("should load'", () => {
    cy.visit(`${url}/login`);
    cy.get("input[id='name']").type("Bob");
    cy.get("input[id='email']").type("bob@gmail.com");
    cy.get("input[value='Log in']").contains("Log in").click();
    cy.url().should("include", "/dashboard");
  });
});

describe("The search inputs for Basenji dogs ordered by name", () => {
  it("should return results for dogs with one named Arnold at the bottom", () => {
    cy.visit(`${url}/login`);
    cy.get("input[id='name']").type("Bob");
    cy.get("input[id='email']").type("bob@gmail.com");
    cy.get("input[value='Log in']").contains("Log in").click();

    cy.get("input[id^='headlessui-combobox-input']").type("Basenji");

    cy.get('li').contains("Basenji").click();

    cy.get('button[id^="headlessui-disclosure-button"]').click();
    cy.get('button[id^="headlessui-listbox-button"]').click();
    cy.get('li[id^="headlessui-listbox-option"]').first().click();

    cy.get("button").contains("Search Dogs").click();

    cy.get("span").contains("Arnold").should("exist");
  });
});

describe("The search inputs for Basenji dogs ordered by name with a minimum age of 7", () => {
  it("should return results for dogs ordered by name, with Christop", () => {
    cy.visit(`${url}/login`);
    cy.get("input[id='name']").type("Bob");
    cy.get("input[id='email']").type("bob@gmail.com");
    cy.get("input[value='Log in']").contains("Log in").click();

    cy.get("input[id^='headlessui-combobox-input']").type("Basenji");
    cy.get('li').contains("Basenji").click();

    cy.get("input[id='ageMin']").type("7");

    cy.get('button[id^="headlessui-disclosure-button-:r"]').click();
    cy.get('button[id^="headlessui-listbox-button-:r"]').click();
    cy.get('li').contains("Age").click();

    cy.get("button").contains("Search Dogs").click();

    cy.get("span").contains("Christop").should("exist");
  });
});

describe("Searching for all the dogs and clicking on the next button", () => {
  it("should return a list of dogs on the next page, with a dog named Titus at the top", () => {
    cy.visit(`${url}/login`);
    cy.get("input[id='name']").type("Bob");
    cy.get("input[id='email']").type("bob@gmail.com");
    cy.get("input[value='Log in']").contains("Log in").click();

    cy.get("button").contains("Search Dogs").click();
    cy.get("button").contains("Next").click();

    cy.get("span").contains("Titus").should("exist");
  });
});

describe("Selecting all the dogs on the first page and clicking match", () => {
  it("should return a matched dog on the match page", () => {
    cy.visit(`${url}/login`);
    cy.get("input[id='name']").type("Bob");
    cy.get("input[id='email']").type("bob@gmail.com");
    cy.get("input[value='Log in']").contains("Log in").click();

    cy.get("button").contains("Search Dogs").click();

    // Click on all dogs on the first page, each one is a button with a li element inside
    cy.get("li").each(($el, index, $list) => {
      cy.wrap($el).click();
    });

    cy.get("button").contains("Find me a match!").click();

    cy.url().should("include", "/match");
  });
});

describe("Clicking on the log out button", () => {
  it("should take you to the login page", () => {
    cy.visit(`${url}/login`);
    cy.get("input[id='name']").type("Bob");
    cy.get("input[id='email']").type("bob@gmail.com");
    cy.get("input[value='Log in']").contains("Log in").click();

    cy.get("button").contains("Log out").click();
    cy.url().should("include", "/login");
  });
});

describe("Navigating to the dashboard page without logging in ", () => {
  it("should fail", () => {
    cy.visit(`${url}/dashboard`);
    cy.url().should("include", "/login");
  });
});
