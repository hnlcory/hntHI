import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class User extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='small'
            src={this.props.user.profilePicture}
            width={'200px'}
            rounded
          />
          <Card.Header>{this.props.user.firstName} {this.props.user.lastName}</Card.Header>
          <Card.Meta>Arrival: {this.props.user.arriveTime}, Leave: {this.props.user.leaveTime}</Card.Meta>
          <Card.Description>{this.props.user.bio}</Card.Description>
        </Card.Content>
        <Card.Content>
          {this.props.user.contact}
        </Card.Content>
      </Card>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
};

export default withRouter(User);
