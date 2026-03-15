import { Page } from '@playwright/test';

export async function closeModalIfVisible(page: Page, textOnModal: string = '') {
  const modal = page.locator('div.v-modal__desktop', { hasText: textOnModal });
  if (!(await modal.isVisible())) return;

  const closeButton = modal.locator('.v-modal__close');
  await closeButton.click();
  await modal.waitFor({ state: 'hidden' });
}

export function cleanWhitespace(text: string | null | undefined) {
  return (text ?? '')
    .replace(/\s+/g, ' ')
    .replace(/\u00A0/g, ' ')
    .trim();
}
