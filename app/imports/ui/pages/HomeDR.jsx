import React from 'react';
import { Button, Container, Grid, Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class HomeDR extends React.Component {
  render() {
    return (
      <div id="welcome-home">
        <div className='landing-picture-background'>
          <Container textAlign='center'>
            <Image src='/images/logov1.jpeg' size='small' centered circular style={{ paddingTop: '20px' }}/>
            <Header style={{ color: 'white', fontSize: '40pt' }} as='h1'>
              Welcome to Carpool-And-Go!
            </Header>
            <Header style={{ paddingBottom: '30px', color: 'white' }} as='h3'>
              Brought to you by UH Manoa ICS Web Design Students.
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
            <Grid.Column>
              <Header style={{ color: 'white', paddingTop: '50px' }} as='h3'>
                UH Carpool and Go offers a safe space to give drivers the chance to offer rides to those in need.
                Look for possible riders in your area!
              </Header>
              <Button color='olive' as={Link} to='/riderssearch' size='large'>Let's Pickup!</Button>
              <Header style={{ color: 'white', paddingTop: '25px' }} as='h3'>
                As a driver, it is important to keep all of your driver information up to date in your profile.
                You can make sure everything is correct here:
              </Header>
              <Button color='olive' as={Link} to='/useredit' size='large'>Edit My User</Button>
            </Grid.Column>
          </Grid>
        </div>
        <div className='landing-person-background'>
          <Header style={{ color: 'white', paddingTop: '20px' }} as='h2' textAlign='center'>
            Sort by area to connect with others leaving at similar times</Header>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column>
              <Image src="/images/add-project-page.png"/>
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/projects-page.png"/>
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

      </div>

    );
  }
}
export default HomeDR;
