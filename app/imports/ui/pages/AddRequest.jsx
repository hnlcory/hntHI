import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Segment, Grid, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Requests } from '../../api/request/requests';

const bridge = new SimpleSchema2Bridge(Requests.schema);

/** Renders the Page for adding a document. */
class AddRequest extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { currLocation, destination, timeOfRide, description, creator, createdAt, _id } = data;
    console.log(creator);
    Requests.collection.insert({ currLocation, destination, timeOfRide, description, creator, createdAt, _id },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Fast Ride Request Added!', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <h1> Fast Ride Request Form </h1>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <Header as="h2" textAlign='center'>Create a Fast Ride Request!</Header>
              <SelectField label='Current Location' name='currLocation' allowedValues={['Aiea', 'Ewa Beach', 'Haleiwa', 'Hauula', 'Hawaii Kai',
                'Honolulu', 'Kaaawa', 'Kahala', 'Kahuku', 'Kailua', 'Kaimuki', 'Kalihi', 'Kaneohe', 'Kapolei', 'Laie', 'Lanikai', 'Maili',
                'Makaha', 'Manoa', 'Mililani', 'Nanakuli', 'Pearl City', 'University of Hawaii at Manoa', 'Wahiawa', 'Waialua',
                'Waianae', 'Waikiki', 'Waimanalo', 'Waipahu']}/>
              <SelectField label='Desired Destination' name='destination' allowedValues={['Aiea', 'Ewa Beach', 'Haleiwa', 'Hauula', 'Hawaii Kai',
                'Honolulu', 'Kaaawa', 'Kahala', 'Kahuku', 'Kailua', 'Kaimuki', 'Kalihi', 'Kaneohe', 'Kapolei', 'Laie', 'Lanikai', 'Maili',
                'Makaha', 'Manoa', 'Mililani', 'Nanakuli', 'Pearl City', 'University of Hawaii at Manoa', 'Wahiawa', 'Waialua',
                'Waianae', 'Waikiki', 'Waimanalo', 'Waipahu']}/>
              <TextField label='Time of your Ride' name='timeOfRide'/>
              <LongTextField label='Describe your situation' name='description'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
              <HiddenField name='creator' value={Meteor.users.findOne({ _id: Meteor.userId() }).username}/>
              <HiddenField name='createdAt' value={new Date()}/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddRequest;
