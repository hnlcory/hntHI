import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Icon } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component.
 * Old navbar items for reference
 *  <Menu.Item as={NavLink} id="profilesMenuItem" activeClassName="active" exact to="/profiles" key='profiles'>Profiles</Menu.Item>
 *  <Menu.Item as={NavLink} id="projectsMenuItem" activeClassName="active" exact to="/projects" key='projects'>Projects</Menu.Item>
 *  <Menu.Item as={NavLink} id="interestsMenuItem" activeClassName="active" exact to="/interests" key='interests'>Interests</Menu.Item>
 *  <Menu.Item as={NavLink} id="addProjectMenuItem" activeClassName="active" exact to="/addProject" key='addP'>Add Project</Menu.Item>,
 *  <Menu.Item as={NavLink} id="filterMenuItem" activeClassName="active" exact to="/filter" key='filter'>Filter</Menu.Item>
 * */
class NavBar extends React.Component {
  render() {
    return (
      <Menu style={{ marginBottom: '0px', fontFamily: 'Barlow' }} borderless>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Image size='mini' circular spaced='right' src="/images/hnt-navbar-logo.jpeg"/>
          <span style={{ fontWeight: 800, fontSize: '24px' }}>hntHI</span>
        </Menu.Item>
        {this.props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Hotspot</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list'>List Hotspot</Menu.Item>]
        ) : ''}
        {this.props.currentUser ? (
          [<Menu.Item as={NavLink} id="homeMenuItem" activeClassName="active" exact to="/homedr" key='homeD'>Home</Menu.Item>,
            <Menu.Item as={NavLink} id="accountPage" activeClassName="active" exact to="/user" key='profile'>My Account</Menu.Item>,
            <Menu.Item as={NavLink} id="driverPage" activeClassName="active" exact to="/driverssearch" key='drivers'>Drivers
              <Icon name={'car'}/></Menu.Item>,
            <Menu.Item as={NavLink} id="riderPage" activeClassName="active" exact to="/riderssearch" key='riders'>Riders
              <Icon name={'male'}/></Menu.Item>,
            <Menu.Item as={NavLink} id="formPage" activeClassName="active" exact to="/fastrideform" key='fastRideReq'>Fast Ride Request
              <Icon name={'bolt'}/></Menu.Item>,
            <Menu.Item as={NavLink} id="feedPage" activeClassName="active" exact to="/fastridefeed" key='fastRideFeed'>Fast Ride Feed
              <Icon name={'bolt'}/></Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item as={NavLink} id="adminPage" activeClassName="active" exact to="/adminsearch" key='admins'>Admin
            <Icon name={'hdd'}/></Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" className='bowfolio-green' text="Login" pointing="top right" icon={'user circle'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter so that links work. */
export default withRouter(NavBarContainer);
