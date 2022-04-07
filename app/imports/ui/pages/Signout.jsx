import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Image } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <Container>
        <Header id="signout-page" as="h2" textAlign="center">
          <p>You have signed out successfully.</p>
        </Header>
        <Image src='/images/logov1.jpeg' size='small' circular centered/>
      </Container>
    );
  }
}
