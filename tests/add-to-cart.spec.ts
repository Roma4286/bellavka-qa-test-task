import { test } from '@playwright/test';

test('Add product to cart', async ({ page }) => {
  await page.goto('https://ramonki.by/');

  const modal = page.locator('[role="dialog"]');
  const closeButton = page.locator('.v-modal__close');

  if (await modal.isVisible()) {
    await closeButton.click();
    await modal.waitFor({ state: 'hidden' });
  }

  await page.getByRole('button', { name: 'Каталог' }).click();
  const clothesLink = page.getByRole('link', { name: /^Одежда$/ });
  await Promise.all([page.waitForNavigation(), clothesLink.click()]);

  const dressesLink = page.locator('li.filter__category', {
    hasText: 'Платья и сарафаны',
  });
  await Promise.all([page.waitForNavigation(), dressesLink.click()]);
});
