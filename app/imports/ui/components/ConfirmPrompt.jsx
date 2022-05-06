import React, { Component } from 'react';
import { Confirm, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { Users } from '../../api/users/Users';
import { UsersLocations } from '../../api/users/UsersLocations';

function deleteCard(usrID) {
  // find email from id in users collection
  const usrEmail = _.pluck(Users.collection.find({ _id: usrID }).fetch(), 'email');
  // remove the added fields from user so the user is prompted to make another profile.
  Users.collection.update({ _id: usrID }, { $unset: { firstName: 1, lastName: 1,
    role: 1, profilePicture: 1, bio: 1, arriveTime: 1, leaveTime: 1, location: 1, contact: 1, rating: 1 } }, false, true);
  // find location id with email
  // remove from location
  const usrLocID = _.pluck(UsersLocations.collection.find({ profile: usrEmail[0] }).fetch(), '_id');
  UsersLocations.collection.remove({ _id: usrLocID[0] });
  this.location.reload();
  swal('Success', 'Account Deleted Successfully', 'success');
}

class ConfirmPrompt extends Component {

  state = { open: false }

  show = () => this.setState({ open: true })

  handleConfirm = () => {
    deleteCard(this.props.id);
    this.setState({ open: false });
  }

  handleCancel = () => this.setState({ open: false })

  render() {
    return (
      <div>
        <Link to="/adminsearch"><Icon color='red' name='user delete' onClick={this.show} /></Link>
        <Confirm
          open={this.state.open}
          content='Are you sure you want to delete this profile?'
          cancelButton='Never mind'
          confirmButton="Delete this profile"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    );
  }
}

ConfirmPrompt.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ConfirmPrompt;
