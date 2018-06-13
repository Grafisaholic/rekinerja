import React, { Component } from 'react';
import {
	Row,
	Col,
	Button,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Card,
	CardHeader,
	CardFooter,
	CardBlock,
	Form,
	FormGroup,
	FormText,
	Label,
	Input,
	InputGroup,
	Table,
	InputGroupAddon,
	InputGroupButton
} from "reactstrap";

export default class EPresensiPage extends Component {
  render() {
	return (
	  <div className="animated fadeIn">
	  	<Row>
			<Col lg="12" md="12">
				<Card>
					<CardHeader className="bg-primary">
						<strong>EPresensi</strong>
					</CardHeader>
					<CardBlock className="card-body" style={{padding : 0}}>
						<div className="table-responsive">
							<Table className="table-striped table-bordered">
								<thead>
									<tr>
										<th rowSpan="2" style={{verticalAlign : 'middle', textAlign : 'center'}}>NO</th>
										<th rowSpan="2" style={{verticalAlign : 'middle', textAlign : 'center'}}>BULAN</th>
										<th rowSpan="2" style={{verticalAlign : 'middle', textAlign : 'center'}}>TAHUN</th>
										<th colSpan="2" style={{verticalAlign : 'middle', textAlign : 'center'}}>INDIKATOR</th>
										<th rowSpan="2" style={{verticalAlign : 'middle', textAlign : 'center'}}>PENILAIAN</th>
										<th rowSpan="2" style={{verticalAlign : 'middle', textAlign : 'center'}}>TPP DI TERIMA</th>
									</tr>
									<tr>
										<th style={{verticalAlign : 'middle', textAlign : 'center'}}>KINERJA 60%</th>
										<th style={{verticalAlign : 'middle', textAlign : 'center'}}>KEHADIRAN 40%</th>
									</tr>
								</thead>
							</Table>
						</div>
					</CardBlock>
				</Card>
			</Col>
		</Row>
	  </div>
	)
  }
};
