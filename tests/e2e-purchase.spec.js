const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('completa una compra de principio a fin', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.loginAsStandardUser();
  await expect(page).toHaveURL(/inventory\.html/);

  await inventory.sortByPriceLowToHigh();
  const prices = (await inventory.getPrices()).map((price) => Number(price.replace('$', '')));
  expect(prices).toEqual([...prices].sort((a, b) => a - b));

  await inventory.addItemToCart('Sauce Labs Backpack');
  await inventory.addItemToCart('Sauce Labs Bike Light');
  await inventory.expectCartCount(2);
  await inventory.openCart();
  await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
  await expect(page.getByText('Sauce Labs Bike Light', { exact: true })).toBeVisible();

  await checkout.startCheckout();
  await checkout.fillCustomerInformation({ firstName: 'QA', lastName: 'Tester', postalCode: '11001' });
  await checkout.continue();
  await expect(page).toHaveURL(/checkout-step-two\.html/);
  await checkout.finishPurchase();
  await expect(checkout.confirmation).toHaveText('Thank you for your order!');
});
