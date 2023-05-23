# Fetch Frontend Take-home Exercise

[Live link](https://bright-starlight-9f4a7b.netlify.app)

_Note: This link will be invalid when the interview process is complete._

## Summary

This website is a submission for Fetch's frontend take-home assignment, found [here](https://frontend-take-home.fetch.com/).

The website was built with React, TypeScript, Vite, TailwindCSS, HeadlessUI, and is hosted on [Netlify](https://www.netlify.com/).

## Running Locally

1. Pull the repo from GitHub:

```bash
gh repo clone garonfok/fetch-takehome
```

2. Navigate to the project directory

```bash
cd fetch-takehome
```

3. Install dependencies

```bash
npm install
```

4. Run the development server

```bash
npm run dev
```

5. Open the local server in a browser

By default, the website is hosted on `localhost:5173`

## Running Tests

1. Open Cypress

```bash
npx cypress open
```

2. Click on E2E Testing and make sure "Firefox" is selected, then click "Start E2E Testing in Firefox"

3. Click on any spec to run the tests for that page.

Change the value of the `DEV` variable in [`cypress/e2e/dev.ts`](cypress/e2e/dev.ts) to toggle between

## License

This project is licensed under the [MIT](/LICENSE) License.
