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

export default class ListSKP extends Component {
	constructor(props) {
	  super(props)
	
	  this.state = {
		 data : [{
			id : 1,
			tahun : 2018,
			nip_atasan : '19980604200150908001',
			nama_atasan : 'Ruri Darmawan',
			created_at : '2018-09-04 09:09:20',
			status : 'pending'
		},{
			id : 2,
			tahun : 2017,
			nip_atasan : '19980604200150908001',
			nama_atasan : 'Ruri Darmawan',
			created_at : '2018-09-04 09:09:20',
			status : 'aktif'
		}],
		modalOpen : false
	  };
	};
	
	renderBody() {
		return (
			<tbody>
				{
					this.state.data.map((d, key) => {
						let color = d.status == 'pending' ? 'warning' : 'success'
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
									{
										d.status == 'pending' ? (
											<div>
												{this.renderActionBtn()}
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

	renderActionBtn() {
		return (
			<div>
				<Button className="btn btn-xs btn-success" title="Ajukan">
					<i className="fa fa-rocket"/>
				</Button>
			</div>
		)
	}

	renderModal() {
		return (
			<Modal
				isOpen={this.state.modalOpen}
				modalTitle="Informasi Pembuatan SKP Baru"
				onClose={() => this.setState({ modalOpen : false})}
				modalBody={() => <div>{this.renderDetail()}</div>}/>
		)
	}

	renderDetail() {
		return (
			<Table className="table-striped">
				<tbody>
					<tr>
						<td style={{width : '200px'}}>NIP</td>
						<td>:</td>
						<td>1998060420150909001</td>
					</tr>
					<tr>
						<td style={{width : '200px'}}>Nama Pegawai</td>
						<td>:</td>
						<td>Shodiqul Muzaki</td>
					</tr>
					<tr>
						<td style={{width : '200px'}}>NIP Atasan</td>
						<td>:</td>
						<td>1998060420150909001</td>
					</tr>
					<tr>
						<td style={{width : '200px'}}>Nama Atasan</td>
						<td>:</td>
						<td>Fawaiq Nur Muhammad</td>
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
							<Button className="btn btn-primary">BUAT SKP SEKARANG</Button>
							<Button className="btn btn-default" onClick={() => this.setState({ modalOpen : false })}>BATALKAN</Button>
						</td>
					</tr>
				</tbody>
			</Table>
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
									<Table className="table-striped">
										<thead>
											<tr>
												<th>Tahun</th>
												<th>NIP Atasan</th>
												<th>Nama Atasan</th>
												<th>Tanggal Pembuatan</th>
												<th>Status</th>
												<th>Aksi</th>
											</tr>
										</thead>

										{this.renderBody()}
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
