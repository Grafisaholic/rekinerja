import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";

export default class ModalComponent extends Component {
	constructor(props) {
	  super(props)
	
	  this.state = {
		 modal : false
	  };
	  this.toggle = this.props.onClose.bind(this);
	};
		
	render() {
		return (
			<Modal
				{...this.props}
				isOpen={this.props.isOpen}
				toggle={this.toggle}
				className='modal-lg'>
				{
					this.props.enableTitle ? (
						<ModalHeader toggle={this.toggle} style={{fontSize : '15px'}}>{this.props.modalTitle || 'Modal Title'}</ModalHeader>
					) : <div></div>
				}
				<ModalBody>
					{this.props.modalBody()}
				</ModalBody>
				{
					this.props.hasFooter && (
						<ModalFooter>
							<Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
							<Button color="secondary" onClick={this.toggle}>Cancel</Button>
						</ModalFooter>
					)
				}
			</Modal>
		)
  }
};
