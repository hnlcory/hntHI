import React from 'react';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Container, Loader, Card, Image, Segment, Header, Label, Icon } from 'semantic-ui-react';
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

/** Component for layout out a Profile Card. */
const MakeCard = (props) => (
  <Card color='green'>
    <Card.Content>
      <Image floated='right' size='tiny' circular src={props.profile.profilePicture} width='100px' className='cardImg'/>
      <Card.Header>
        <Link color='blue' to={`/userview/${props.profile._id}`}>{props.profile.firstName} {props.profile.lastName}</Link></Card.Header>
      <Card.Meta>
        <span className='date'> Location: {_.pluck(UsersLocations.collection.find({ profile: props.profile.email }).fetch(), 'location')}</span>
      </Card.Meta>
      <Card.Description>
        {props.profile.bio}
      </Card.Description>
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
  </Card>

);

/** Properties */
MakeCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Component for a different Card format that shows the user as their own profile. */
const MakeUPCard = (props) => (
  <Card color='blue'>
    <Card.Content>
      <Image floated='right' size='tiny' circular src={props.thatprofile.profilePicture} width='100px' className='cardImg'/>
      <Card.Header>
        <Link color='blue' to={`/userview/${props.thatprofile._id}`}>{props.thatprofile.firstName} {props.thatprofile.lastName} (You)</Link>
      </Card.Header>
      <Card.Meta>
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
MakeUPCard.propTypes = {
  thatprofile: PropTypes.object.isRequired,
};
/** Renders the Profile Collection as a set of Cards. */
class RiderSearch extends React.Component {

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
    const emails = _.pluck(UsersLocations.collection.find({ location: { $in: this.state.locations }, role: 'Rider' }).fetch(), 'profile');
    const profileData = _.uniq(emails).map(email => getProfileData(email));
    if (emails.length === 0) {
      return (
        <Container id="rider-page" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
          <Header as="h1" textAlign='center'>Search for Riders in your Area!</Header>
          <Header as="h4" textAlign='center'>Browse through a list of riders or search by location!</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
            <Segment>
              <MultiSelectField id='locations' name='locations' showInlineError={true} placeholder={'Locations'}/>
              <SubmitField id='submit' value='Submit'/>
            </Segment>
          </AutoForm>
          <Header sub textAlign='center'>If there are no riders in your specified area, consider checking the
            <Link to='/fastridefeed'> FastRide Feed.</Link></Header>
        </Container>
      );
    }
    return (
      <Container id="rider-page">
        <Header as="h1" textAlign='center'>Search for Riders in your Area!</Header>
        <Header as="h4" textAlign='center'>Browse through a list of riders or search by location!</Header>
        <AutoForm schema={bridge} onSubmit={data => this.submit(data)} >
          <Segment>
            <MultiSelectField id='locations' name='locations' showInlineError={true} placeholder={'Locations'}/>
            <SubmitField id='submit' value='Submit'/>
          </Segment>
        </AutoForm>
        <Card.Group style={{ paddingTop: '10px' }} centered>
          {_.map(profileData, function (profile, index) {
            if (profile.email === Meteor.users.findOne({ _id: Meteor.userId() }).username) {
              return <MakeUPCard key={index} thatprofile={profile}/>;
            }
            return <MakeCard key={index} profile={profile}/>;
          })}
        </Card.Group>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
RiderSearch.propTypes = {
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
})(RiderSearch);
