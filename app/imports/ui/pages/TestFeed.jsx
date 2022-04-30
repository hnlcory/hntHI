import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Feed, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Users } from '../../api/users/Users';
import { Requests } from '../../api/request/requests';
import Request from '../components/Request';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class TestFeed extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    if (this.props.requests.length === 0) {
      return (
        <Container id='feed-page'>
          <Header as="h1" textAlign='center'>Fast Ride Feed</Header>
          <Segment textAlign='center'>
            <p>Oops! There are no current fast ride requests.</p>
            <p>Want to fill out a fast ride form? <Link color='blue' to={'/fastrideform'}>Click here!</Link></p>
          </Segment>
        </Container>
      );
    }
    return (
      <Container id='feed-page'>
        <Header as="h2" textAlign="center">Fast Ride Feed</Header>
        <Feed>
          {this.props.requests.map((request) => <Request key={request._id}
            request={request}/>)}
        </Feed>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
TestFeed.propTypes = {
  users: PropTypes.array.isRequired,
  requests: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  const subscription2 = Meteor.subscribe(Requests.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const users = Users.collection.find({}).fetch();
  const requests = Requests.collection.find({}).fetch();
  return {
    users,
    requests,
    ready,
  };
})(TestFeed);
