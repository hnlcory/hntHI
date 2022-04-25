import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Segment, Header, Grid, Button, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router-dom';
import { Users } from '../../api/users/Users';
import { UsersLocations } from '../../api/users/UsersLocations';

function downvUser() {
  console.log('downvote');
}

function upvUser() {
  console.log('upvote');
}

/** Returns the Profile and associated Projects and Interests associated with the passed user email. */
/** get email of user in users collection, find matching email in profiles collection, when found display that data */
const MakeCard = (props) => (
  <Grid centered padded>
    <Grid.Row columns={2}>
      <Grid.Column>
        <Image label={{
          as: 'a',
          color: 'black',
          content: '5 Star Rating',
          icon: 'star',
          ribbon: true,
        }} src={props.profile.profilePicture} fluid rounded />
      </Grid.Column>
      <Grid.Column>
        <Header as="h2">{props.profile.firstName} {props.profile.lastName}</Header>
        <Header as="h4">{props.profile.role} Location: {_.pluck(UsersLocations.collection.find({
          profile: props.profile.email }).fetch(), 'location')}<Icon name='map pin'/></Header>
        <Header as="h4">  {props.profile.bio}</Header>
        <Header as="h4"> Arrives: {props.profile.arriveTime} | Leaves {props.profile.leaveTime}</Header>
        <Header as="h4"> Contact me: {props.profile.contact}</Header>
        <Button.Group size='tiny'>
          <Button positive onClick={upvUser}><Icon name="thumbs up outline"></Icon>Upvote</Button>
          <Button onClick={downvUser}><Icon name="thumbs down outline"></Icon>Downvote</Button>
        </Button.Group>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

MakeCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Renders the Profile Collection as a set of Cards. */
class UserView extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    // need to get id here, then can grab user data and display specfic profile
    const dataID = this.props.doc.email;
    const usrAccount = Users.collection.findOne({ email: dataID });
    const myId = usrAccount._id;

    if (typeof usrAccount === 'undefined' || typeof usrAccount.firstName === 'undefined') {
      return (
        <Container id="profiles-page">
          <Header as="h1" textAlign='center'>Your Profile</Header>
          <Segment textAlign='center'>It seems you do not have a profile yet! Click
            <Link color='blue' to={`/useredit/${myId}`}> here</Link> to create your profile.</Segment>
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

UserView.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const subUsers = Meteor.subscribe(Users.userPublicationName);
  const subUserLoc = Meteor.subscribe(UsersLocations.userPublicationName);

  const documentId = match.params._id;
  const doc = Users.collection.findOne(documentId);
  return {
    doc,
    ready: subUsers.ready() && subUserLoc.ready(),
  };
})(UserView);
