import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ContactAdmin extends React.Component {
  render() {
    return (
      <Card centered >
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src={this.props.note.image}
          />
          <Card.Header>{this.props.note.firstName} {this.props.note.lastName}</Card.Header>
          <Card.Meta>{this.props.note.location}</Card.Meta>
          <Card.Description>
            {this.props.note.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {this.props.note.owner}
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ContactAdmin.propTypes = {
  note: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ContactAdmin);
