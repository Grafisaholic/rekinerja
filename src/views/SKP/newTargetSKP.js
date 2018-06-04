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
	InputGroupAddon,
	InputGroupButton
  } from "reactstrap";
  
export default class TargetSKP extends Component {
  render() {
	return (
		<div className="animated fadeIn">
			<Row>
				<Col xs="12">
					<FormGroup>
						<Label htmlFor="kegiatan_tugas_jabatan">Kegiatan Tugas Jabatan</Label>
						<Input type="text" id="kegiatan_tugas_jabatan" placeholder="Kegiatan Tugas Jabatan" required/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="AK">AK</Label>
						<Input type="text" id="AK" placeholder="AK" required/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="jumlah">Jumlah</Label>
						<Input type="number" id="jumlah" placeholder="Jumlah" required/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="waktu">Waktu</Label>
						<Input type="number" id="waktu" placeholder="Waktu" required/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="waktu">Satuan Waktu</Label>
						<Input type="select" name="satuanWaktu" id="satuanWaktu">
							<option value="1">Hari</option>
							<option value="2">Minggu</option>
							<option value="3">Bulan</option>
						</Input>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="biaya">Biaya</Label>
						<Input type="number" id="biaya" placeholder="Biaya" required/>
					</FormGroup>
				</Col>
			</Row>
		</div>
	)
  }
};
