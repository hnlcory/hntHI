import React from 'react';
import { Container, Grid, Header, Loader, Segment } from 'semantic-ui-react';
import swal from 'sweetalert';
import { SubmitField, AutoForm, LongTextField, TextField, SelectField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
// import { Roles } from 'meteor/alanning:roles';
// import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Users } from '../../api/users/Users';
import { UsersLocations } from '../../api/users/UsersLocations';
// import { Locations } from '../../api/locations/Locations';

const bridge = new SimpleSchema2Bridge(Users.schema);

/** Renders the Page for editing a single document. */
class AddContact extends React.Component {
  // On successful submit, insert the data.
  submit(data) {
    console.log('submit');
    const { firstName, lastName, role, profilePicture, bio, arriveTime, leaveTime, contact, email } = data;
    const profile = email;
    const _id = Users.collection.findOne({ email: profile })._id;
    console.log(_id);
    /**
    Users.collection.update(_id, { $set: { firstName, lastName, role, profilePicture, bio, arriveTime,
      leaveTime, contact } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
     */
    Users.collection.update(_id, { $addFields: { firstName, lastName, role, profilePicture, bio, arriveTime,
      leaveTime, contact } }, (error) => (error ?
      swal('Error', error.message, 'error') : swal('Success', 'Item updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    if (typeof Users.collection.findOne({ email: Meteor.users.findOne({ _id: Meteor.userId() }).username }).firstName !==
    'undefined') {
      return (
        <Container>
          <Header as="h1" textAlign='center'>Edit Profile</Header>
          <Segment textAlign='center'>You Already Have a Profile.</Segment>
        </Container>
      );
    }
    return (
      <Grid container centered>
        <Grid.Column>
          <h1> Add Profile </h1>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField name='firstName'/>
              <TextField name='lastName'/>
              <TextField name='profilePicture'/>
              <SelectField name='role' allowedValues={['Driver', 'Rider']}/>
              <LongTextField name='bio'/>
              <SelectField name='location' allowedValues={['Aiea', 'Ewa Beach', 'Haleiwa', 'Hauula', 'Hawaii Kai',
                'Honolulu', 'Kaaawa', 'Kahala', 'Kahuku', 'Kailua', 'Kaimuki', 'Kalihi', 'Kaneohe', 'Kapolei', 'Laie', 'Lanikai', 'Maili',
                'Makaha', 'Manoa', 'Mililani', 'Nanakuli', 'Pearl City', 'Wahiawa', 'Waialua', 'Waianae', 'Waikiki', 'Waimanalo', 'Waipahu']}/>
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
AddContact.propTypes = {
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
})(AddContact);
