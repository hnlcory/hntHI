import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import Home from '../pages/Home';
import Profiles from '../pages/Profiles';
import FastRideFeed from '../pages/FastRideFeed';
import FastRideForm from '../pages/FastRideForm';
import DriverSearch from '../pages/DriverSearch';
import RiderSearch from '../pages/RiderSearch';
import User from '../pages/User';
import UserEdit from '../pages/UserEdit';
import AdminSearch from '../pages/AdminSearch';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import HomeDR from '../pages/HomeDR';
import UserView from '../pages/UserView';
// Testing
import Filter from '../pages/Filter';
import AddUser from '../pages/UserAdd';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <ProtectedRoute path="/home" component={Home}/>
            <ProtectedRoute path="/profiles" component={Profiles}/>
            <ProtectedRoute path="/homedr" component={HomeDR}/>
            <ProtectedRoute path="/fastridefeed" component={FastRideFeed}/>
            <ProtectedRoute path="/fastrideform" component={FastRideForm}/>
            <ProtectedRoute path="/driverssearch" component={DriverSearch}/>
            <ProtectedRoute path="/riderssearch" component={RiderSearch}/>
            <ProtectedRoute path="/add" component={AddUser}/>
            <AdminProtectedRoute path="/adminsearch" component={AdminSearch}/>
            <ProtectedRoute path="/user" component={User}/>
            <ProtectedRoute path="/useredit/:_id" component={UserEdit}/>
            <ProtectedRoute path="/userview/:_id" component={UserView}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/test" component={Filter}/>
            <ProtectedRoute path="/signout" component={Signout}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
        <Footer/>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
