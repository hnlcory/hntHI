import React from 'react';
import { Button, Container, Grid, Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class HomeDR extends React.Component {
  render() {
    return (
      <div id="welcome-home">
        <div className='homedr-picture-background'>
          <Container textAlign='center'>
            <Header style={{ color: 'white', fontSize: '50pt', paddingTop: '50px' }} as='h1'>
              Where Shall We Go Today?
            </Header>
            <Header style={{ paddingTop: '50px', paddingBottom: '70px', color: 'white', fontSize: '25pt' }} as='h3'>
              <br/>
            </Header>
          </Container>
        </div>
        <div className='landing-green-background'>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column>
              <Header style={{ color: 'white', fontSize: '40pt', paddingTop: '10px' }} as='h2'>
                Looking to Drive?
              </Header>
              <Image size='huge' src="/images/driver.jpeg"/>
            </Grid.Column>
            <Grid.Column style={{ paddingTop: '10px' }}>
              <Header style={{ color: 'white', paddingTop: '40px' }} as='h3'>
                UH Carpool and Go offers a safe space to give drivers the chance to offer rides to those in need.
                Look for possible riders in your area!
              </Header>
              <Button color='olive' as={Link} to='/riderssearch' size='large'>Let Us Pickup!</Button>
              <Header style={{ color: 'white', paddingTop: '25px' }} as='h3'>
                As a driver, it is important to keep all of your driver information up to date in your profile.
                You can make sure everything is correct here:
              </Header>
              <Button id='edit-button' color='olive' as={Link} to={'/useredit/'} size='large'>Edit My User</Button>
            </Grid.Column>
          </Grid>
        </div>
        <div className='homedr-picture-background'>
          <Container textAlign='center'>
            <Header style={{ color: 'white', fontSize: '50pt', paddingTop: '50px' }} as='h1'>
              Our Contribution To You
            </Header>
            <Header style={{ paddingTop: '50px', paddingBottom: '70px', color: 'white', fontSize: '25t' }} as='h3'>
              We aim to give University of Hawaii at Manoa students to feel that there are more options than having to pay
              endless amounts of commuting fees such as gas or parking. Our aina is meant to be shared and cared for, so let us
              do our parts to work together to reduce gas and improve your daily commutes. Together is better!
            </Header>
          </Container>
        </div>
        <div className='landing-white-background'>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column style={{ paddingTop: '10px' }}>
              <Header style={{ color: 'green', paddingTop: '40px' }} as='h3'>
                Need a ride to school? Students and staff can use Carpool and Go! to find drivers nearby their locations.
                Find those near you now:
              </Header>
              <Button color='olive' as={Link} to='/driverssearch' size='large'>Find a Ride!</Button>
              <Header style={{ color: 'green', paddingTop: '25px' }} as='h3'>
                As a rider, it is important to keep other riders updated on which drivers have offered good services! We strive to create
                a community of safe drivers and allow riders ways to commute with ease of worry. Been on a ride recently? Rate them here:
              </Header>
              <Button color='olive' as={Link} to='/ratedriver' size='large'>Rate My Driver</Button>
            </Grid.Column>
            <Grid.Column>
              <Header style={{ color: 'green', fontSize: '40pt', paddingTop: '10px' }} as='h2'>
                Looking to Ride?
              </Header>
              <Image src="/images/signup.png"/>
            </Grid.Column>
          </Grid>
        </div>
        <div className='homedr-picture-background'>
          <Container textAlign='center'>
            <Header style={{ color: 'white', fontSize: '50pt', paddingTop: '50px' }} as='h1'>
              The Fast Ride Way
            </Header>
            <Header style={{ paddingTop: '50px', paddingBottom: '70px', color: 'white', fontSize: '25t' }} as='h3'>
              Need a ride on short notice? Got some time and can offer someone a ride? The Fast Ride is a form feed allows
              both riders and drivers to see a real-time chat for those needing to get somewhere soon. <br/><br/>
              <Button.Group size='large'>
                <Button color='olive' as={Link} to='/fastridefeed'>Check the Feed</Button>
                <Button.Or />
                <Button as={Link} to='/fastrideform'>Create a Request Form</Button>
              </Button.Group>
            </Header>
          </Container>
        </div>
      </div>

    );
  }
}
export default HomeDR;
