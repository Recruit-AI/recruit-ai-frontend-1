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

    let size = this.props.size || "100px"

    return (
      <div> {this.props.item.image_url ? <div>
        <div color="danger" onClick={this.toggle}>  
          <img src={this.props.item.image_url} height={size} alt={this.props.item.image_description} /> 
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-xl bg-dark">
          <ModalHeader toggle={this.toggle} className="bg-dark modal-header">{this.props.item.image_title}</ModalHeader>
          <ModalBody className="bg-dark">
            { this.props.item.image_description }<br />
          <img style={{width:"80%", maxWidth:"80%", height:'100%', maxHeight:"100%", display:'block', margin: "auto"}} src={this.props.item.image_url} alt={this.props.item.image_description} /><br />
          </ModalBody>
          <ModalFooter className="bg-dark">
            <Button color="secondary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
       </div> : <img src={require('../../img/logo.png')} height={size} alt={this.props.item.image_description} />  } </div>
    );
  }
}

export default ModalExample;
