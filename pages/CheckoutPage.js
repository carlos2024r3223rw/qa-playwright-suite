class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.errorMessage = page.locator('[data-test="error"]');
    this.confirmation = page.locator('.complete-header');
  }

  async startCheckout() {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }

  async fillCustomerInformation({ firstName, lastName, postalCode }) {
    if (firstName !== undefined) await this.firstNameInput.fill(firstName);
    if (lastName !== undefined) await this.lastNameInput.fill(lastName);
    if (postalCode !== undefined) await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finishPurchase() {
    await this.finishButton.click();
  }
}

module.exports = { CheckoutPage };
