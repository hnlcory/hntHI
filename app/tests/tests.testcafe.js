import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { signupPage } from './signup.page';
import { riderSearchPage } from './ridersearch.page';
import { driverSearchPage } from './driversearch.page';
import { adminSearchPage } from './adminsearch.page';
import { fastRideFormPage } from './fastrideform.page';
import { fastRideFeedPage } from './fastridefeed.page';
import { accountPage } from './account.page';
import { editPage } from './edit.page';
import { navBar } from './navbar.component';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'kenji@carpoolngo.com', password: 'changeme', firstName: 'Kenji', lastName: 'Sanehira' };

fixture('Bowfolios localhost test with default db')
  .page('http://localhost:3000');

// testing landing page
test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

// test signin, signout, and logout
test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// test signup
test('Test that signup page, then logout works', async (testController) => {
  // Create a new user email address that's guaranteed to be unique.
  const newUser = `user-${new Date().getTime()}@foo.com`;
  await navBar.gotoSignupPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, newUser, credentials.password);
  // New user has successfully logged in, so now let's logout.
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// test home page links
test('Test home page links work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoHomePage(testController);

  await testController.click('#pickup-button'); // go to rider page
  await riderSearchPage.isDisplayed(testController);
  await navBar.gotoHomePage(testController);
  await testController.click('#find-button'); // go to driver page
  await driverSearchPage.isDisplayed(testController);
  await navBar.gotoHomePage(testController);
  await testController.click('#form-button'); // go to form page
  await fastRideFormPage.isDisplayed(testController);
  await navBar.gotoHomePage(testController);
  await testController.click('#feed-button'); // go to feed page
  await fastRideFeedPage.isDisplayed(testController);
  await navBar.gotoHomePage(testController);
  await testController.click('#edit-button'); // go to edit page
  await navBar.gotoHomePage(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// test account page displays, account edit, account delete, and account create works
test('Test that account page displays, edit works, delete works, and create works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAccountPage(testController);
  await accountPage.isDisplayed(testController);
  await accountPage.gotoEditPage(testController);
  await editPage.editAccount(testController, credentials.firstName, 'Aiea');
  await navBar.gotoAccountPage(testController);
  await accountPage.deleteAccount(testController);
  await accountPage.createAccount(testController);
  await editPage.createAccount(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// test drivers page displays, driver page filter works, admin edit works, and admin delete works
test('Test that drivers page displays and filters, admin edit works, and admin delete works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoDriverPage(testController);
  await driverSearchPage.isDisplayed(testController);

  // test filter and admin delete
  await driverSearchPage.filter(testController, 4);
  await driverSearchPage.gotoCard(testController);
  await accountPage.deleteAccount(testController);

  // test proper delete and admin edit
  await navBar.gotoDriverPage(testController);
  await driverSearchPage.isDisplayed(testController);
  await driverSearchPage.filter(testController, 3);
  await driverSearchPage.gotoCard(testController);
  await accountPage.gotoEditPage(testController);
  await editPage.editAccount(testController, 'John', 'Kalihi');
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// test riders page displays and rider page filter works
test('Test that riders page displays and rider page filter works', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoRiderPage(testController);
  await riderSearchPage.isDisplayed(testController);
  await riderSearchPage.filter(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// test form page displays and form page adds correctly
test('Test that form page displays and form page adds correctly', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoFormPage(testController);
  // add form
  await fastRideFormPage.isDisplayed(testController);
  await fastRideFormPage.addForm(testController);
  // logout
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// test feed page displays and add timestamped note adds correctly
test('Test that feed page displays and timestamped note adds correctly', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoFeedPage(testController);
  // await fastRideFeedPage.addNote(testController); ** no longer an option
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// test admin page displays and admin page has default accounts
test('Test that admin page displays and admin page has default accounts', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAdminPage(testController);
  await adminSearchPage.isDisplayed(testController);
  await adminSearchPage.hasDefaultAccounts(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
