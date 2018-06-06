import React, { Component } from 'react';
import {
	Row,
	Col,
	Button,
	Alert,
	Form,
	Label,
	FormGroup,
	Input,
	Card,
	CardHeader,
	CardFooter,
	Table,
	CardBlock	
} from "reactstrap";

import 'rc-calendar/assets/index.css';
import FullCalendar from 'rc-calendar/lib/FullCalendar'
import 'rc-select/assets/index.css';
import Select from 'rc-select';
import moment from 'moment'
import Modal from '../../components/Modal'
import AddKegiatan from './addKegiatan'

export default class ListKegiatan extends Component {
	constructor(props) {
		super(props)

		this.state = {
			events : ['2018-06-12','2018-06-13','2018-06-14','2018-06-15'],
			listKegiatan : [{
				kegiatan_tugas_jabatan : 'Membuat Aplikasi Sistem Informasi',
				aktifitas : 'Membuat Database',
				status : 'pending'
			},{
				kegiatan_tugas_jabatan : 'Membuat Aplikasi Sistem Informasi',
				aktifitas : 'Membuat DFD',
				status : 'aktif'
			}],
			modalOpen : false
		};
	};
	
	onSelectDate(date) {
		console.log(date)
	}

	renderRCalendar() {
		return (
			<FullCalendar
				dateCellContentRender={(current, value) => {
					// console.log(current)
					const isActive = this.state.events.indexOf(moment(current).format('YYYY-MM-DD')) < 0 ? 'empty' : ''

					return (
						<div>
							<span>{moment(current).format('D')}</span>
							<span className={"bullet " + isActive}>&nbsp;&nbsp;</span>
						</div>
					)
				}}
				fullscreen={false}
				onSelect={this.onSelectDate.bind(this)}
				Select={Select}/>
		)
	}

	renderActionBtn(data) {
		return (
			<div>
				<Button className="btn btn-xs btn-success" title="Ajukan" onClick={(data) => this.confirmAktif(data)}>
					<i className="fa fa-rocket"/>
				</Button>
			</div>
		)
	}

	renderTableKegiatan() {
		return (
			<div className="table-responsive">
				<Table className="table-bordered">
					<thead>
						<tr>
							<th>NO</th>
							<th>KEGIATAN TUGAS JABATAN</th>
							<th>NAMA AKTIFITAS</th>
							<th>WAKTU</th>
							<th>STATUS</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{this.state.listKegiatan.map((kegiatan, key) => {
							let color = kegiatan.status == 'pending' ? 'warning' : 'success'
							return (
								<tr key={key}>
									<td>{key + 1}</td>
									<td>{kegiatan.kegiatan_tugas_jabatan}</td>
									<td>{kegiatan.aktifitas}</td>
									<td>20 Menit</td>
									<td>
										<span className={'label label-' + color}>{kegiatan.status}</span>									
									</td>
									<td>
										{
											kegiatan.status == 'pending' ? (
												<div>
													{this.renderActionBtn(kegiatan)}
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
						})}
					</tbody>
					<tfoot>
						<tr>
							<td colSpan="3" style={{textAlign : 'right'}}>Total Waktu</td>
							<td colSpan="3">40 Menit</td>
						</tr>
					</tfoot>
				</Table>
			</div>
		)
	}

	selesaiTambah(data) {
		this.setState({
			modalOpen : false
		})
		swal('Selesai', 'Kegiatan Berhasil Di Tambahkan', 'success')
	}

	confirmAktif(data) {
		swal({
			title: "Anda Yakin Ingin Mengajukan Kegiatan Ini ?",
			text: "Jika anda mengajukan aktifitas ini, maka aktifitas anda tidak bisa di edit. pastikan data yang anda inputkan sudah benar",
			icon: "info",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {
			if (willDelete) {
				swal("Selamat Kegiatan Anda Sudah Aktif!", {
					icon: "success",
				});
			}
		});
	}

	renderModal() {
		return (
			<Modal
				style={{width : '500px'}}
				isOpen={this.state.modalOpen}
				modalTitle="Tambah Aktifitas Baru"
				onClose={() => this.setState({ modalOpen : false})}
				modalBody={() => {
					return <AddKegiatan onFinish={this.selesaiTambah.bind(this)} onClose={() => this.setState({ modalOpen : false })}/>
				}}/>
		)
	}
	
  render() {
	return (
		<Row>
			{this.renderModal()}
			<Col md="4" xs="12" lg="4" className="animated fadeIn">
				<Card>
					<CardHeader className="bg-primary">
						<strong>Tanggal Kegiatan</strong>
					</CardHeader>
					<CardBlock className="card-body" style={{padding : 0}}>
						{this.renderRCalendar()}
					</CardBlock>
				</Card>
			</Col>
			<Col md="8" xs="12" lg="8" className="animated fadeIn">
				<Card>
					<CardHeader className="bg-primary">
						<strong>List Kegiatan - Senin, 28 Mei 2018</strong>
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
					<CardBlock className="card-body" style={{padding : 0}}>
						{this.renderTableKegiatan()}
					</CardBlock>
				</Card>
			</Col>			
		</Row>
	)
  }
};
