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

  async editAccount(testController, firstName, location) {
    const newFirstName = 'New First Name';
    await this.isDisplayed(testController);
    // Delete text from first name field.
    await testController.selectText('#firstName').pressKey('delete');
    // Type in new first name.
    await testController.typeText('#firstName', newFirstName);
    // Type in Location ** necessary for now **
    const locationSelector = Selector('#location');
    const aieaOption = locationSelector.find('option').withText(location);
    await testController.click(locationSelector);
    await testController.click(aieaOption);
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

  async createAccount(testController) {
    const firstName = 'Kenji';
    const lastName = 'Sanehira';
    const profilePic = 'https://media-exp1.licdn.com/dms/image/C4E03AQHtE4-xdCJ0Og/profile-displayphoto-shrink_200_200/0/1642016969608?e=1657152000&v=beta&t=GMaX2xHydovBrCkD25GBJh5niEj-Nmr5DESrUSluo-M';
    const bio = 'Computer Science Student';
    const arriveTime = '11:00 am';
    const leaveTime = '1:20 pm';
    const contact = '808-325-3432';

    // Type in new first name.
    await testController.typeText('#firstName', firstName);
    await testController.typeText('#lastName', lastName);
    await testController.typeText('#profilePic', profilePic);
    await testController.typeText('#bio', bio);
    await testController.typeText('#arriveTime', arriveTime);
    await testController.typeText('#leaveTime', leaveTime);
    await testController.typeText('#contact', contact);
    // Type in Role
    const roleSelector = Selector('#role');
    const riderOption = roleSelector.find('option').withText('Rider');
    await testController.click(roleSelector);
    await testController.click(riderOption);
    // Type in Location
    const locationSelector = Selector('#location');
    const aieaOption = locationSelector.find('option').withText('Honolulu');
    await testController.click(locationSelector);
    await testController.click(aieaOption);
    // Submit it.
    await testController.click('#submit');
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
    // Check that the fields are updated.
    await testController.expect(Selector('#firstName').value).eql(firstName);
    await testController.expect(Selector('#lastName').value).eql(lastName);
    await testController.expect(Selector('#bio').value).eql(bio);
    await testController.expect(Selector('#arriveTime').value).eql(arriveTime);
    await testController.expect(Selector('#leaveTime').value).eql(leaveTime);
    await testController.expect(Selector('#contact').value).eql(contact);
  }
}

export const editPage = new EditPage();
