import React, { Component } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import { deleteCard } from './AdminSearch';

class ConfirmPrompt extends Component {
  state = { open: false }

  show = () => this.setState({ open: true })

  handleConfirm = () => deleteCard()

  handleCancel = () => this.setState({ open: false })

  render() {
    return (
      <div>
        <Button onClick={this.show} color='red'><Icon name='user delete' color='yellow'/>Delete profile</Button>
        <Confirm
          open={this.state.open}
          cancelButton='Never mind'
          confirmButton="Let's do it"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    );
  }
}

export default ConfirmPrompt;
