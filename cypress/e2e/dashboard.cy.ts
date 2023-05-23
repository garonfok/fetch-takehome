describe("The dashboard", () => {
  it("should load'", () => {
    cy.visit("localhost:5173/login");
    cy.get("input[id='name']").type("Bob");
    cy.get("input[id='email']").type("bob@gmail.com");
    cy.get("input[value='Log in']").contains("Log in").click();
    cy.url().should("include", "/dashboard");
  });
});

describe("The search inputs for Basenji dogs ordered by name", () => {
  it("should return results for dogs with one named Arnold at the bottom", () => {
    cy.visit("localhost:5173/login");
    cy.get("input[id='name']").type("Bob");
    cy.get("input[id='email']").type("bob@gmail.com");
    cy.get("input[value='Log in']").contains("Log in").click();

    cy.get("input[id='headlessui-combobox-input-:r1:']").type("Basenji");
    cy.get("li[id='headlessui-combobox-option-:rn:']").click();

    cy.get('button[id="headlessui-disclosure-button-:r5:"]').click();
    cy.get('button[id="headlessui-listbox-button-:r7p:"]').click();
    cy.get('li[id="headlessui-listbox-option-:r7v:"]').click();

    cy.get("button").contains("Search Dogs").click();

    cy.get("span").contains("Arnold").should("exist");
  });
});

describe("The search inputs for Basenji dogs ordered by name with a minimum age of 7", () => {
  it("should return results for dogs ordered by name, with Christop", () => {
    cy.visit("localhost:5173/login");
    cy.get("input[id='name']").type("Bob");
    cy.get("input[id='email']").type("bob@gmail.com");
    cy.get("input[value='Log in']").contains("Log in").click();

    cy.get("input[id='headlessui-combobox-input-:r1:']").type("Basenji");
    cy.get("li[id='headlessui-combobox-option-:rn:']").click();

    cy.get("input[id='ageMin']").type("7");

    cy.get('button[id="headlessui-disclosure-button-:r5:"]').click();
    cy.get('button[id="headlessui-listbox-button-:r7p:"]').click();
    cy.get('li[id="headlessui-listbox-option-:r7v:"]').click();

    cy.get("button").contains("Search Dogs").click();

    cy.get("span").contains("Christop").should("exist");
  });
});

describe("Searching for all the dogs and clicking on the next button", () => {
  it("should return a list of dogs on the next page, with a dog named Titus at the top", () => {
    cy.visit("localhost:5173/login");
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
    cy.visit("localhost:5173/login");
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
    cy.visit("localhost:5173/login");
    cy.get("input[id='name']").type("Bob");
    cy.get("input[id='email']").type("bob@gmail.com");
    cy.get("input[value='Log in']").contains("Log in").click();

    cy.get("button").contains("Log out").click();
    cy.url().should("include", "/login");
  });
});

describe("Navigating to the dashboard page without logging in ", () => {
  it("should fail", () => {
    cy.visit("localhost:5173/dashboard");
    cy.url().should("include", "/login");
  });
});
