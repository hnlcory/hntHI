import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Label, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';
import { Users } from '../../api/users/Users';

/** Returns the Profile and associated Projects and Interests associated with the passed user email. */

/** get email of user in users collection, find matching email in profiles collection, when found display that data */
// function getProfileData(email) {
//
//   const data = Profiles.collection.findOne({ email });
//   console.log(data);
//   const interests = _.pluck(ProfilesInterests.collection.find({ profile: email }).fetch(), 'interest');
//   const projects = _.pluck(ProfilesProjects.collection.find({ profile: email }).fetch(), 'project');
//   const projectPictures = projects.map(project => Projects.collection.findOne({ name: project }).picture);
//   // console.log(_.extend({ }, data, { interests, projects: projectPictures }));
//   return _.extend({ }, data, { interests, projects: projectPictures });
// }

/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Image floated='right' size='mini' src={props.profile.profilePicture} />
      <Card.Header>{props.profile.firstName} {props.profile.lastName}</Card.Header>
      <Card.Meta>
        <span className='date'>{props.profile.title}</span>
      </Card.Meta>
      <Card.Description>
        {props.profile.bio}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      {_.map(props.profile.interests,
        (interest, index) => <Label key={index} size='tiny' color='teal'>{interest}</Label>)}
    </Card.Content>
    <Card.Content extra>
      <Header as='h5'>Projects</Header>
      {_.map(props.profile.projects, (project, index) => <Image key={index} size='mini' src={project}/>)}
    </Card.Content>
  </Card>
);

MakeCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Renders the Profile Collection as a set of Cards. */
class ProfilesPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const usrEmail = Meteor.users.findOne({ _id: Meteor.userId() }).username;
    console.log(usrEmail);
    const usrAccount = Users.collection.findOne({ email: usrEmail });
    console.log(usrAccount);
    // const usrAccount = Meteor.user();
    // console.log(usrAccount);

    //const emails = _.pluck(Profiles.collection.find().fetch(), 'email');
    //const profileData = getProfileData(usrAccount.username);
    //console.log(profileData);

    //<MakeCard profile={profileData}/>
    return (
      <Container id="profiles-page">
        <Card.Group centered>
          <MakeCard profile={usrAccount}/>
        </Card.Group>
      </Container>
    );
  }
}

ProfilesPage.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Profiles.userPublicationName);
  const sub2 = Meteor.subscribe(ProfilesInterests.userPublicationName);
  const sub3 = Meteor.subscribe(ProfilesProjects.userPublicationName);
  const sub4 = Meteor.subscribe(Projects.userPublicationName);
  const subUsers = Meteor.subscribe(Users.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && subUsers.ready(),
  };
})(ProfilesPage);
