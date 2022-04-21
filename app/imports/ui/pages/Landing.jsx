import React from 'react';
import { Grid, Image, Container, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

/** Renders a color-blocked static landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div id="landing-page">
        <div className='landing-picture-background'>
          <Container textAlign='center'>
            <Image src='/images/logov1.jpeg' size='small' centered circular style={{ paddingTop: '20px' }}/>
            <Header style={{ color: 'white', fontSize: '36pt' }} as='h1'>
                Welcome to Carpool-And-Go
            </Header>
            <Header style={{ paddingBottom: '40px', color: 'white' }} as='h3'>
              Allowing drivers to offer rides, and riders to search for nearby rides
            </Header>
          </Container>
        </div>
        <div className='landing-white-background'>
          <Header style={{ color: '#376551' }} as='h2' textAlign='center'>Create your profile as a Driver or Rider</Header>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column>
              <Image src="/images/profiles-page.png"/>
            </Grid.Column>
            <Grid.Column>
              <Image size='huge' src="/images/driver.jpeg"/>
            </Grid.Column>
          </Grid>
        </div>
        <div className='landing-person-background'>
          <Header style={{ color: 'white', paddingTop: '20px' }} as='h2' textAlign='center'>
            Sort by area to connect with others leaving at similar times</Header>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column>
              <Image src="/images/rider-page-search.png"/>
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/driver-page-search.png"/>
            </Grid.Column>
          </Grid>
        </div>
        <div className='landing-white-background'>
          <Header style={{ color: '#376551' }} as='h2' textAlign='center'>
              Connect quickly with others for last-minute rides using Fast Ride
          </Header>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column>
              <Image src="/images/signup.png"/>
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/filter-page.png"/>
            </Grid.Column>
          </Grid>
        </div>

        <div className='landing-driver-background'>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Image src="/images/interests-page.png"/>
              </Grid.Column>
              <Grid.Column>
                <Header style={{ paddingTop: '100px' }} as='h2' inverted>
                  Request a ride now
                </Header>
                {Meteor.user() ? '' : (
                  <Button.Group size='large'>
                    <Button color='olive' as={Link} to='/signin'>Login</Button>
                    <Button.Or />
                    <Button as={Link} to='/signup'>Signup</Button>
                  </Button.Group>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>

      </div>

    );
  }
}

export default Landing;
