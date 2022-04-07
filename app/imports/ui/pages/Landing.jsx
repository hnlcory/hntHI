import React from 'react';
import { Grid, Image, Container, Header } from 'semantic-ui-react';

/** Renders a color-blocked static landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div id="landing-page">
        <div className='landing-picture-background'>
          <Container textAlign='center'>
            <Image src='/images/logov1.jpeg' size='small' centered circular style={{ paddingTop: '10px' }}/>
            <Header style={{ color: 'white', fontSize: '36pt' }} as='h1'>
                Welcome to Carpool-And-Go
            </Header>
            <Header style={{ paddingBottom: '20px', color: 'white' }} as='h3'>
              Allowing drivers to offer rides, and riders to search for nearby rides
            </Header>
          </Container>
        </div>
        <div className='landing-white-background'>
          <Header style={{ color: '#376551' }} as='h2' textAlign='center'>Start by making your profile....</Header>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column>
              <Image src="/images/home-page.png"/>
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/profiles-page.png"/>
            </Grid.Column>
          </Grid>
        </div>
        <div className='landing-green-background'>
          <Header style={{ color: 'white' }} as='h2' textAlign='center'>...then add your projects</Header>
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
              Connect to people and projects with shared interests!
          </Header>
          <Grid container stackable columns='equal' textAlign='center'>
            <Grid.Column>
              <Image src="/images/interests-page.png"/>
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

export default Landing;
