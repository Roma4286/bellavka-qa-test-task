import { Page } from '@playwright/test';

export class ClothesPage {
  constructor(private page: Page) {}

  dressesLink() {
    return this.page.getByRole('link', { name: 'Платья и сарафаны', exact: true });
  }

  breadcrumbItem() {
    return this.page.locator('li.breadcrumb__item', { hasText: 'Платья и сарафаны' });
  }

  firstProduct() {
    return this.page.locator('div.product-card').first();
  }

  async openDresses() {
    await Promise.all([
      this.dressesLink().click(),
      this.page.waitForURL('**/catalog/cat-platia-i-sarafany-38365'),
    ]);
    await this.breadcrumbItem().waitFor({ state: 'visible' });
  }

  async getFirstProductInfo() {
    const product = this.firstProduct();
    const description = await product.locator('.product-card-description__title').textContent();
    const price = await product.locator('.product-card-description__price-current').textContent();
    const buyButton = product.locator('.product-card__buy');
    return { description, price, buyButton };
  }
}
