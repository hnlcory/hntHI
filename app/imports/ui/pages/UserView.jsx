import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image, Segment, Header, Grid, Rating, Icon, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router-dom';
import { Users } from '../../api/users/Users';
import { UsersLocations } from '../../api/users/UsersLocations';

/** Returns the Profile and associated Projects and Interests associated with the passed user email. */
/** get email of user in users collection, find matching email in profiles collection, when found display that data */
const MakeCard = (props) => (
  <Grid centered padded style={{ paddingTop: '30px', paddingBottom: '30px' }}>
    <Grid.Row columns={2}>
      <Grid.Column>
        {props.profile.rating === 5 ? (
          <Image label={{
            as: 'a',
            color: 'green',
            content: '5 Star Rating',
            icon: 'star',
            ribbon: true,
          }} src={props.profile.profilePicture} fluid rounded />
        ) : ''}
        {props.profile.rating <= 2 && props.profile.rating !== 0 ? (
          <Image label={{
            as: 'a',
            color: 'red',
            content: 'Low Star Rating',
            icon: 'star',
            ribbon: true,
          }} src={props.profile.profilePicture} fluid rounded />
        ) : '' }
        {props.profile.rating > 2 && props.profile.rating < 5 ? (
          <Image src={props.profile.profilePicture} fluid rounded className='userImg'/>
        ) : '' }
        {props.profile.rating === 0 ? (
          <Image src={props.profile.profilePicture} fluid rounded className='userImg'/>
        ) : '' }
      </Grid.Column>
      <Grid.Column id='user-view-data-column'>
        <Header as="h2">{props.profile.firstName} {props.profile.lastName}</Header>
        <hr style={{ width: '50%', marginLeft: '0' }}/>
        <Header as="h5">{props.profile.role} Location: {_.pluck(UsersLocations.collection.find({
          profile: props.profile.email }).fetch(), 'location')}<Icon name='map pin'/></Header>
        <Header as="h5">  {props.profile.bio}</Header>
        <Header as="h4"> Arrives: {props.profile.arriveTime} | Leaves {props.profile.leaveTime}</Header>
        <Header as="h4"> Contact me: {props.profile.contact}</Header>
        <Header as="h4">Star Rating: {props.profile.rating} <Icon name='star'/></Header>
        <Rating maxRating={5} onRate={this.handleRate} />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

MakeCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

const MyAcc = (props) => (
  <Grid centered padded style={{ paddingTop: '30px', paddingBottom: '30px' }}>
    <Grid.Row columns={2}>
      <Grid.Column>
        {props.profile.rating === 5 ? (
          <Image label={{
            as: 'a',
            color: 'green',
            content: '5 Star Rating',
            icon: 'star',
            ribbon: true,
          }} src={props.profile.profilePicture} fluid rounded />
        ) : ''}
        {props.profile.rating <= 2 && props.profile.rating !== 0 ? (
          <Image label={{
            as: 'a', color: 'red', content: 'Low Star Rating', icon: 'star',
            ribbon: true,
          }} src={props.profile.profilePicture} fluid rounded />
        ) : '' }
        {props.profile.rating > 2 && props.profile.rating < 5 ? (
          <Image src={props.profile.profilePicture} fluid rounded className='userImg'/>
        ) : '' }
        {props.profile.rating === 0 ? (
          <Image src={props.profile.profilePicture} fluid rounded className='userImg'/>
        ) : '' }
      </Grid.Column>
      <Grid.Column>
        <Header as="h2">{props.profile.firstName} {props.profile.lastName}</Header>
        <hr style={{ width: '50%', marginLeft: '0' }}/>
        <Header as="h5">{props.profile.role} Location: {_.pluck(UsersLocations.collection.find({
          profile: props.profile.email }).fetch(), 'location')}<Icon name='map pin'/></Header>
        <Header as="h5">  {props.profile.bio}</Header>
        <Header as="h4"> Arrives: {props.profile.arriveTime} | Leaves {props.profile.leaveTime}</Header>
        <Header as="h4"> Contact me: {props.profile.contact}</Header>
        <Header as="h4">Star Rating: {props.profile.rating} <Icon name='star'/></Header>
        <Button basic color='blue' id='edit-button' size='tiny' as={Link} to={`/useredit/${props.profile._id}`}><Icon name='edit outline'/>
           Edit my profile</Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

MyAcc.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Renders the Profile Collection as a set of Cards. */
class UserView extends React.Component {
  handleRate = (e, { rating, maxRating }) => this.setState({ rating, maxRating })

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    // need to get id here, then can grab user data and display specfic profile
    const dataID = this.props.doc.email;
    const usrAccount = Users.collection.findOne({ email: dataID });
    const thisId = usrAccount._id;

    const usrEmail = Meteor.users.findOne({ _id: Meteor.userId() }).username;
    const myAccount = Users.collection.findOne({ email: usrEmail });
    const myId = myAccount._id;

    if ((typeof usrAccount === 'undefined' || typeof usrAccount.firstName === 'undefined') && thisId !== myId) {
      return (
        <Container id="profiles-page">
          <Header as="h1" textAlign='center'>Your Profile</Header>
          <Segment textAlign='center'>It seems you do not have a profile yet! Click
            <Link color='blue' to={`/useredit/${thisId}`}> here</Link> to create your profile.</Segment>
        </Container>
      );
    }
    if (thisId === myId) {
      return (
        <Container id="profiles-page">
          <Card.Group centered>
            <MyAcc profile={usrAccount}/>
          </Card.Group>
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
  // console.log(documentId);
  const doc = Users.collection.findOne(documentId);
  return {
    doc,
    ready: subUsers.ready() && subUserLoc.ready(),
  };
})(UserView);
