import { Selector } from 'testcafe';

class AdminSearchPage {
  constructor() {
    this.pageId = '#admin-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async hasDefaultAccounts(testController) {
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).gte(30);
  }
}

export const adminSearchPage = new AdminSearchPage();
