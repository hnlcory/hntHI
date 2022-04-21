import { Selector } from 'testcafe';

class DriverSearchPage {
  constructor() {
    this.pageId = '#driver-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const driverSearchPage = new DriverSearchPage();
