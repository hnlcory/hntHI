import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Contacts } from '../../api/contact/Contacts';
import { Notes } from '../../api/note/Notes';

/** Create a schema to specify the structure of the data to appear in the form. */

class FastRideFeed extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" >Fast Ride Feed</Header>
        <Card.Group>
          {this.props.contacts.map((contact, index) => <Notes
            key={index}
            contact={contact}
            notes={this.props.notes.filter(note => (note.contactId === contact._id))}/>)}        </Card.Group>
      </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
FastRideFeed.propTypes = {
  contacts: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Contacts.userPublicationName);
  const subscription2 = Meteor.subscribe(Notes.userPublicationName);
  return {
    contacts: Contacts.collection.find({}).fetch(),
    notes: Notes.collection.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(FastRideFeed);
