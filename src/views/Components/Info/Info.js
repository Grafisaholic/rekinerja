import React, { Component } from 'react';
import { Alert } from 'reactstrap';

export default class InfoComponent extends Component {
  render() {
	return (
		<div>
			<Alert color="info">
				<i className="fa fa-info-circle"/>
				&nbsp;
				&nbsp;
				<span>{this.props.message}</span>
			</Alert>
		</div>
	)
  }
};
