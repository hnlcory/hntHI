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

  async filter(testController) {
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
    await testController.expect(cardCount).eql(4);
    await testController.click('#idLink');
  }
}

export const driverSearchPage = new DriverSearchPage();
