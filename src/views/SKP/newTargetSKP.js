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
	constructor(props) {
		super(props)

		this.state = {
			kegiatan_tugas_jabatan : '',
			ak : '',
			jumlah : '',
			satuan_jumlah : '',
			kualitas : '',
			satuan_kualitas : '',
			waktu : '',
			kode_satuan_waktu : 1,
			biaya : ''
		};
	};
	
	onSubmit() {
		let dataToSend = {
			kegiatan_tugas_jabatan : this.state.kegiatan_tugas_jabatan,
			ak : this.state.ak,
			jumlah : this.state.jumlah,
			satuan_jumlah : this.state.satuan_jumlah,
			kualitas : this.state.kualitas,
			satuan_kualitas : this.state.satuan_kualitas,
			waktu : this.state.waktu,
			kode_satuan_waktu : this.state.kode_satuan_waktu,
			biaya : this.state.biaya
		}

		fetch(data.api + '/target/news', {
			method : 'POST',
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(dataToSend)
		}).then((text) => text.json()).then((result) => {
			if (result.status == 200) {
				this.props.onClose()
				this.props.onFinish(result)
			}
		})

	}
	
  render() {
	return (
		<div className="animated fadeIn">
			<Row>
				<Col xs="12">
					<Info message={data.info.target.infoTambah}/>
					<FormGroup>
						<Label htmlFor="kegiatan_tugas_jabatan">Kegiatan Tugas Jabatan</Label>
						<Input type="text" id="kegiatan_tugas_jabatan" placeholder="Kegiatan Tugas Jabatan" onChange={(event) => this.setState({kegiatan_tugas_jabatan : event.target.value})} required/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="AK">AK</Label>
						<Input type="text" id="AK" placeholder="AK" onChange={(event) => this.setState({ak : event.target.value})} required/>
					</FormGroup>
					<Row>
						<Col md="6">
							<FormGroup>
								<Label htmlFor="jumlah">Jumlah</Label>
								<Input type="number" id="jumlah" placeholder="Jumlah" onChange={(event) => this.setState({jumlah : event.target.value})} required/>
							</FormGroup>
						</Col>
						<Col md="6">
							<FormGroup>
								<Label htmlFor="satuanOutput">Pilih Type Output</Label>
								<Input type="text" id="satuanOutput" placeholder="Pilih Type Output" onChange={(event) => this.setState({satuan_jumlah : event.target.value})} required/>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md="6">
							<FormGroup>
								<Label htmlFor="kualitas">Kualitas</Label>
								<Input type="number" id="kualitas" placeholder="Kualitas" onChange={(event) => this.setState({kualitas : event.target.value})} required/>
							</FormGroup>
						</Col>
						<Col md="6">
							<FormGroup>
								<Label htmlFor="satuanKualitas">Pilih Satuan Kualitas</Label>
								<Input type="text" id="satuanKualitas" placeholder="Satuan Kualitas" onChange={(event) => this.setState({satuan_kualitas : event.target.value})} required/>
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md="6">
							<FormGroup>
								<Label htmlFor="waktu">Waktu</Label>
								<Input type="number" id="waktu" placeholder="Waktu" onChange={(event) => this.setState({waktu : event.target.value})} required/>
							</FormGroup>
						</Col>
						<Col md="6">
							<FormGroup>
								<Label htmlFor="waktu">Pilih Tipe Waktu</Label>
								<Input type="select" name="satuanWaktu" id="satuanWaktu" onChange={(event) => this.setState({kode_satuan_waktu : event.target.value})}>
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
							<Input type="number" id="biaya" onChange={(event) => this.setState({biaya : event.target.value})} placeholder="Biaya" required/>
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
