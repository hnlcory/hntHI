import { Selector } from 'testcafe';

class RiderSearchPage {
  constructor() {
    this.pageId = '#rider-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const riderSearchPage = new RiderSearchPage();
