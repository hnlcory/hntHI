import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Projects } from '../../api/projects/Projects';
import { ProjectsInterests } from '../../api/projects/ProjectsInterests';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { Interests } from '../../api/interests/Interests';
// Added the Following Insert
import { Users } from '../../api/users/Users';
import { Locations } from '../../api/locations/Locations';
import { UsersLocations } from '../../api/users/UsersLocations';

/* eslint-disable no-console */

/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */
function createUser(email, role) {
  const userID = Accounts.createUser({ username: email, email, password: 'foo' });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** Define an interest.  Has no effect if interest already exists. */
function addInterest(interest) {
  Interests.collection.update({ name: interest }, { $set: { name: interest } }, { upsert: true });
}

/** Define a location. Has no effect if the location already exists. */
function addLocation(location) {
  Locations.collection.update({ name: location }, { $set: { name: location } }, { upsert: true });
}

/** Defines a new user and associated profile. Error if user already exists. */
function addProfile({ firstName, lastName, bio, title, interests, projects, picture, email, role }) {
  console.log(`Defining profile ${email}`);
  // Define the user in the Meteor accounts package.
  createUser(email, role);
  // Create the profile.
  Profiles.collection.insert({ firstName, lastName, bio, title, picture, email });
  // Add interests and projects.
  interests.map(interest => ProfilesInterests.collection.insert({ profile: email, interest }));
  projects.map(project => ProfilesProjects.collection.insert({ profile: email, project }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  interests.map(interest => addInterest(interest));
}

/** Define a new project. Error if project already exists.  */
function addProject({ name, homepage, description, interests, picture }) {
  console.log(`Defining project ${name}`);
  Projects.collection.insert({ name, homepage, description, picture });
  interests.map(interest => ProjectsInterests.collection.insert({ project: name, interest }));
  // Make sure interests are defined in the Interests collection if they weren't already.
  interests.map(interest => addInterest(interest));
}

// Define a new user. Error if user already exists. (ADDED)
function addUser({ email, firstName, lastName, role, profilePicture, locations, bio, arriveTime, leaveTime, contact }) {
  console.log(`Defining user ${firstName}`);
  Users.collection.insert({ email, firstName, lastName, role, profilePicture, bio, arriveTime, leaveTime, contact });
  locations.map(location => UsersLocations.collection.insert({ profile: email, location }));
  // Make sure locations are defined in the Location collection if they weren't already.
  locations.map(location => addLocation(location));
}

/** Initialize DB if it appears to be empty (i.e. no users defined.) */
if (Meteor.users.find().count() === 0) {
  // Added Meteor.settings.defaultUsers
  if (Meteor.settings.defaultProjects && Meteor.settings.defaultProfiles && Meteor.settings.defaultUsers) {
    console.log('Creating the default profiles');
    Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
    console.log('Creating the default projects');
    Meteor.settings.defaultProjects.map(project => addProject(project));
    // Added users section to be created
    console.log('Creating the default projects');
    Meteor.settings.defaultUsers.map(user => addUser(user));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

/**
 * If the loadAssetsFile field in settings.development.json is true, then load the data in private/data.json.
 * This approach allows you to initialize your system with large amounts of data.
 * Note that settings.development.json is limited to 64,000 characters.
 * We use the "Assets" capability in Meteor.
 * For more info on assets, see https://docs.meteor.com/api/assets.html
 * User count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
 */
if ((Meteor.settings.loadAssetsFile) && (Meteor.users.find().count() < 7)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.profiles.map(profile => addProfile(profile));
  jsonData.projects.map(project => addProject(project));
}
