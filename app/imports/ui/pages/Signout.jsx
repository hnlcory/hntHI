import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Image } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <div className='landing-picture-background' style={{ paddingTop: '30px', paddingBottom: '20px' }}>
        <Image src='/images/logov1.jpeg' size='small' circular centered/>
        <Header id="signout-page" as="h2" textAlign="center">
          <p style={{ color: 'white', fontSize: '20pt', paddingTop: '30px', fontFamily: 'Barlow' }}>You have signed out successfully.</p>
        </Header>
      </div>
    );
  }
}
