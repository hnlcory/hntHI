import React, { Component } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router-dom';
import { Users } from '../../api/users/Users';
import { UsersLocations } from '../../api/users/UsersLocations';

function deleteCard(usrID) {
  // find email from id in users collection
  const usrEmail = _.pluck(Users.collection.find({ _id: usrID }).fetch(), 'email');
  // remove from user
  Users.collection.remove({ _id: usrID });
  // find location id with email
  // remove from location
  const usrLocID = _.pluck(UsersLocations.collection.find({ profile: usrEmail[0] }).fetch(), '_id');
  UsersLocations.collection.remove({ _id: usrLocID[0] });
  swal('Success', 'Account Deleted Successfully', 'success');
  // setup to possibly delete the default account signing data
  // const acc = _.pluck(Users.collection.find({ username: usrEmail[0] }).fetch(), '_id');
  // console.log(acc);
}

class ConfirmPrompt extends Component {
  state = { open: false }

  show = () => this.setState({ open: true })

  handleConfirm = () => this.setState({ open: false })

  handleCancel = () => this.setState({ open: false })

  render() {
    return (
      <div>
        <Button onClick={this.show} color='red'><Icon name='user delete' color='yellow'/>Delete profile</Button>
        <Confirm
          open={this.state.open}
          cancelButton='Never mind'
          confirmButton="Let's do it"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    );
  }
}

export default ConfirmPrompt;
