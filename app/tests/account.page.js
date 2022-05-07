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

  //  delete Account
  async deleteAccount(testController) {
    await testController.click('#delete-button');
    await testController.click(Selector('.swal-button--confirm'));
  }

  // create Account
  async createAccount(testController) {
    await testController.click('#create-button');
  }
}

export const accountPage = new AccountPage();
