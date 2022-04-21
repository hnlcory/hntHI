import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ContactAdmin from '../components/ContactAdmin';
import { Notes } from '../../api/note/Notes';

/** Create a schema to specify the structure of the data to appear in the form. */

class FastRideFeed extends React.Component {

  note = [{
    firstName: 'Philip', lastName: 'Johnson', location: 'POST 307, University of Hawaii',
    image: 'https://philipmjohnson.github.io/images/philip2.jpeg',
    description: 'I am a Professor of Information and Computer Sciences at the University of Hawaii, Director ' +
      'of the Collaborative Software Development Laboratory, and the CEO of OpenPowerQuality.com.',
  },
  {
    firstName: 'Henri', lastName: 'Casanova', location: 'POST 307, University of Hawaii',
    image: 'https://avatars0.githubusercontent.com/u/7494478?s=460&v=4',
    description: 'I am originally from France. I maintain a list of reports from my surf sessions. I have proof ' +
        'that I ran the Hana relay with an actual Team.',
  },
  {
    firstName: 'Kim', lastName: 'Binsted', location: 'POST 307, University of Hawaii',
    image: 'https://www.ics.hawaii.edu/wp-content/uploads/2013/08/kim_binsted-square-300x300.jpg',
    description: 'Kim Binsted received her BSc in Physics at McGill (1991), and her PhD in Artificial Intelligence' +
        'from the University of Edinburgh (1996). Her thesis topic was the computational modeling and generation of ' +
        'punning riddles, and her program, JAPE (Joke Analysis and Production Engine), generated puns such as ' +
        '"What do you call a Martian who drinks beer? An ale-ien!".',
  },
  ];

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
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
