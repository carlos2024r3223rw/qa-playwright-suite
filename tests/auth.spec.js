const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Autenticación', () => {
  test('permite el acceso con credenciales válidas', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.loginAsStandardUser();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('muestra un error con credenciales inválidas', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('usuario_invalido', 'clave_invalida');
    await login.expectError('Username and password do not match any user in this service');
  });

  test('informa cuando la cuenta está bloqueada', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.loginAsLockedOutUser();
    await login.expectError('Sorry, this user has been locked out.');
  });
});
