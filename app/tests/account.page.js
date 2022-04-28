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

  //  go to edit page
  async gotoEditPage(testController) {
    await testController.click('#edit-button');
  }
}

export const accountPage = new AccountPage();
