import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Button, Container, Grid, Header, Image, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Users } from '../../api/users/Users';

class HomeDR extends React.Component {
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const usrEmail = Meteor.users.findOne({ _id: Meteor.userId() }).username;
    const usrAccount = Users.collection.findOne({ email: usrEmail });
    const myId = usrAccount._id;
    return (
      <div id="welcome-home">
        <div className='landing-picture-background'>
          <Container textAlign='center' style={{ paddingTop: '20px' }}>
            <Image src='/images/logov1.jpeg' size='small' centered circular/>
            <Header style={{ color: 'white', fontSize: '50pt', paddingTop: '10px', fontFamily: 'Barlow' }} as='h1'>
              Where Shall We Go Today?
            </Header>
            <Header style={{ paddingBottom: '30px', color: 'white', fontSize: '25pt', fontFamily: 'Barlow' }} as='h3'>
              <br/>
            </Header>
          </Container>
        </div>
        <div className='landing-green-background'>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column>
              <Header style={{ color: 'white', fontSize: '40pt', paddingTop: '10px', fontFamily: 'Barlow' }} as='h2'>
                Looking to Drive?
              </Header>
              <Image size='huge' src="/images/driver.jpeg"/>
            </Grid.Column>
            <Grid.Column style={{ paddingTop: '10px' }}>
              <Header style={{ color: 'white', paddingTop: '40px', fontFamily: 'Barlow' }} as='h3'>
                UH Carpool and Go offers a safe space to give drivers the chance to offer rides to those in need.
                Look for possible riders in your area
              </Header>
              <Button id='pickup-button' color='olive' as={Link} to='/riderssearch' size='large'>Find Riders</Button>
              <Header style={{ color: 'white', paddingTop: '25px', fontFamily: 'Barlow' }} as='h3'>
                As a driver, it is important to keep all of your driver information up to date in your profile.
                You can make sure everything is correct here:
              </Header>
              <Button id='edit-button' color='olive' as={Link} to={`/useredit/${myId}`} size='large' >Edit My Profile</Button>
            </Grid.Column>
          </Grid>
        </div>
        <div className='landing-person-background'>
          <Container textAlign='center'>
            <Header style={{ color: 'white', fontSize: '50pt', paddingTop: '50px', fontFamily: 'Barlow' }} as='h1'>
              The Fast Ride Way
            </Header>
            <Header style={{ paddingTop: '50px', paddingBottom: '70px', color: 'white', fontSize: '28t', fontFamily: 'Barlow' }} as='h3'>
              Need a ride on short notice? Got some time and can offer someone a ride? The Fast Ride is a form feed allows
              both riders and drivers to see a real-time chat for those needing to get somewhere soon. <br/><br/>
              <Button.Group size='large'>
                <Button id='feed-button' color='olive' as={Link} to='/fastridefeed'>Check the Feed</Button>
                <Button.Or />
                <Button id='form-button' as={Link} to='/fastrideform'>Create a Request Form</Button>
              </Button.Group>
            </Header>
          </Container>
        </div>
        <div className='landing-white-background'>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column style={{ paddingTop: '10px' }}>
              <Header style={{ color: 'green', paddingTop: '40px', fontFamily: 'Barlow' }} as='h3'>
                Need a ride to school? Students and staff can use Carpool and Go! to find drivers nearby their locations.
                Find those near you now:
              </Header>
              <Button id='find-button' color='olive' as={Link} to='/driverssearch' size='large'>Find a Ride</Button>
              <Header style={{ color: 'green', paddingTop: '25px', fontFamily: 'Barlow' }} as='h3'>
                As a rider, it is important to keep other riders updated on which drivers have offered good services! We strive to create
                a community of safe drivers and allow riders ways to commute with ease of worry. Been on a ride recently? Rate them here:
              </Header>
              <Button id='rate-button' color='olive' as={Link} to='/driverssearch' size='large'>Rate a User</Button>
            </Grid.Column>
            <Grid.Column>
              <Header style={{ color: 'green', fontSize: '40pt', paddingTop: '10px', fontFamily: 'Barlow' }} as='h2'>
                Looking to Ride?
              </Header>
              <Image src="/images/signup.png"/>
            </Grid.Column>
          </Grid>
          <iframe
            /* eslint-disable-next-line max-len */
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.356025878127!2d-157.819300485067!3d21.296943983944583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c006d989580d855%3A0xac63f2de838ed2f4!2sUniversity%20of%20Hawai%CA%BBi%20at%20M%C4%81no!5e0!3m2!1sen!2sus!4v1649541864645!5m2!1sen!2sus' style={{ overflow: 'hidden', width: '100%', height: '300px', border: '0', allowFullScreen: '', loading: 'lazy', referrerPolicy: 'no-referrer-when-downgrade' }}/>
        </div>
        <div className='landing-picture-background'>
          <Container textAlign='center'>
            <Image src='/images/logov1.jpeg' size='small' centered circular style={{ paddingTop: '10px' }}/>
            <Header style={{ color: 'white', fontSize: '50pt', paddingTop: '10px', fontFamily: 'Barlow' }} as='h1'>
              Our Contribution To You
            </Header>
            <Header style={{ paddingTop: '20px', paddingBottom: '70px', color: 'white', fontSize: '25t', fontFamily: 'Barlow' }} as='h3'>
              We aim to give University of Hawaii at Manoa students to feel that there are more options than having to pay
              endless amounts of commuting fees such as gas or parking. Our aina is meant to be shared and cared for, so let us
              do our parts to work together to improve your daily commutes
            </Header>
          </Container>
        </div>
      </div>

    );
  }
}

HomeDR.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subUsers = Meteor.subscribe(Users.userPublicationName);
  return {
    ready: subUsers.ready(),
  };
})(HomeDR);
