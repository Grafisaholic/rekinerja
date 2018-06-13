import React, { Component } from 'react';
import {
	Row,
	Col,
	Button,
	Card,
	CardHeader,
	CardFooter,
	CardBlock,
	Table,
} from "reactstrap";
import Modal from '../../components/Modal'
import swal from 'sweetalert';
import moment from 'moment'
moment.locale('id')

export default class ListSKP extends Component {
	constructor(props) {
	  super(props)
	
	  this.state = {
		data : [],
		infoSKP : {},
		modalOpen : false
	  };
	};

	getListSKP() {
		fetch(data.api + '/skp/list').then((text) => text.json()).then((result) => {
			if (result.status == 200) {
				result.data.map((r, key) => {
					let status = ['Pending', 'Aktif']

					r.created_at = moment(r.created_at).format('DD MMMM YYYY HH:mm:ss')
					r.status = status[r.status]
					r.approve_text = r.approve == 'yes' ? 'Di Setujui' : 'Tidak Di Setujui'
				})
				this.setState({data : result.data})
			}
		})
	}

	getInfoSKP() {
		fetch(data.api + '/skp/create').then((text) => text.json()).then((result) => {
			if (result.status == 200) {
				this.setState({infoSKP : result.data})
			}
		})
	}

	saveSKP() {
		let dataToSend = {
			nama_atasan : this.state.infoSKP.nama_atasan,
			nip_atasan : this.state.infoSKP.nip_atasan,
			nama_pegawai : this.state.infoSKP.nama_pegawai,
			nip_pegawai : this.state.infoSKP.nip_pegawai,
			tahun_skp : this.state.infoSKP.tahun_skp
		}
		console.log(dataToSend)
		fetch(data.api + '/skp/save', {
			method : 'POST',
			headers : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			body : JSON.stringify(dataToSend)
		}).then((text) => text.json()).then((result) => {
			if (result.status == 200) {
				this.setState({
					modalOpen : false
				}, () => {
					swal('Selesai', 'SKP Berhasil Di Buat', 'success')
					this.getListSKP()
				})
			}
		})
	}

	confirmAktif(item) {
		swal({
			title: "Anda Yakin Ingin Mengajukan Sasaran Kinerja Pegawai Ini ?",
			text: "Jika anda mengajukan SKP ini, maka SKP anda tidak bisa di edit. pastikan data yang anda inputkan sudah benar",
			icon: "info",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {
			if (willDelete) {
				let dataToSend = {
					id_skp : item.id_skp
				}

				fetch(data.api + '/skp/ajukan', {
					method : 'POST',
					headers : {
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					},
					body : JSON.stringify(dataToSend)							
				}).then((text) => text.json()).then((result) => {
					if (result.status == 200) {
						swal("Selamat Kegiatan Anda Sudah Aktif!", {
							icon: "success",
						});
						this.getListSKP()
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
		this.getListSKP()
		this.getInfoSKP()
	}
	
	renderBody() {
		return (
			<tbody>
				{
					this.state.data.map((d, key) => {
						let color = d.status == 'Pending' ? 'warning' : 'success'
						let colorApprove = d.approve == 'no' ? 'danger' : 'success'

						return (
							<tr key={key}>
								<td>{d.tahun}</td>
								<td>{d.nip_atasan}</td>
								<td>{d.nama_atasan}</td>
								<td>{d.created_at}</td>
								<td>
									<span className={'label label-' + color}>{d.status}</span>
								</td>
								<td>
									<span className={'label label-' + colorApprove}>{d.approve_text}</span>
								</td>
								<td>{d.approve == 'yes' && moment(d.tgl_approve, 'YYYY-MM-DD').format('DD MMMM YYYY')}</td>
								<td>
									{
										d.status == 'Pending' ? (
											<div>
												{this.renderActionBtn(d)}
											</div>
										) : (
											<div>
												<span>-</span>
											</div>
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

	renderButton() {
		return (
			<div className="panel-toolbar">
				{this.renderModal()}
				<Button className="btn btn-primary" onClick={() => this.setState({ modalOpen : true })}>
					TAMBAH SKP BARU
				</Button>
			</div>
		)
	}

	renderActionBtn(data) {
		return (
			<div>
				<Button className="btn btn-xs btn-success" title="Ajukan" onClick={() => this.confirmAktif(data)}>
					<i className="fa fa-rocket"/>
				</Button>
			</div>
		)
	}

	renderModal() {
		return (
			<Modal
				isOpen={this.state.modalOpen}
				enableTitle={true}
				modalTitle="Informasi Pembuatan SKP Baru"
				onClose={() => this.setState({ modalOpen : false})}
				modalBody={() => <div>{this.renderDetail()}</div>}/>
		)
	}

	renderDetail() {
		return (
			<div className="table-responsive">
				<Table className="table-striped">
					<tbody>
						<tr>
							<td style={{width : '200px'}}>NIP Atasan</td>
							<td>:</td>
							<td>{this.state.infoSKP.nip_atasan}</td>
						</tr>
						<tr>
							<td style={{width : '200px'}}>Nama Atasan</td>
							<td>:</td>
							<td>{this.state.infoSKP.nama_atasan}</td>
						</tr>
						<tr>
							<td style={{width : '200px'}}>NIP Pegawai</td>
							<td>:</td>
							<td>{this.state.infoSKP.nip_pegawai}</td>
						</tr>
						<tr>
							<td style={{width : '200px'}}>Nama Pegawai</td>
							<td>:</td>
							<td>{this.state.infoSKP.nama_pegawai}</td>
						</tr>
						<tr>
							<td style={{width : '200px'}}>Tahun SKP</td>
							<td>:</td>
							<td>2018</td>
						</tr>

						<tr>
							<td></td>
							<td></td>
							<td>
								<Button className="btn btn-primary" onClick={() => this.saveSKP()}>BUAT SKP SEKARANG</Button>
								<Button className="btn btn-default" onClick={() => this.setState({ modalOpen : false })}>BATALKAN</Button>
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
		)
	}

	render() {
		return (
			<div className="animated fadeIn">
				<Row>
					<Col xs="12" sm="12" md="12" lg="12">
						<Card>
							<CardHeader className="bg-primary">
								<strong>Sasaran Kinerja Pegawai</strong>
								<br/>
								<small>List Sasaran Kinerja Pegawai</small>
							</CardHeader>
							<CardBlock className="card-body" style={{padding : 0}}>
								{this.renderButton()}

								<div className="table-reseponsive">
									<div className="table-responsive">
										<Table className="table-striped">
											<thead>
												<tr>
													<th>Tahun</th>
													<th>NIP Atasan</th>
													<th>Nama Atasan</th>
													<th>Tanggal Pembuatan</th>
													<th>Status</th>
													<th>Persetujuan</th>
													<th>Tanggal Di Setujui</th>
													<th>Aksi</th>
												</tr>
											</thead>

											{this.renderBody()}
										</Table>
									</div>
								</div>
							</CardBlock>
						</Card>					
					</Col>
				</Row>
			</div>
		)
	}
};
