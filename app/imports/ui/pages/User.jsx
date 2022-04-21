import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Segment, Header, Grid, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router-dom';
import { Profiles } from '../../api/profiles/Profiles';
import { ProfilesInterests } from '../../api/profiles/ProfilesInterests';
import { ProfilesProjects } from '../../api/profiles/ProfilesProjects';
import { Projects } from '../../api/projects/Projects';
import { Users } from '../../api/users/Users';
import { UsersLocations } from '../../api/users/UsersLocations';

/** Returns the Profile and associated Projects and Interests associated with the passed user email. */
/** get email of user in users collection, find matching email in profiles collection, when found display that data */
const MakeCard = (props) => (
  /**
  <Card color='green'>
    <Image src={props.profile.profilePicture} wrapped ui={false}/>
    <Card.Content>
      <Card.Header>{props.profile.firstName} {props.profile.lastName}</Card.Header>
      <Card.Meta>
        {props.profile.role}
        &nbsp;Location: {_.pluck(UsersLocations.collection.find({ profile: props.profile.email }).fetch(), 'location')}
      </Card.Meta>
      <Card.Description>
        {props.profile.bio}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        Arrives: {props.profile.arriveTime} | Leaves {props.profile.leaveTime}
    </Card.Content>
    <Card.Content extra>
        Contact me: {props.profile.contact}
    </Card.Content>
    <Card.Content textAlign='center'>
      <Link color='blue' to={`/useredit/${props.profile._id}`}>Edit my profile</Link>
    </Card.Content>
  </Card>
  * */
  <Grid centered padded>
    <Grid.Row columns={2}>
      <Grid.Column>
        <Image src={props.profile.profilePicture} size='large' rounded />
      </Grid.Column>
      <Grid.Column>
        <Header as="h2">{props.profile.firstName} {props.profile.lastName}</Header>
        <Header as="h4">{props.profile.role} Location: {_.pluck(UsersLocations.collection.find({
          profile: props.profile.email }).fetch(), 'location')}<Icon name='map pin'/></Header>
        <Header as="h4">  {props.profile.bio}</Header>
        <Header as="h4"> Arrives: {props.profile.arriveTime} | Leaves {props.profile.leaveTime}</Header>
        <Header as="h4"> Contact me: {props.profile.contact}</Header>
        <Link color='blue' to={`/useredit/${props.profile._id}`}>Edit my profile</Link>
      </Grid.Column>
    </Grid.Row>
  </Grid>
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
    const usrAccount = Users.collection.findOne({ email: usrEmail });
    // console.log(usrEmail);
    // console.log(usrAccount);

    if (typeof usrAccount === 'undefined' || typeof usrAccount.firstName === 'undefined') {
      return (
        <Container id="profiles-page">
          <Header as="h1" textAlign='center'>Your Profile</Header>
          <Segment textAlign='center'>It seems you do not have a profile yet! Click here to create your profile.</Segment>
        </Container>
      );
    }
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
  const subUserLoc = Meteor.subscribe(UsersLocations.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && subUsers.ready() && subUserLoc.ready(),
  };
})(ProfilesPage);
