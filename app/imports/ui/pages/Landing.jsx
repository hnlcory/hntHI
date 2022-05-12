import React from 'react';
import { Grid, Image, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

/** Renders a color-blocked static landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div id="landing-page">
        <div className='landing-picture-background'>
          <Grid id='landing-page' verticalAlign='middle' textAlign='center' divided='vertically'>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Image size='small' src='/images/hnt-landing-logo.png' centered/>
                <h1 id='font-type-inter-header'>hntHI</h1>
                <p id='font-type-inter-sub'>Data Visualization for Helium LoRaWAN Miners</p>
                <Link to='/signin'>
                  <button className="ui button black" >Login</button>
                </Link>
                <Link to='/signup'>
                  <button className="ui button black" >Signup</button>
                </Link>
              </Grid.Column>
              <Grid.Column>
                <Image size='huge' src='/images/hnt-landing-picture.png' />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <div className='landing-green-background'>
          <Header style={{ color: 'white', fontFamily: 'Barlow' }} as='h2' textAlign='center'>Create your profile as a Driver or Rider</Header>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column>
              <Image src="/images/profile-page.png"/>
            </Grid.Column>
            <Grid.Column>
              <Image size='huge' src="/images/driver.jpeg"/>
            </Grid.Column>
          </Grid>
        </div>
        <div className='landing-person-background'>
          <Header style={{ color: 'white', paddingTop: '20px', fontFamily: 'Barlow' }} as='h2' textAlign='center'>
            Sort by area to connect with others leaving at similar times</Header>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column>
              <Image src="/images/driver-search-page.png"/>
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/rider-search-page-light.png"/>
            </Grid.Column>
          </Grid>
        </div>
        <div className='landing-white-background'>
          <Header style={{ color: '#376551', paddingTop: '20px', fontFamily: 'Barlow' }} as='h2' textAlign='center'>
              Connect quickly with others for last-minute rides using Fast Ride
          </Header>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column>
              <Image src="/images/signup.png"/>
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/fast-ride-feed.png"/>
            </Grid.Column>
          </Grid>
        </div>

        <div className='landing-driver-background'>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Image src="/images/edit-account-page.png"/>
              </Grid.Column>
              <Grid.Column>
                <Header style={{ paddingTop: '100px', fontFamily: 'Barlow', fontSize: '30px' }} as='h2' inverted>
                  Connect with others now
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
