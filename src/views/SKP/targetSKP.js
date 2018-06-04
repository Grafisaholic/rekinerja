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

// SHARED MODAL COMPONENTS
import Modal from "../../components/Modal/Modal.js";
import NewTarget from './newTargetSKP'

export default class componentName extends Component {
	constructor(props) {
	  super(props)
	
	  this.state = {
		 data : [{
			kegiatan_tugas_jabatan : 'Merumuskan program kerja kegiatan di tingkat kecamatan',
			AK : '-',
			jumlah : 50,
			kualitas : 3,
			waktu : 1,
			kode_satuan_waktu : 'Bln',
			biaya : 'Rp. 1.800.000'
		 },{
			kegiatan_tugas_jabatan : 'Merumuskan program kerja kegiatan di tingkat kecamatan',
			AK : '-',
			jumlah : 50,
			kualitas : 3,
			waktu : 1,
			kode_satuan_waktu : 'Bln',
			biaya : 'Rp. 1.800.000'
		 }],
		 modalOpen : false
	  };
	};
	
	renderRow() {
		return (
			<tbody>
				{this.state.data.map((d, key) => {
					return (
						<tr key={key}>
							<td>{key + 1}</td>
							<td>{d.kegiatan_tugas_jabatan}</td>
							<td>{d.AK}</td>
							<td>{d.jumlah}</td>
							<td>{d.kualitas}</td>
							<td>{d.waktu}</td>
							<td>{d.kode_satuan_waktu}</td>
							<td>{d.biaya}</td>
						</tr>
					)
				})}
			</tbody>
		)
	}
  render() {
	return (
		<div className="animated fadeIn">
			<Modal
				isOpen={this.state.modalOpen}
				modalTitle="Tambah Target SKP Baru"
				onClose={() => this.setState({ modalOpen : false})}
				modalBody={() => <NewTarget/>}/>
			<Row>
				<Col xs="12">
					<Card>
						<CardHeader className="bg-primary">
							<strong>Target SKP</strong>
							<br/>
							<small>List Target SKP</small>
						</CardHeader>
						<CardBlock className="card-body" style={{padding : 10, backgroundColor: '#EEE'}}>
							<Button type="button" size="sm" color="primary">
								<i className="fa fa-refresh"></i>
							</Button>
							&nbsp;
							<Button type="button" size="sm" color="primary" onClick={() => this.setState({ modalOpen : true})}>
								<i className="fa fa-plus"></i>
							</Button>
						</CardBlock>
						<CardBlock className="card-body">
							<Table className="table-striped table-bordered">
								<thead>
									<tr>
										<th rowSpan="2" style={{verticalAlign : 'middle', textAlign : 'center'}}>NO</th>
										<th rowSpan="2" style={{verticalAlign : 'middle', textAlign : 'center'}}>KEGIATAN TUGAS JABATAN</th>
										<th rowSpan="2" style={{verticalAlign : 'middle', textAlign : 'center'}}>AK</th>
										<th colSpan="5" style={{verticalAlign : 'middle', textAlign : 'center'}}>TARGET</th>
									</tr>
									<tr>
										<th style={{verticalAlign : 'middle', textAlign : 'center', fontSize : '11px'}}>KUANT / OUTPUT</th>
										<th style={{verticalAlign : 'middle', textAlign : 'center', fontSize : '11px'}}>KUAL / MUTU</th>
										<th style={{verticalAlign : 'middle', textAlign : 'center', fontSize : '11px'}} colSpan="2">WAKTU</th>
										<th style={{verticalAlign : 'middle', textAlign : 'center', fontSize : '11px'}}>BIAYA</th>
									</tr>
								</thead>

								{this.renderRow()}
							</Table>
						</CardBlock>
					</Card>
				</Col>
			</Row>
		</div>		
	)
  }
};
