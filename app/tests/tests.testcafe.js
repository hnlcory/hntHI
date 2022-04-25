import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { signupPage } from './signup.page';
// import { profilesPage } from './profiles.page';
// import { projectsPage } from './projects.page';
// import { interestsPage } from './interests.page';
// import { homePage } from './home.page';
// import { addProjectPage } from './addproject.page';
// import { filterPage } from './filter.page';
import { riderSearchPage } from './ridersearch.page';
import { driverSearchPage } from './driversearch.page';
// import { fastRideFeedPage } from './fastridefeed.page';
import { fastRideFormPage } from './fastrideform.page';
import { navBar } from './navbar.component';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'johnson@hawaii.edu', password: 'foo', firstName: 'Philip', lastName: 'Johnson' };

fixture('Bowfolios localhost test with default db')
  .page('http://localhost:3000');

// Testing landing page
test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

// Test signin, signout, and logout
test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// Test signup
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

// Test home page
test('Test home page links', async (testController) => {
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
  /* NOT IMPLEMENTED
  await testController.click('#feed-button') // go to feed page
  await fastRideFeedPage.isDisplayed(testController);
  await navBar.gotoHomePage(testController);
  await testController.click('#edit-button'); // go to edit page
  await navBar.gotoHomePage(testController);
  await testController.click('#rate-button'); // go to rate page
  await navBar.gotoHomePage(testController);
  */
  // await navBar.logout(testController);
  // await signoutPage.isDisplayed(testController);
  await navBar.gotoHomePage(testController);
});

// test drivers page displays
test('Test that drivers page displays', async (testController) => {
  await navBar.gotoDriverPage(testController);
  await driverSearchPage.isDisplayed(testController);
});

// test riders page displays
test('Test that riders page displays', async (testController) => {
  await navBar.gotoRiderPage(testController);
  await riderSearchPage.isDisplayed(testController);
});

// test form page displays
test('Test that form page displays', async (testController) => {
  await navBar.gotoFormPage(testController);
  await fastRideFormPage.isDisplayed(testController);
});

/*
test('Test that profiles page displays', async (testController) => {
  await navBar.gotoProfilesPage(testController);
  await profilesPage.isDisplayed(testController);
  await profilesPage.hasDefaultProfiles(testController);
});

test('Test that interests page displays', async (testController) => {
  await navBar.gotoInterestsPage(testController);
  await interestsPage.isDisplayed(testController);
  await interestsPage.hasDefaultInterests(testController);
});

test('Test that projects page displays', async (testController) => {
  await navBar.gotoProjectsPage(testController);
  await projectsPage.isDisplayed(testController);
  await projectsPage.hasDefaultProjects(testController);
});

test('Test that home page display and profile modification works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await homePage.isDisplayed(testController);
  await homePage.updateProfile(testController, credentials.firstName);
  await navBar.ensureLogout(testController);
});

test('Test that addProject page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddProjectPage(testController);
  await addProjectPage.isDisplayed(testController);
  await addProjectPage.addProject(testController);
});

test('Test that filter page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoFilterPage(testController);
  await filterPage.isDisplayed(testController);
  await filterPage.filter(testController);
});

 */
