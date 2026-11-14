const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginAsStandardUser() {
    await this.login('standard_user', 'secret_sauce');
  }

  async loginAsLockedOutUser() {
    await this.login('locked_out_user', 'secret_sauce');
  }

  async expectError(message) {
    await expect(this.errorMessage).toContainText(message);
  }
}

module.exports = { LoginPage };
