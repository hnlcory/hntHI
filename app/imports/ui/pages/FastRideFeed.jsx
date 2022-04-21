import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import ContactAdmin from '../components/ContactAdmin';
import { Notes } from '../../api/note/Notes';
import { Locations } from '../../api/locations/Locations';
import { UsersLocations } from '../../api/users/UsersLocations';
import { Users } from '../../api/users/Users';

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
/** Create a schema to specify the structure of the data to appear in the form. */

class FastRideFeed extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const allLocations = _.pluck(Locations.collection.find().fetch(), 'name');
    const formSchema = makeSchema(allLocations);
    const bridge = new SimpleSchema2Bridge(formSchema);
    const emails = _.pluck(UsersLocations.collection.find({ location: { $in: this.state.locations }, role: 'Rider' }).fetch(), 'profile');
    const profileData = _.uniq(emails).map(email => getProfileData(email));
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>Fast Ride Feed</Header>
        <Card.Group>
          {this.props.notes.map((note, index) => <ContactAdmin key={index} note={note} />)}
        </Card.Group>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
FastRideFeed.propTypes = {
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Notes.userPublicationName);
  return {
    notes: Notes.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(FastRideFeed);
