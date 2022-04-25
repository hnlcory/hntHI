import { Selector } from 'testcafe';

class FastRideFormPage {
  constructor() {
    this.pageId = '#form-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const fastRideFormPage = new FastRideFormPage();
