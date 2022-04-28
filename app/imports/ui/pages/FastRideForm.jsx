import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Contacts } from '../../api/contact/Contacts';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  departureTime: String,
  arrivalTime: String,
  currentLocation: String,
  endDestination: String,
  note: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class FastRideForm extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { departureTime, arrivalTime, currentLocation, endDestination, note } = data;
    const owner = Meteor.user().username;
    Contacts.collection.insert({ departureTime, arrivalTime, currentLocation, endDestination, note, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered id='form-page' style={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <Grid.Column>
          <Header as="h1" textAlign='center'>Post a Fast Ride Request!</Header>
          <Header as="h4" textAlign='center'>Complete the form if you want available Drivers to view your request in the Feed!</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField id='departure' name='departureTime'/>
              <TextField id='arrival' name='arrivalTime'/>
              <TextField id='current' name='currentLocation'/>
              <TextField id='end' name='endDestination'/>
              <TextField id='note' name='note'/>
              <SubmitField id='submit' value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default FastRideForm;
