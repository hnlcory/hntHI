import { Selector } from 'testcafe';

class EditPage {
  constructor() {
    this.pageId = '#edit-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async editAccount(testController, firstName) {
    const newFirstName = 'New First Name';
    await this.isDisplayed(testController);
    // Delete text from first name field.
    await testController.selectText('#firstName').pressKey('delete');
    // Type in new first name.
    await testController.typeText('#firstName', newFirstName);
    // Type in location **required**
    const locationSelector = Selector('#location');
    const aieaOption = locationSelector.find('#Aiea');
    await testController.click(locationSelector);
    await testController.click(aieaOption);
    // await testController.click(locationSelector);
    // Submit it.
    await testController.click('#submit');
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
    // Check that the field is updated.
    await testController.expect(Selector('#firstName').value).eql(newFirstName);
    // Now restore original value.
    await testController.selectText('#firstName').pressKey('delete');
    await testController.typeText('#firstName', firstName);
    await testController.click('#submit');
    await testController.click(Selector('.swal-button--confirm'));
    await testController.expect(Selector('#firstName').value).eql(firstName);
  }
}

export const editPage = new EditPage();
