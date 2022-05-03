import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Segment, Grid, Header, Container, Loader } from 'semantic-ui-react';
import { AutoForm, ErrorsField, HiddenField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Requests } from '../../api/request/requests';
import { Users } from '../../api/users/Users';

const bridge = new SimpleSchema2Bridge(Requests.schema);

/** Renders the Page for adding a document. */
class FastRideForm extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { currLocation, destination, timeOfRide, description, creator, createdAt, _id } = data;
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

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const usrAccount = Users.collection.findOne({ email: Meteor.users.findOne({ _id: Meteor.userId() }).username });
    const myId = usrAccount._id;
    if (typeof usrAccount === 'undefined' || typeof usrAccount.firstName === 'undefined') {
      return (
        <Container id="form-page" style={{ paddingTop: '30px', paddingBottom: '30px' }}>
          <Header as="h1" textAlign='center'>Create a Fast Ride Request!</Header>
          <Segment textAlign='center'>Please create a profile before making a fast ride request! Click
            <Link color='blue' to={`/useredit/${myId}`}> here</Link> to create your profile.</Segment>
        </Container>
      );
    }
    let fRef = null;
    return (
      <Grid container centered id='form-page' style={{ paddingTop: '30px', paddingBottom: '30px' }}>
        <Grid.Column>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} placeholder={true}>
            <Segment>
              <Header as="h2" textAlign='center'>Create a Fast Ride Request!</Header>
              <SelectField id='currentLocation' label='Current Location' name='currLocation' allowedValues={['Aiea',
                'Ewa Beach', 'Haleiwa', 'Hauula', 'Hawaii Kai', 'Honolulu', 'Kaaawa', 'Kahala', 'Kahuku',
                'Kailua', 'Kaimuki', 'Kalihi', 'Kaneohe', 'Kapolei', 'Laie', 'Lanikai', 'Maili',
                'Makaha', 'Manoa', 'Mililani', 'Nanakuli', 'Pearl City', 'University of Hawaii at Manoa', 'Wahiawa', 'Waialua',
                'Waianae', 'Waikiki', 'Waimanalo', 'Waipahu']}/>
              <SelectField id='desiredLocation' label='Desired Destination' name='destination' allowedValues={['Aiea',
                'Ewa Beach', 'Haleiwa', 'Hauula', 'Hawaii Kai', 'Honolulu', 'Kaaawa', 'Kahala', 'Kahuku', 'Kailua', 'Kaimuki', 'Kalihi',
                'Kaneohe', 'Kapolei', 'Laie', 'Lanikai', 'Maili',
                'Makaha', 'Manoa', 'Mililani', 'Nanakuli', 'Pearl City', 'University of Hawaii at Manoa', 'Wahiawa', 'Waialua',
                'Waianae', 'Waikiki', 'Waimanalo', 'Waipahu']}/>
              <TextField id='time' label='Time of your Ride' name='timeOfRide' placeholder='7:00 am'/>
              <LongTextField id='note' label='Describe your situation' name='description' placeholder='Please help me get to ...'/>
              <SubmitField id='submit' value='Submit'/>
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

FastRideForm.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const subUsers = Meteor.subscribe(Users.userPublicationName);
  return {
    ready: subUsers.ready(),
  };
})(FastRideForm);
