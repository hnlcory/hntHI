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
import { navBar } from './navbar.component';
// import { profilesPage } from './profiles.page';
// import { projectsPage } from './projects.page';
// import { interestsPage } from './interests.page';
// import { homePage } from './home.page';
// import { addProjectPage } from './addproject.page';
// import { filterPage } from './filter.page';
// import { fastRideFeedPage } from './fastridefeed.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'kenji@gmail.com', password: 'changeme', firstName: 'Kenji', lastName: 'S' };

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
  await navBar.gotoHomePage(testController);
  await testController.click('#feed-button') // go to feed page
  await fastRideFeedPage.isDisplayed(testController);
  await navBar.gotoHomePage(testController);
  await testController.click('#edit-button'); // go to edit page
  await navBar.gotoHomePage(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// test account page displays
test('Test that account page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAccountPage(testController);
  await accountPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// test drivers page displays
test('Test that drivers page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoDriverPage(testController);
  await driverSearchPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// test riders page displays
test('Test that riders page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoRiderPage(testController);
  await riderSearchPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// test form page displays
test('Test that form page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoFormPage(testController);
  await fastRideFormPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// test feed page displays
test('Test that feed page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoFeedPage(testController);
  await fastRideFeedPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// test admin page displays
test('Test that admin page displays', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAdminPage(testController);
  await adminSearchPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

// test form page adds form correctly
test('Test that form page adds form correctly', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoFormPage(testController);
  await fastRideFormPage.addForm(testController);
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
