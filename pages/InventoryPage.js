class InventoryPage {
  constructor(page) {
    this.page = page;
    this.sortDropdown = page.getByRole('combobox');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.inventoryItems = page.locator('.inventory_item');
  }

  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectOption('lohi');
  }

  async sortByPriceHighToLow() {
    await this.sortDropdown.selectOption('hilo');
  }

  async getPrices() {
    return this.page.locator('.inventory_item_price').allTextContents();
  }

  async addItemToCart(itemName) {
    const item = this.inventoryItems.filter({ has: this.page.getByText(itemName, { exact: true }) });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeItemFromCart(itemName) {
    const item = this.inventoryItems.filter({ has: this.page.getByText(itemName, { exact: true }) });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async expectCartCount(count) {
    if (count === 0) {
      await this.cartBadge.waitFor({ state: 'detached' });
    } else {
      await this.cartBadge.getByText(String(count), { exact: true }).waitFor({ state: 'visible' });
    }
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };
