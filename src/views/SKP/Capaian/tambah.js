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
		errorMessage : '',
		kuantitas : '',
		kuantitas_satuan : '',
		kualitas : '',
		kualitas_satuan : ''
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

	onSubmitEdit() {
		let dateNow = new Date()
		let thisMonth = dateNow.getMonth() + 1
		const {selectedMonth, kualitas, kuantitas, kualitas_satuan, kuantitas_satuan} = this.state
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
					id : this.props.dataEdit.id,
					bulan : bulan.bulan,
					jumlah : parseFloat(kuantitas),
					jumlah_satuan : kuantitas_satuan,
					kualitas : parseFloat(kualitas),
					kualitas_satuan : kualitas_satuan,
					status : this.props.dataEdit.status
				}

				this.props.onFinish({
					status : 200,
					type : 'edit',
					data : data,
					message : 'Edit Capaian Berhasil'
				})
			} else {
				errorMessage = 'Bulan Tidak Valid'
				this.setState({errorMessage})
			}
		}		
	}

	componentDidMount() {
		if (this.props.action == 'edit' && this.props.dataEdit) {
			let bulan = _.findWhere(this.state.bulan, {bulan : this.props.dataEdit.bulan})

			const dataEdit = this.props.dataEdit

			this.setState({
				selectedMonth : bulan.index,
				kuantitas : dataEdit.jumlah,
				kuantitas_satuan : dataEdit.jumlah_satuan,
				kualitas : dataEdit.kualitas,
				kualitas_satuan : dataEdit.kualitas_satuan
			})
		}
	}

	renderEdit() {
		return (
			<div>
				<Row>
					<Col md="6" xs="12">
						<FormGroup>
							<Label>Kuantitas</Label>
							<Input type="number" value={this.state.kuantitas} onChange={(e) => this.setState({kuantitas : e.target.value})}/>
						</FormGroup>
					</Col>
					<Col md="6" xs="12">
						<FormGroup>
							<Label>Pilih Type Output</Label>
							<Input type="text" value={this.state.kuantitas_satuan} onChange={(e) => this.setState({kuantitas_satuan : e.target.value})}/>
						</FormGroup>
					</Col>
				</Row>
				<Row>
					<Col md="6" xs="12">
						<FormGroup>
							<Label>Kualitas</Label>
							<Input type="number" value={this.state.kualitas} onChange={(e) => this.setState({kualitas : e.target.value})}/>
						</FormGroup>
					</Col>
					<Col md="6" xs="12">
						<FormGroup>
							<Label>Pilih Type Output</Label>
							<Input type="text" value={this.state.kualitas_satuan}
								onChange={(e) => this.setState({kualitas_satuan : e.target.value})}/>
						</FormGroup>
					</Col>
				</Row>
			</div>
		)
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
						{
							this.props.action == 'edit' ? (
								<select className="form-control" onChange={(data) => this.setState({selectedMonth : data.target.value})} value={this.state.selectedMonth} disabled>
									<option>PILIH BULAN</option>
									{
										this.state.bulan.map((b, key) => {
											return (
												<option value={b.index} key={key}>{b.bulan}</option>
											)
										})
									}
								</select>
							) : (
								<select className="form-control" onChange={(data) => this.setState({selectedMonth : data.target.value})} value={this.state.selectedMonth}>
									<option>PILIH BULAN</option>
									{
										this.state.bulan.map((b, key) => {
											return (
												<option value={b.index} key={key}>{b.bulan}</option>
											)
										})
									}
								</select>
							)
						}
					</FormGroup>
					{
						this.props.action == 'edit' && this.renderEdit()
					}
				</div>
				<div className="form-group">
					{
						this.props.action == 'edit' ? (
							<Button
								className="btn btn-primary"
								onClick={this.onSubmitEdit.bind(this)}>SIMPAN CAPAIAN</Button>
						) : (
							<Button
								className="btn btn-primary"
								onClick={this.onSubmit.bind(this)}>TAMBAH BARU</Button>
						)
					}
					<Button
						color="default"
						onClick={this.props.onClose.bind(this)}>CANCEL</Button>
				</div>
			</Form>
		);
	}
};
