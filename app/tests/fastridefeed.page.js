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

  async addNote(testController) {
    const note = "I'll cover breakfast!"
    await this.isDisplayed(testController);

    // Define the new project
    await testController.typeText('#note', note);

    await testController.click('#submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const fastRideFeedPage = new FastRideFeedPage();
