import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <div color="danger" onClick={this.toggle}>  <img src={this.props.item.image_url} height="100px" alt={this.props.item.image_description} /> </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-xl">
          <ModalHeader toggle={this.toggle}>{this.props.item.image_title}</ModalHeader>
          <ModalBody>
            <img style={{maxWidth:"100%", maxHeight:"100%"}} src={this.props.item.image_url} alt={this.props.item.image_description} /><br />
            { this.props.item.image_description }
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
