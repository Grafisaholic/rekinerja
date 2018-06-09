import React, { Component } from 'react';
import {
	Row,
	Col,
	Button,
	Alert,
	Form,
	Label,
	FormGroup,
	Input
} from "reactstrap";
const _ = require('underscore')

export default class Capaian extends Component {
	constructor(props) {
	  super(props)
	
	  this.state = {
		 bulan : [{
			index : 1,
			bulan : 'January'
		 },{
			index : 2,
			bulan : 'Februari'
		 },{
			index : 3,
			bulan : 'Mei'
		 },{
			index : 4,
			bulan : 'April'
		 },{
			index : 5,
			bulan : 'Mei'
		 },{
			index : 6,
			bulan : 'Juni'
		 },{
			index : 7,
			bulan : 'July'
		 },{
			index : 8,
			bulan : 'Agustus'
		 },{
			index : 9,
			bulan : 'September'
		 },{
			index : 10,
			bulan : 'Oktober'
		 },{
			index : 11,
			bulan : 'November'
		 },{
			index : 12,
			bulan : 'Desember'
		 }],
		selectedMonth : 0,
		errorMessage : ''
	  };
	};
	
	onSubmit() {
		let dateNow = new Date()
		let thisMonth = dateNow.getMonth() + 1
		const {selectedMonth} = this.state
		let errorMessage = ''
		if (thisMonth > selectedMonth) {
			errorMessage = 'Tidak Bisa Memilih Bulan Sebelumnya'
			this.setState({errorMessage})
		} else {
			errorMessage = ''
			this.setState({ errorMessage })

			let dataBulan = this.state.bulan
			let bulan = _.findWhere(dataBulan, {index : parseInt(selectedMonth)})

			if (bulan) {
				let data = {
					bulan : bulan.bulan
				}
				this.props.onFinish({
					status : 200,
					data : data
				})
			} else {
				errorMessage = 'Bulan Tidak Valid'
				this.setState({errorMessage})
			}
		}
	}

	render() {
		return (
			<Form>
				<Info message={data.info.capaian.infoTambah}/>
				<div className="form-group">
					{this.state.errorMessage && (
						<Alert color="danger">
							{this.state.errorMessage}
						</Alert>
					)}
					<FormGroup>
						<Label>Nama Kegiatan Tugas Jabatan</Label>
						<Input value={this.props.nama_kegiatan} name='nama_kegiatan' readonly/>
					</FormGroup>
					<FormGroup>
						<Label>Bulan</Label>
						<select className="form-control" onChange={(data) => this.setState({selectedMonth : data.target.value})}>
							<option>PILIH BULAN</option>
							{
								this.state.bulan.map((b, key) => {
									return (
										<option value={b.index} key={key}>{b.bulan}</option>
									)
								})
							}
						</select>
					</FormGroup>

				</div>
				<div className="form-group">
					<Button
						className="btn btn-primary"
						onClick={this.onSubmit.bind(this)}>TAMBAH BARU</Button>
					<Button
						color="default"
						onClick={this.props.onClose.bind(this)}>CANCEL</Button>
				</div>
			</Form>
		);
	}
};
