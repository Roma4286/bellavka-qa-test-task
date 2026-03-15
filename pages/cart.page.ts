import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  cartLink() {
    return this.page.locator('.middle-bar__link.middle-bar__link--icon', { hasText: 'Корзина' });
  }

  cartItem() {
    return this.page.locator('.cart-item').first();
  }

  async open() {
    await Promise.all([this.page.waitForURL('**/cart'), this.cartLink().click()]);
    await this.page.waitForLoadState('load');
  }

  async getCartItemInfo() {
    const item = this.cartItem();
    const description = await item.locator('a.cart-item__text').textContent();
    const price = await item.locator('.cart-item__price.cart-item__price--nowrap').textContent();
    const size = await item.locator('.cart-item__text', { hasText: 'Размер' }).textContent();
    return { description, price, size };
  }
}
