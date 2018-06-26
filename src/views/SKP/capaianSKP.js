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
import moment from 'moment'

export default class capaianSKP extends Component {
	constructor(props) {
	  super(props)
	
	  this.state = {
		data : [],
		modalOpen : false,
		titleModal : '',
		targetSelected : '',
		targetSelectedName : '',
		dataCapaian : [],
		action : '',
		dataEdit : {},
		arrayBulan : ['', 'January', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'July', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
	  };
	};
	
	selectTarget(d) {
		this.setState({targetSelected : d.id, targetSelectedName : d.kegiatan_tugas_jabatan})
		this.getDataCapaian(d)
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

	getListTarget() {
		fetch(data.api + '/capaian/list').then((text) => text.json()).then((result) => {
			if (result.status == 200) {
				const target = result.data
				this.setState({data : target})
			}
		})
	}

	getDataCapaian(d) {
		let dataCapaian = []

		fetch(data.api + '/capaian/filter/' + d.id).then((text) => text.json()).then((results) => {
			if (results.status == 200) {
				results.data.forEach((d, key) => {
					let status = d.status == 0 ? 'pending' : d.status == 1 ? 'aktif' : 'Tidak Aktif'

					d.approve_txt = ''
					if (d.approve == 'no') {
						if (!d.tgl_approve) {
							d.approve_txt = 'Belum Di Setujui'
							d.approve_color = 'warning'
						} else {
							d.approve_txt = 'Tidak Di Setujui'
							d.approve_color = 'danger'
						}
					} else {
						d.approve_txt = 'Di Setujui'
						d.approve_color = 'success'
					}

					dataCapaian.push({
						id : d.id,
						jumlah : d.kuantitas,
						jumlah_satuan : d.satuan_jumlah,
						kualitas : d.kualitas,
						kualitas_satuan : d.satuan_kualitas,
						bulan : this.state.arrayBulan[d.bulan],
						status : status,
						approve_txt : d.approve_txt,
						approve_color : d.approve_color
					})
				})
				this.setState({dataCapaian})				
			} else {
				swal(results.message)
			}
		})
	}

	editForm(data) {
		this.setState({
			action : 'edit',
			modalOpen : true,
			dataEdit : data,
			titleModal : 'Edit Capaian'
		})
	}

	submitAjukan(item) {
		swal({
			title: "Anda Yakin Ingin Mengajukan Capaian Sasaran Kinerja Pegawai Ini ?",
			text: "Jika anda mengajukan Capaian ini, maka Capaian anda tidak bisa di edit. pastikan data yang anda inputkan sudah benar",
			icon: "info",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {
			if (willDelete) {
				let dataToSend = {
					id : item.id
				}

				fetch(data.api + '/capaian/ajukan', {
					method : 'POST',
					headers : {
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					},
					body : JSON.stringify(dataToSend)							
				}).then((text) => text.json()).then((result) => {
					if (result.status == 200) {
						swal("Selamat Capaian Anda Sudah Aktif!", {
							icon: "success",
						});
						this.getDataCapaian({
							id : this.state.targetSelected
						})
					} else {
						swal(result.message, {
							icon: "warning",
						});						
					}
				})
			}
		});		
	}

	submitDelete(item) {
		swal({
			title: "Anda Ingin Menghapus Data Ini ?",
			text: "Jika anda menghapus Capaian ini, maka Capaian anda tidak bisa di kembalikan lagi",
			icon: "info",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {
			if (willDelete) {
				let dataToSend = {
					id : item.id
				}

				fetch(data.api + '/capaian/delete', {
					method : 'POST',
					headers : {
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					},
					body : JSON.stringify(dataToSend)							
				}).then((text) => text.json()).then((result) => {
					if (result.status == 200) {
						swal("Capaian Sudah Di Hapus!", {
							icon: "success",
						});
						this.getDataCapaian({
							id : this.state.targetSelected
						})
					} else {
						swal(result.message, {
							icon: "warning",
						});						
					}
				})
			}
		});		
	}

	componentDidMount() {
		this.getListTarget()
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
							<th className="th-small" style={{textAlign : 'center'}}>PERSETUJUAN</th>
							<th className="th-small"></th>
						</tr>
					</thead>
					{
						this.state.dataCapaian.length <= 0 ? (
							<tbody>
								<tr>
									<td colSpan="8">
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
												<td width="100px">
													<span className={"label label-" + d.approve_color}>{d.approve_txt}</span>
												</td>
												<td width="70px">
													{
														d.status == 'pending' && (
															<InputGroupButton>
																<Button className="btn btn-xs btn-primary" onClick={() => this.editForm(d) } title="Edit Capaian">
																	<i className="fa fa-pencil"/>
																</Button>
																<Button className="btn btn-xs btn-success" onClick={() => this.submitAjukan(d) } title="Ajukan Capaian">
																	<i className="fa fa-rocket"/>
																</Button>
																<Button className="btn btn-xs btn-danger" onClick={() => this.submitDelete(d) } title="Hapus Capaian">
																	<i className="fa fa-trash"/>
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
			id_target={this.state.targetSelected}
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
