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

  async filter(testController, n) {
    await this.isDisplayed(testController);
    // Select visualization and submit
    const locationSelector = Selector('#locations');
    const aieaOption = locationSelector.find('#Kalihi');
    await testController.click(locationSelector);
    await testController.click(aieaOption);
    await testController.click(locationSelector);
    await testController.click('#submit');
    // Check that only one card is displayed.
    const cardCount = Selector('.ui .card').count;
    await testController.expect(cardCount).lte(n);
  }
}

export const adminSearchPage = new AdminSearchPage();
