import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Users } from '../../api/users/Users';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Request extends React.Component {
  displayRating(usrID) {
    const acc = Users.collection.findOne({ _id: usrID });
    console.log(acc);
    // const mappedRating = Users.collection.findOne({ _id: usrID }).rating.reduce((add, a) => add + a, 0) /
    // Users.collection.findOne({ _id: usrID }).rating.length;
    const mappedRating = 2;
    return mappedRating.toFixed(2);
  }

  render() {
    return (
      <Feed.Event>
        <Feed.Label>
          <img src={Users.collection.findOne({ email: this.props.request.creator }).profilePicture} />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Link color='blue' to={`/userview/${Users.collection.findOne({ email: this.props.request.creator })._id}`}>
              {Users.collection.findOne({ email: this.props.request.creator }).firstName} {
                Users.collection.findOne({ email: this.props.request.creator }).lastName
              }</Link> requests a ride at {this.props.request.timeOfRide}.
            <Feed.Date content={this.props.request.createdAt.toLocaleDateString('en-US')} />
          </Feed.Summary>
          <Feed.Meta>
            Current Location: {this.props.request.currLocation} | Desired Destination: {this.props.request.destination}
          </Feed.Meta>
          <Feed.Extra text>
            {this.props.request.description}
          </Feed.Extra>
          <Feed.Meta>
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

/** Add later if there is time
 * {this.displayRating((Users.collection.findOne({ email: this.props.request.creator })._id) > 1) ||
 *           this.displayRating((Users.collection.findOne({ email: this.props.request.creator })._id) < 1) ? (
 *               <Feed.Meta>
 *                 <Icon name='star' /> {this.displayRating(Users.collection.findOne({ email: this.props.request.creator })._id)} stars |
 *                 Contact: {Users.collection.findOne({ email: this.props.request.creator }).contact}
 *               </Feed.Meta>
 *             ) :
 *             <Feed.Meta>
 *               <Icon name='star' /> {Users.collection.findOne({ email: this.props.request.creator }).rating} star |
 *               Contact: {Users.collection.findOne({ email: this.props.request.creator }).contact}
 *             </Feed.Meta>
 *           }
 */

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Request);
