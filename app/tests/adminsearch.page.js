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
}

export const adminSearchPage = new AdminSearchPage();
