import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Notes } from '../../api/note/Notes';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Note extends React.Component {
  render() {
    const note = this.props.note;
    return (
      <Feed.Event >
        <Feed.Content>
          <Feed.Summary>
            {note.firstName}
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Note.propTypes = {
  note: PropTypes.array.isRequired,
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Notes.userPublicationName);
  // Get the document
  const doc = Notes.collection.findOne(documentId);
  return {
    doc,
    ready: sub1.ready(),
  };
})(Note);
