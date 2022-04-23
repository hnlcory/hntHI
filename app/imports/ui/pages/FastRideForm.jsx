import React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';
import { SubmitField, TextField, LongTextField, AutoForm } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { withRouter } from 'react-router-dom';
import { Notes } from '../../api/note/Notes';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  location: String,
  image: String,
  description: String,
  arrives: String,
  leaves: String,
  contact: String,
  note: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class FastRideForm extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { firstName, lastName, location, image, description, arrives, leaves, contact, note } = data;
    const owner = Meteor.user().username;
    Notes.collection.insert({ firstName, lastName, location, image, description, arrives, leaves, contact, note, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Request added successfully to Feed', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Container id="filter-page">
        <Header as="h1" textAlign='center'>Post a Fast Ride Request!</Header>
        <Header as="h4" textAlign='center'>Complete the form if you want available Drivers to view your request in the Feed!</Header>
        <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
          <Segment>
            <TextField name='firstName'/>
            <TextField name='lastName'/>
            <TextField name='location'/>
            <TextField name='image'/>
            <LongTextField name='description'/>
            <TextField name='arrives'/>
            <TextField name='leaves'/>
            <TextField name='contact'/>
            <TextField name='note'/>
            <SubmitField value='Submit'/>
          </Segment>
        </AutoForm>
      </Container>
    );
  }
}

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(FastRideForm);
