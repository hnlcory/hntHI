import React from 'react';
import { Grid, Loader, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { SubmitField, AutoForm, LongTextField, TextField, SelectField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Users } from '../../api/users/Users';
import { UsersLocations } from '../../api/users/UsersLocations';

const bridge = new SimpleSchema2Bridge(Users.schema);

/** Renders the Page for editing a single document. */
class EditContact extends React.Component {

  sub(thisId, role, location) {
    const _id = thisId[0];
    UsersLocations.collection.update(_id, { $set: { role, location } });
  }

  /** Update locations Collection (Has No Effect if Location already Exists)
  addLocation(location) {
    Locations.collection.update({ name: location }, { $set: { name: location } }, { upsert: true });
  }
  */
  // On successful submit, insert the data.
  submit(data) {
    const { firstName, lastName, role, profilePicture, bio, arriveTime, leaveTime, contact, _id, email, location } = data;
    const thisId = _.pluck(UsersLocations.collection.find({ profile: email }).fetch(), '_id');
    this.sub(thisId, role, location);
    Users.collection.update(_id, { $set: { firstName, lastName, role, profilePicture, bio, arriveTime,
      leaveTime, contact, _id } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered>
        <Grid.Column>
          <h1> Edit Profile </h1>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField name='firstName'/>
              <TextField name='lastName'/>
              <TextField name='profilePicture'/>
              <SelectField name='role' allowedValues={['Driver', 'Rider']}/>
              <LongTextField name='bio'/>
              <TextField name='location'/>
              <TextField name='arriveTime'/>
              <TextField name='leaveTime'/>
              <TextField name='contact'/>
              <SubmitField name='Submit'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditContact.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  const sub2 = Meteor.subscribe(UsersLocations.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && sub2.ready();
  // Get the document
  const doc = Users.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditContact);
