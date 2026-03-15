import { Page } from '@playwright/test';
import { closeModalIfVisible } from '../utils/helpers';

export class HomePage {
  constructor(private page: Page) {}

  catalogButton() {
    return this.page.getByRole('button', { name: 'Каталог' });
  }

  clothesLink() {
    return this.page.locator('.drop-menu__link.drop-menu__link--catalog', { hasText: 'Одежда' });
  }

  async goto() {
    await this.page.goto('https://ramonki.by/');
    await closeModalIfVisible(this.page);
  }

  async openClothesCategory() {
    await this.catalogButton().click();
    await this.clothesLink().waitFor({ state: 'visible' });
    await this.clothesLink().hover();
  }
}
