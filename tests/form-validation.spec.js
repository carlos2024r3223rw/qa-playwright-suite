const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('Validación del formulario de checkout', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);
    const checkout = new CheckoutPage(page);
    await login.goto();
    await login.loginAsStandardUser();
    await inventory.addItemToCart('Sauce Labs Backpack');
    await inventory.openCart();
    await checkout.startCheckout();
  });

  test('requiere el nombre', async ({ page }) => {
    const checkout = new CheckoutPage(page);
    await checkout.fillCustomerInformation({ lastName: 'Tester', postalCode: '11001' });
    await checkout.continue();
    await expect(checkout.errorMessage).toContainText('Error: First Name is required');
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  test('requiere el apellido', async ({ page }) => {
    const checkout = new CheckoutPage(page);
    await checkout.fillCustomerInformation({ firstName: 'QA', postalCode: '11001' });
    await checkout.continue();
    await expect(checkout.errorMessage).toContainText('Error: Last Name is required');
  });

  test('requiere el código postal', async ({ page }) => {
    const checkout = new CheckoutPage(page);
    await checkout.fillCustomerInformation({ firstName: 'QA', lastName: 'Tester' });
    await checkout.continue();
    await expect(checkout.errorMessage).toContainText('Error: Postal Code is required');
  });

  test('rechaza el formulario completamente vacío', async ({ page }) => {
    const checkout = new CheckoutPage(page);
    await checkout.continue();
    await expect(checkout.errorMessage).toContainText('Error: First Name is required');
  });
});
