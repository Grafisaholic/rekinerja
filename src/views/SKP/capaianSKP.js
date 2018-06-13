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
import TambahCapaian from './Capaian/tambah'
import swal from 'sweetalert';

export default class capaianSKP extends Component {
	constructor(props) {
	  super(props)
	
	  this.state = {
		 data : [{
			id : 3000,
			kegiatan_tugas_jabatan : 'Merumuskan program kerja kegiatan di tingkat kecamatan',
			AK : '-',
			jumlah : 50,
			jumlah_satuan : 'Laporan',
			kualitas : 3,
			kualitas_satuan : 'Laporan',
			waktu : 1,
			kode_satuan_waktu : 'Bln',
			biaya : 'Rp. 1.800.000'
		 },{
			id : 3001,
			kegiatan_tugas_jabatan : 'Membuat sebuah aplikasi untuk pengembangan sistem informasi',
			AK : '-',
			jumlah : 50,
			jumlah_satuan : 'Laporan',
			kualitas : 3,
			kualitas_satuan : 'Laporan',
			waktu : 1,
			kode_satuan_waktu : 'Bln',
			biaya : 'Rp. 1.800.000'
		 }],
		 modalOpen : false,
		 titleModal : '',
		 targetSelected : '',
		 targetSelectedName : '',
		 dataCapaian : [],
		 action : '',
		 dataEdit : {}
	  };
	};
	
	selectTarget(d) {
		this.getDataCapaian()
		this.setState({targetSelected : d.id, targetSelectedName : d.kegiatan_tugas_jabatan})
	}

	renderRow() {
		return (
			<tbody>
				{this.state.data.map((d, key) => {
					return (
						<tr key={key}>
							<td onClick={() => this.selectTarget(d)} style={{cursor : 'pointer'}}>
								<a href="javascript:void(0)">
									{d.kegiatan_tugas_jabatan}
								</a>
							</td>
						</tr>
					)
				})}
			</tbody>
		)
	}

	getDataCapaian() {
		let dataCapaian = [{
			id : 3000,
			jumlah : 20,
			jumlah_satuan : 'Laporan',
			kualitas : 10,
			kualitas_satuan : 'Laporan',
			bulan : 'Mei',
			status : 'aktif'
		 },{
			id : 3001,
			jumlah : 0,
			jumlah_satuan : 'Laporan',
			kualitas : 0,
			kualitas_satuan : 'Laporan',
			bulan : 'Juni',
			status : 'pending'
		}]

		this.setState({dataCapaian})
	}

	editForm(data) {
		this.setState({
			action : 'edit',
			modalOpen : true,
			dataEdit : data,
			titleModal : 'Edit Capaian'
		})
	}

	submitAjukan(data) {
		
	}

	renderTabelCapaian() {
		return (
			<div className="table-responsive animated fadeIn">
				<Table className="table-striped table-bordered">
					<thead>
						<tr>
							<th className="th-small" style={{textAlign : 'center'}}>#</th>
							<th className="th-small" style={{textAlign : 'center'}}>BULAN</th>
							<th colSpan="2" className="th-small" style={{textAlign : 'center'}}>KUANTITAS / OUTPUT</th>
							<th colSpan="2" className="th-small" style={{textAlign : 'center'}}>KUALITAS / MUTU</th>
							<th className="th-small" style={{textAlign : 'center'}}>STATUS</th>
							<th className="th-small"></th>
						</tr>
					</thead>
					{
						this.state.dataCapaian.length <= 0 ? (
							<tbody>
								<tr>
									<td colSpan="6">
										<center>Belum Ada Data</center>
									</td>
								</tr>
							</tbody>
						) : (
							<tbody>
								{
									this.state.dataCapaian.map((d, k) => {
										let color = d.status == 'pending' ? 'warning' : 'success'
										return (
											<tr key={k}>
												<td width="50px">{k + 1}</td>
												<td width="100px">{d.bulan}</td>
												<td width="50px">{d.jumlah}</td>
												<td width="100px">{d.jumlah_satuan}</td>
												<td width="50px">{d.kualitas}</td>
												<td width="100px">{d.kualitas_satuan}</td>
												<td width="100px">
													<span className={"label label-" + color}>{d.status}</span>
												</td>
												<td width="70px">
													{
														d.status == 'pending' && (
															<InputGroupButton>
																<Button className="btn btn-xs btn-primary" onClick={() => this.editForm(d) } title="Edit Capaian">
																	<i className="fa fa-pencil"/>
																</Button>
																<Button className="btn btn-xs btn-success" onClick={() => this.submitAjukan(d) } title="Ajukan Kegiatan">
																	<i className="fa fa-rocket"/>
																</Button>
															</InputGroupButton>
													)
													}
												</td>
											</tr>
										)
									})
								}
							</tbody>
						)
					}
				</Table>
			</div>
		)
	}

	renderPanelButton() {
		return (
			<div className="panel-toolbar">
				<Button className="btn btn-primary" onClick={() => this.setState({ modalOpen : true, titleModal : 'Tambah Capaian - ' + this.state.targetSelectedName})}>
					Tambah Capaian Baru
				</Button>
			</div>
		)
	}

	selesaiTambah(data) {
		if (data.status == 200) {
			let message = data.message || 'Berhasil Menambah Capaian'
			swal(message)

			let dataAwal = this.state.dataCapaian
			if (data.type == 'edit') {
				let edited = []
				dataAwal.map((d, k) => {
					console.log(d, data.data)
					if (d.id == data.data.id) {
						d = data.data
					}
					edited.push(d)
				})
				this.setState({
					dataCapaian : edited
				})
			} else {
				dataAwal.push({
					id : this.state.dataCapaian.length + 1,
					jumlah : 0,
					kualitas : 0,
					bulan : data.data.bulan,
					status : 'pending'
				})

				this.setState({
					dataCapaian : dataAwal
				})
			}
	
			this.setState({
				modalOpen : false,
				titleModal : ''
			})
		} else {

		}
	}

	renderModal() {
		let c = <TambahCapaian
			nama_kegiatan={this.state.targetSelectedName}
			onFinish={(data) => this.selesaiTambah(data)}
			action={this.state.action}
			dataEdit={this.state.dataEdit}
			onClose={() => this.setState({ modalOpen : false, titleModal : '', action : ''})}/>

			return (
			<Modal
				isOpen={this.state.modalOpen}
				modalTitle={this.state.titleModal}
				enableTitle={true}
				onClose={() => this.setState({ modalOpen : false, titleModal : '', action : ''})}
				modalBody={() => c}/>
		)
	}

	renderPanelSKP() {
		return (
			<Col xs="12" sm="12" md="8" lg="8">
				<Card>
					<CardHeader className="bg-primary">
						<strong>{this.state.targetSelectedName || "Capaian SKP"}</strong>
						<br/>
						<small>List Capaian SKP</small>
					</CardHeader>
					<CardBlock className="card-body" style={{padding : 0}}>
						{
							this.state.targetSelected ? (
								<div>
									<Table className="table-striped" style={{marginBottom : 0}}>
										<thead>
											<tr>
												<th rowSpan="2" style={{verticalAlign : 'middle', textAlign : 'center'}}>
													LIST CAPAIAN SKP
													<br/>
													<small>{this.state.targetSelectedName}</small>
												</th>
											</tr>
										</thead>
									</Table>

									{this.renderPanelButton()}
									{this.renderTabelCapaian()}
								</div>
							) : (
								<div style={{margin: 20}}>
									<center>
										<h6>PILIH TARGET SKP TERLEBIH DAHULU</h6>
									</center>

								</div>
							)
						}
					</CardBlock>
				</Card>
			</Col>
		)
	}

	render() {
		return (
			<div className="animated fadeIn">
				{this.renderModal()}
				<Info message={data.info.capaian.info}/>
				<Row>
					<Col xs="12" sm="12" md="4" lg="4">
						<Card>
							<CardHeader className="bg-primary">
								<strong>Target SKP</strong>
								<br/>
								<small>List Target SKP</small>
							</CardHeader>
							<CardBlock className="card-body" style={{padding : 0}}>
								<Table className="table-striped">
									<thead>
										<tr>
											<th style={{verticalAlign : 'middle', textAlign : 'center', fontSize : 11}}>PILIH TARGET SKP</th>
										</tr>
									</thead>

									{this.renderRow()}
								</Table>
							</CardBlock>
						</Card>
					</Col>

					{this.renderPanelSKP()}
				</Row>
			</div>
		)
	}
};
