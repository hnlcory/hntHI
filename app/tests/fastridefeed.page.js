import { Selector } from 'testcafe';

class FastRideFeedPage {
  constructor() {
    this.pageId = '#feed-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const fastRideFeedPage = new FastRideFeedPage();
