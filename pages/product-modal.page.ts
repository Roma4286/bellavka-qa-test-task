import { Page } from '@playwright/test';
import { closeModalIfVisible } from '@utils/helpers';

export class ProductModal {
  constructor(private page: Page) {}

  sizeOption() {
    return this.page.locator('.options-selector__item').first();
  }

  chooseButton() {
    return this.page.locator('button', { hasText: 'Выбрать' });
  }

  async selectSize() {
    const size = await this.sizeOption().textContent();
    await this.sizeOption().click();
    await this.chooseButton().click();
    await this.page
      .locator('div.v-modal__desktop', { hasText: 'Товар добавлен в корзину' })
      .waitFor({ state: 'visible' });

    await closeModalIfVisible(this.page, 'Товар добавлен в корзину');

    return size;
  }
}
