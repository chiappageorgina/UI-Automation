class ProductPage {
  constructor(page) {
    this.page = page;
    this.selectors = {
      products: '.card',
      name: '.card-title a',
      price: '.card-block h5',
      link: '.card-title a',
      nextButton: '.pagination button#next2',
    };
    this.baseURL = 'https://www.demoblaze.com'; 
  }

  async extractProductInfo() {
    await this.page.waitForSelector(this.selectors.products, { timeout: 2000 });
    const cards = await this.page.$$(this.selectors.products);
    const items = [];

    for (const card of cards) {
      const nameHandle = await card.$(this.selectors.name);
      const priceHandle = await card.$(this.selectors.price);
      const linkHandle = await card.$(this.selectors.link);

      const name = nameHandle ? await nameHandle.innerText() : '';
      const price = priceHandle ? await priceHandle.innerText() : '';
      const link = linkHandle ? await linkHandle.getAttribute('href') : '';

      const fullLink = this.baseURL + '/' + link;

      items.push({ name, price, fullLink });
      // console.log('Producto:', { name, price, fullLink });
    }

    return items;
  }

  async goToNextPage() {
    const nextButton = await this.page.$(this.selectors.nextButton);
    if (nextButton) {
      
      await nextButton.click();
    }
  }

  async extractAllProducts() {
    let allItems = [];

    let items = await this.extractProductInfo();
    allItems = allItems.concat(items);

    await this.goToNextPage();
    items = await this.extractProductInfo();
    allItems = allItems.concat(items);

   // console.log('Todos los productos extraídos:', allItems);
    return allItems;
  }
}

module.exports = ProductPage;  
