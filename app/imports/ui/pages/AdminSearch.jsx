import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Container, Loader, Card, Image, Segment, Header, Rating, Label, Icon, List } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { AutoForm, SubmitField } from 'uniforms-semantic';
import { Link } from 'react-router-dom';
import MultiSelectField from '../forms/controllers/MultiSelectField';

// Added import Statements
import { Users } from '../../api/users/Users';
import { UsersLocations } from '../../api/users/UsersLocations';
import { Locations } from '../../api/locations/Locations';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allLocations) => new SimpleSchema({
  locations: { type: Array, label: 'Locations', optional: true },
  'locations.$': { type: String, allowedValues: allLocations },
});
function getProfileData(email) {
  const data = Users.collection.findOne({ email });
  const locations = _.pluck(UsersLocations.collection.find({ profile: email }).fetch(), 'location');
  return _.extend({ }, data, locations);
}

function deleteCard(usrID) {
  // find email from id in users collection
  const usrEmail = _.pluck(Users.collection.find({ _id: usrID }).fetch(), 'email');
  // remove the added fields from user so the user is prompted to make another profile.
  Users.collection.update({ _id: usrID }, { $unset: { firstName: 1, lastName: 1,
    role: 1, profilePicture: 1, bio: 1, arriveTime: 1,
    leaveTime: 1, location: 1, contact: 1, rating: 1 } }, false, true);
  // find location id with email
  // remove from location
  const usrLocID = _.pluck(UsersLocations.collection.find({ profile: usrEmail[0] }).fetch(), '_id');
  UsersLocations.collection.remove({ _id: usrLocID[0] });
  swal('Success', 'Account Deleted Successfully', 'success');
  // setup to possibly delete the default account signing data
  // const acc = _.pluck(Users.collection.find({ username: usrEmail[0] }).fetch(), '_id');
  // console.log(acc);
}

/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
  <Card link color='green'>
    <Card.Content>
      <Image floated='right' size='tiny' circular src={props.profile.profilePicture} width='100px' className='cardImg'/>
      <Card.Header>
        <Link color='blue' to={`/userview/${props.profile._id}`}>{props.profile.firstName} {props.profile.lastName}</Link></Card.Header>
      <Card.Meta>
        {props.profile.role}
        <span className='date'> Location: {_.pluck(UsersLocations.collection.find({ profile: props.profile.email }).fetch(), 'location')}</span>
      </Card.Meta>
      <Card.Description>
        {props.profile.bio}
      </Card.Description>
      <Rating maxRating={5}/>
      <Card.Description>
        {props.profile.rating === 5 ? (
          <Label color='green' size='tiny'><Icon name='star'/>5 Star Rating</Label>) : ''}
        {props.profile.rating <= 2 && props.profile.rating !== 0 ? (
          <Label color='red' size='tiny'><Icon name='star'/>Low Star Rating</Label>) : '' }
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        Arrives: {props.profile.arriveTime} | Leaves {props.profile.leaveTime}
    </Card.Content>
    <Card.Content extra>
        Contact me: {props.profile.contact}
    </Card.Content>
    <Card.Content textAlign='center'>
      <List celled horizontal>
        <List.Item>
          <Link color='blue' to={`/useredit/${props.profile._id}`}><Icon name='edit outline'/>Edit profile</Link>
        </List.Item>
        <List.Item>
          <Link to="/adminsearch" refresh="true"><Icon color='red' name='user delete' onClick={() => deleteCard(props.profile._id)}/>
          </Link>
        </List.Item>
      </List>
    </Card.Content>
  </Card>
);

const MakeAdminCard = (props) => (
  <Card link color='blue'>
    <Card.Content>
      <Image floated='right' size='tiny' circular src={props.thatprofile.profilePicture} width='100px' className='cardImg'/>
      <Card.Header>
        <Link color='blue' to={`/userview/${props.thatprofile._id}`}>{props.thatprofile.firstName} {props.thatprofile.lastName} (You)</Link>
      </Card.Header>
      <Card.Meta>
        {props.thatprofile.role}
        <span className='date'> Location: {_.pluck(UsersLocations.collection.find({ profile: props.thatprofile.email }).fetch(), 'location')}</span>
      </Card.Meta>
      <Card.Description>
        {props.thatprofile.bio}
      </Card.Description>
      <Card.Description>
        {props.thatprofile.rating === 5 ? (
          <Label color='green' size='tiny'><Icon name='star'/>5 Star Rating</Label>) : ''}
        {props.thatprofile.rating <= 2 && props.thatprofile.rating !== 0 ? (
          <Label color='red' size='tiny'><Icon name='star'/>Low Star Rating</Label>) : '' }
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        Arrives: {props.thatprofile.arriveTime} | Leaves {props.thatprofile.leaveTime}
    </Card.Content>
    <Card.Content extra>
        Contact me: {props.thatprofile.contact}
    </Card.Content>
    <Card.Content textAlign='center'>
      <Link color='blue' to={`/useredit/${props.thatprofile._id}`}><Icon name='edit outline'/>Edit my profile</Link>
    </Card.Content>
  </Card>
);

/** Properties */
MakeCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

MakeAdminCard.propTypes = {
  thatprofile: PropTypes.object.isRequired,
};

/** Renders the Profile Collection as a set of Cards. */
class AdminSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = { locations: [] };
  }

  submit(data) {
    this.setState({ locations: data.locations || [] });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const allLocations = _.pluck(Locations.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allLocations);
    const bridge = new SimpleSchema2Bridge(formSchema);
    const emails = _.pluck(UsersLocations.collection.find({ location: { $in: this.state.locations } }).fetch(), 'profile');
    const profileData = _.uniq(emails).map(email => getProfileData(email));
    if (emails.length === 0) {
      const emailsAll = _.pluck(UsersLocations.collection.find().fetch(), 'profile');
      const profileDataAll = emailsAll.map(email => getProfileData(email));
      // console.log(profileDataAll);
      return (
        <Container id="admin-page" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
          <Header as="h1" textAlign='center' color='red' style={{ fontFamily: 'Barlow' }}>Admin Overview</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
            <Segment>
              <MultiSelectField id='locations' name='locations' showInlineError={true} placeholder={'Filter Users by Location'}/>
              <SubmitField id='submit' value='Submit'/>
            </Segment>
          </AutoForm>
          <Header as="h3" textAlign='center' style={{ fontFamily: 'Barlow' }}>All Driver/Rider Accounts</Header>
          <Card.Group style={{ paddingTop: '15px' }} centered>

            {_.map(profileDataAll, function (profile, index) {
              if (profile.email === Meteor.users.findOne({ _id: Meteor.userId() }).username) {
                return <MakeAdminCard key={index} thatprofile={profile}/>;
              }
              return <MakeCard key={index} profile={profile}/>;
            })}
          </Card.Group>
        </Container>
      );
    }
    return (
      <Container id="admin-page" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <Header as="h1" textAlign='center' color='red' style={{ fontFamily: 'Barlow' }}>Admin Overview</Header>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
          <Segment>
            <MultiSelectField id='locations' name='locations' showInlineError={true} placeholder={'Locations'}/>
            <SubmitField id='submit' value='Submit'/>
          </Segment>
        </AutoForm>
        <Header as="h3" textAlign='center' style={{ fontFamily: 'Barlow' }}>Accounts Matching Criteria</Header>
        <Card.Group style={{ paddingTop: '10px' }} centered>
          {_.map(profileData, (profile, index) => <MakeCard key={index} profile={profile}/>)}
        </Card.Group>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
AdminSearch.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Users.userPublicationName);
  const sub2 = Meteor.subscribe(UsersLocations.userPublicationName);
  const sub3 = Meteor.subscribe(Locations.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(AdminSearch);
