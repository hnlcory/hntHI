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
    const departureTime = '6:00';
    const arrivalTime = '7:00';
    const startLocation = 'Honolulu';
    const endLocation = 'Mililani';
    const note = 'Lets stop for breakfast';

    // Define the new form
    await testController.typeText('#departure', departureTime);
    await testController.typeText('#arrival', arrivalTime);
    await testController.typeText('#current', startLocation);
    await testController.typeText('#end', endLocation);
    await testController.typeText('#note', note);

    await testController.click('#submit');
    await testController.click(Selector('.swal-button--confirm'));

    // check if form was added
    await navBar.gotoFeedPage(testController);
    const newCardCount = Selector('.ui .card').count;
    await testController.expect(newCardCount).gt(0);

  }
}

export const fastRideFormPage = new FastRideFormPage();
