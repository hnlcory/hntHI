import { Selector } from 'testcafe';

class AccountPage {
  constructor() {
    this.pageId = '#account-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const accountPage = new AccountPage();
