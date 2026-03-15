import { test, expect } from '@playwright/test';
import { ClothesPage } from '../pages/clothes.page';
import { ProductModal } from '../pages/product-modal.page';
import { CartPage } from '../pages/cart.page';
import { cleanWhitespace } from '../utils/helpers';
import { HomePage } from '@pages/home.page';

test('Add product to cart', async ({ page }) => {
  const home = new HomePage(page);
  const clothes = new ClothesPage(page);
  const productModal = new ProductModal(page);
  const cart = new CartPage(page);

  await home.goto();
  await home.openClothesCategory();
  await clothes.openDresses();

  const { description, price, buyButton } = await clothes.getFirstProductInfo();
  await buyButton.click();

  const size = await productModal.selectSize();

  await cart.open();
  const { description: descCart, price: priceCart, size: sizeCart } = await cart.getCartItemInfo();

  expect(descCart).toBe(description);
  expect(sizeCart + ' ').toBe('Размер ' + size);
  expect(cleanWhitespace(priceCart)).toBe(cleanWhitespace(price));
});
