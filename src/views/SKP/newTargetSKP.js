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
	onSubmit() {

	}
  render() {
	return (
		<div className="animated fadeIn">
			<Row>
				<Col xs="12">
					<Info message={data.info.target.infoTambah}/>
					<FormGroup>
						<Label htmlFor="kegiatan_tugas_jabatan">Kegiatan Tugas Jabatan</Label>
						<Input type="text" id="kegiatan_tugas_jabatan" placeholder="Kegiatan Tugas Jabatan" required/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="AK">AK</Label>
						<Input type="text" id="AK" placeholder="AK" required/>
					</FormGroup>
					<Row>
						<Col md="6">
							<FormGroup>
								<Label htmlFor="jumlah">Jumlah</Label>
								<Input type="number" id="jumlah" placeholder="Jumlah" required/>
							</FormGroup>
						</Col>
						<Col md="6">
							<FormGroup>
								<Label htmlFor="jumlah">Pilih Type Output</Label>
								<Input type="text" id="satuanOutput" placeholder="Pilih Type Output" required/>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md="6">
							<FormGroup>
								<Label htmlFor="waktu">Waktu</Label>
								<Input type="number" id="waktu" placeholder="Waktu" required/>
							</FormGroup>
						</Col>
						<Col md="6">
							<FormGroup>
								<Label htmlFor="waktu">Pilih Tipe Waktu</Label>
								<Input type="select" name="satuanWaktu" id="satuanWaktu">
									<option value="1">Hari</option>
									<option value="2">Minggu</option>
									<option value="3">Bulan</option>
								</Input>
							</FormGroup>
						</Col>
					</Row>
					<FormGroup>
						<Label htmlFor="biaya">Biaya</Label>
						<InputGroupAddon>
							<InputGroupButton className="label-addon">RP</InputGroupButton>
							<Input type="number" id="biaya" placeholder="Biaya" required/>
						</InputGroupAddon>
					</FormGroup>
					<div className="form-group">
						<Button
							className="btn btn-primary"
							onClick={this.onSubmit.bind(this)}>TAMBAH BARU</Button>
						<Button
							color="default"
							onClick={this.props.onClose.bind(this)}>CANCEL</Button>
					</div>
				</Col>
			</Row>
		</div>
	)
  }
};
