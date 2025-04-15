class PurchasePage {
    constructor(page) {
      this.page = page;
      this.selectors = {
        firstProduct: '.card-title a',
        btnAddToCart: 'a[onclick*="addToCart"].btn',
        cartNavigationLink: 'a#cartur',
        btnPlaceOrder: 'button[data-target="#orderModal"]',
        inputName: 'input#name',
        inputCountry: 'input#country',
        inputCity: 'input#city',
        inputMonth: 'input#month',
        inputYear: 'input#year',
        inputCard: 'input#card',
        btnPurchase: 'button[onclick="purchaseOrder()"]',
        orderIdText: 'p.lead.text-muted',
        btnOk: 'button.confirm',
      };
    }

    async addToCart() {
      await this.page.click(this.selectors.btnAddToCart);
      const dialog = await this.page.waitForEvent('dialog');
      await dialog.accept();
    }
  
    async goToCart() {
      await this.page.click(this.selectors.cartNavigationLink);
      await this.page.waitForLoadState('domcontentloaded');
    }
  
    async placeOrder() {
      await this.page.click(this.selectors.btnPlaceOrder);
    }
  
    async fillOrderForm({ name, country, city, card, month, year }) {
      await this.page.fill(this.selectors.inputName, name);
      await this.page.fill(this.selectors.inputCountry, country);
      await this.page.fill(this.selectors.inputCity, city);
      await this.page.fill(this.selectors.inputCard, card);
      await this.page.fill(this.selectors.inputMonth, month);
      await this.page.fill(this.selectors.inputYear, year);
    }

    async clickPorduct() {
        await this.page.click(this.selectors.firstProduct);
    }
  
    async completePurchase() {
      await this.page.click(this.selectors.btnPurchase);
    }
  
    async getOrderIdText() {
      return this.page.textContent(this.selectors.orderIdText);
    }
  
    async confirmPurchase() {
      await this.page.click(this.selectors.btnOk);
    }
  }
  
  module.exports = PurchasePage;
  