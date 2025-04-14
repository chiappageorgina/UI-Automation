import { test, expect } from '@playwright/test';
const PurchasePage = require('../pages/PurchasePage');

test('Usuario puede realizar una compra exitosa', async ({ page }) => {
  const purchasePage = new PurchasePage(page);

  await page.goto('https://www.demoblaze.com');
  
  await page.click(purchasePage.selectors.firstProduct);
  await page.click(purchasePage.selectors.btnAddToCart);
  await page.waitForEvent('dialog').then(dialog => dialog.accept());
 

  await page.click(purchasePage.selectors.cartNavigationLink);
  await page.waitForLoadState('domcontentloaded');

  await page.click(purchasePage.selectors.btnPlaceOrder);


  await page.fill(purchasePage.selectors.inputName, 'Georgina Chiappa');
  await page.fill(purchasePage.selectors.inputCountry, 'Uruguay');
  await page.fill(purchasePage.selectors.inputCity, 'Montevideo');
  await page.fill(purchasePage.selectors.inputCard, '1234 5678 9012 3456');
  await page.fill(purchasePage.selectors.inputMonth, '04');
  await page.fill(purchasePage.selectors.inputYear, '2025');

  await page.click(purchasePage.selectors.btnPurchase);

  const orderText = await page.locator(purchasePage.selectors.orderIdText).textContent();
  expect(orderText).toContain('Id');

  await page.click(purchasePage.selectors.btnOk);
});


//Test adicional 
test('Test adicional - No se permite completar la compra sin ingresar datos', async ({ page }) => {
    const purchasePage = new PurchasePage(page);
  
    await page.goto('https://www.demoblaze.com');
  
    await page.click(purchasePage.selectors.firstProduct);
    await page.click(purchasePage.selectors.btnAddToCart);
    await page.waitForEvent('dialog').then(dialog => dialog.accept());
  
    await page.click(purchasePage.selectors.cartNavigationLink);
    await page.click(purchasePage.selectors.btnPlaceOrder);
  
    await page.click(purchasePage.selectors.btnPurchase);
  
    const modalStillOpen = await page.isVisible(purchasePage.selectors.inputName);
    expect(modalStillOpen).toBe(true);
  });
  




