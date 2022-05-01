import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class FastRideFormPage {
  constructor() {
    this.pageId = '#form-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addForm(testController) {
    const time = '6:00';
    const note = "I'm hungry! Lets get some breakfast.";

    const locationSelector = Selector('#currentLocation');
    const kalihiOption = locationSelector.find('option').withText('Kalihi');
    await testController.click(locationSelector);
    await testController.click(kalihiOption);

    const destinationSelector = Selector('#desiredLocation');
    const kaneoheOption = destinationSelector.find('option').withText('Kaneohe');
    await testController.click(destinationSelector);
    await testController.click(kaneoheOption);

    // Define the new form
    await testController.typeText('#time', time);
    await testController.typeText('#note', note);

    await testController.click('#submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const fastRideFormPage = new FastRideFormPage();
