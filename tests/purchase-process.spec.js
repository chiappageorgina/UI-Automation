const { test, expect } = require('@playwright/test');
const PurchasePage = require('../pages/PurchasePage');

test('Usuario puede realizar una compra exitosa', async ({ page }) => {
  const purchasePage = new PurchasePage(page);

  await page.goto('https://www.demoblaze.com');
  await expect(page).toHaveTitle('STORE');

  await purchasePage.clickPorduct();
  await purchasePage.addToCart();
  await purchasePage.goToCart();
  await purchasePage.placeOrder();

  await purchasePage.fillOrderForm({
    name: 'Georgina Chiappa',
    country: 'Uruguay',
    city: 'Montevideo',
    card: '1234 5678 9012 3456',
    month: '04',
    year: '2025',
  });

  await purchasePage.completePurchase();

  const orderText = await purchasePage.getOrderIdText();
  expect(orderText).toContain('Id');

  await purchasePage.confirmPurchase();
});

test('Test adicional - No se permite completar la compra sin ingresar datos', async ({ page }) => {
  const purchasePage = new PurchasePage(page);

  await page.goto('https://www.demoblaze.com');
  await expect(page).toHaveTitle('STORE');

  await purchasePage.clickPorduct();
  await purchasePage.addToCart();
  await purchasePage.goToCart();
  await purchasePage.placeOrder();
  await purchasePage.completePurchase();

  const modalStillOpen = await page.isVisible(purchasePage.selectors.inputName);
  expect(modalStillOpen).toBe(true);
});
