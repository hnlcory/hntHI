import React from 'react';
import { Segment } from 'semantic-ui-react';
import { AutoForm, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Notes } from '../../api/note/Notes';

const bridge = new SimpleSchema2Bridge(Notes.schema);

/** Renders the Page for adding a document. */
class FastRideForm extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { firstName, lastName, location, image, description, arrives, leaves, contact } = data;
    Notes.collection.insert({ firstName, lastName, location, image, description, arrives, leaves, contact },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Note added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
        <Segment>
          <TextField name='firstName'/>
          <TextField name='lastName'/>
          <TextField name='location'/>
          <TextField name='image'/>
          <LongTextField name='description' />
          <TextField name='arrives'/>
          <TextField name='leaves'/>
          <TextField name='contact'/>
          <SubmitField value='Submit'/>
        </Segment>
      </AutoForm>
    );
  }
}

export default FastRideForm;
