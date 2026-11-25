# SauceDemo E2E Tests with Playwright

Web automation project built with JavaScript, Playwright, and Chromium. The application under test is [SauceDemo](https://www.saucedemo.com).

## Requirements

- Node.js 18 or higher and npm.
- Internet access the first time to download Playwright and Chromium.

## Installation and Usage

From this folder, run:

```bash
npm install
npx playwright install chromium
npx playwright test
```

To open the latest HTML report:

```bash
npx playwright show-report
```

You can also use `npm test`, `npm run test:headed` to watch the browser, or `npm run test:ui` to explore the tests interactively.

## Architecture: Page Object Model

Each main page has a class in `pages/`. The class stores the locators and actions specific to that screen. The tests in `tests/` describe the scenarios using those actions, which avoids repeating selectors and makes them easier to maintain when the interface changes.

- `LoginPage.js`: opening the page, logging in, and reading errors.
- `InventoryPage.js`: sorting by price, managing products, and the cart counter.
- `CheckoutPage.js`: buyer form, validations, and purchase confirmation.

## Scenarios Covered

- `tests/auth.spec.js`: successful login, invalid credentials, and locked-out user.
- `tests/e2e-purchase.spec.js`: ascending price sort, product selection, cart, and confirmed purchase.
- `tests/form-validation.spec.js`: required first name, last name, and postal code, plus the empty form.

## Reports and Evidence

The HTML report is generated in `playwright-report/`. The configuration saves screenshots and traces when a test fails (`screenshot: 'only-on-failure'` and `trace: 'retain-on-failure'`). To inspect a trace:

```bash
npx playwright show-trace test-results/path-to-the-trace/trace.zip
```

The test credentials are the public accounts that SauceDemo shows on its login page; do not use real credentials.
<img width="1300" height="877" alt="Captura de pantalla 2026-11-13 212516" src="https://github.com/user-attachments/assets/f964a8b2-0789-41cf-a0f9-e6f1210fe5ff" />
