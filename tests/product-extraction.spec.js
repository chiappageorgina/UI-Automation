import { test, expect } from '@playwright/test';
const ProductPage = require('../pages/ProductPage');
const { saveProductsToCSV } = require('../helpers/csvHelper');
const { deleteFileIfExists, readCSV} = require('../utils/fileUtils');


test('Extraer productos de 2 páginas y guardar en CSV', async ({ page }) => {
  const csvPath = 'productos.csv';

  deleteFileIfExists(csvPath);

  await page.goto('https://www.demoblaze.com/');
  await expect(page).toHaveTitle('STORE');

  const productPage = new ProductPage(page);
  const products = await productPage.extractAllProducts();

  await saveProductsToCSV(products, csvPath);

  const csvData = readCSV(csvPath); 
  expect(csvData.length).toBeGreaterThan(1);
});

