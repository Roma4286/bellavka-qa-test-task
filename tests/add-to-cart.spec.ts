import { test, type Page } from '@playwright/test';

async function closeModalIfVisible(page: Page) {
  const modal = page.locator('div.v-modal.sale[role="dialog"]');
  const closeButton = modal.locator('.v-modal__close');

  await modal.waitFor({ state: 'visible' });

  await closeButton.click();

  await modal.waitFor({ state: 'hidden' });
}

test('Add product to cart', async ({ page }) => {
  await page.goto('https://ramonki.by/');

  await closeModalIfVisible(page);
  await page.getByRole('button', { name: 'Каталог' }).click();
  const clothesLink = page.getByRole('link', { name: /^Одежда$/ });

  await clothesLink.click();
  await page.waitForURL('**/catalog/cat-odezda-1782510');

  const dressesLink = page.locator('li.filter__category', {
    hasText: 'Платья и сарафаны',
  });

  await dressesLink.click();
  await page.waitForURL('**/catalog/cat-platia-i-sarafany-38365');
});
