import React from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Users } from '../../api/users/Users';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Request extends React.Component {
  render() {
    return (
      <Feed.Event>
        <Feed.Label>
          <img src={Users.collection.findOne({ email: this.props.request.creator }).profilePicture} />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{Users.collection.findOne({ email: this.props.request.creator }).firstName} {
              Users.collection.findOne({ email: this.props.request.creator }).lastName
            }</Feed.User> requests a ride at {this.props.request.timeOfRide}.
            <Feed.Date content={this.props.request.createdAt.toLocaleDateString('en-US')} />
          </Feed.Summary>
          <Feed.Meta>
            Current Location: {this.props.request.currLocation} | Desired Destination: {this.props.request.destination}
          </Feed.Meta>
          <Feed.Extra text>
            {this.props.request.description}
          </Feed.Extra>
          <Feed.Meta>
            <Icon name='star' /> {Users.collection.findOne({ email: this.props.request.creator }).rating} |
            Contact: {Users.collection.findOne({ email: this.props.request.creator }).contact}
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

// Require a document to be passed to this component.
Request.propTypes = {
  request: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Request);
