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
import NewTarget from './newTargetSKP'
import swal from 'sweetalert';

const numeral = require('numeral');

export default class componentName extends Component {
	constructor(props) {
	  super(props)
	
	  this.state = {
		 data : [{
			kegiatan_tugas_jabatan : 'Merumuskan program kerja kegiatan di tingkat kecamatan',
			AK : '-',
			jumlah : 50,
			kualitas : 3,
			waktu : 1,
			kode_satuan_waktu : 'Bln',
			biaya : 'Rp. 1.800.000'
		 },{
			kegiatan_tugas_jabatan : 'Merumuskan program kerja kegiatan di tingkat kecamatan',
			AK : '-',
			jumlah : 50,
			kualitas : 3,
			waktu : 1,
			kode_satuan_waktu : 'Bln',
			biaya : 'Rp. 1.800.000'
		 }],
		 dataPegawai : {},
		 modalOpen : false
	  };
	};
	
	getInfoSKP() {
		fetch(data.api + '/target/list').then((text) => text.json()).then((result) => {
			console.log(result)
			if (result.status == 200) {
				const {skp, target} = result.data
				let dataPegawai = {
					atasan : {
						nip : skp.nip_atasan,
						nama : skp.nama_atasan,
						pangkat : skp.golongan_atasan,
						jabatan : skp.jabatan_atasan,
						unit_kerja : skp.lokasi_kantor_atasan
					},
					pegawai : {
						nip : skp.nip_pegawai,
						nama : skp.nama_pegawai,
						pangkat : skp.golongan_pegawai,
						jabatan : skp.jabatan_pegawai,
						unit_kerja : skp.lokasi_kantor_pegawai						
					}
				}

				target.map((t, k) => {
					let kode_satuan_waktu = ['Hari', 'Minggu', 'Bulan']

					t.biaya = 'Rp ' + numeral(t.biaya).format('0,0')
					t.kode_satuan_waktu = kode_satuan_waktu[t.kode_satuan_waktu - 1]
				})

				this.setState({
					dataPegawai : dataPegawai,
					data : target
				})
			}
		})
	}

	componentDidMount() {
		this.getInfoSKP()
	}

	renderRow() {
		return (
			<tbody>
				{this.state.data.map((d, key) => {
					return (
						<tr key={key}>
							<td>{key + 1}</td>
							<td>{d.kegiatan_tugas_jabatan}</td>
							<td>{d.AK}</td>
							<td>{d.jumlah}</td>
							<td>{d.kualitas}</td>
							<td>{d.waktu}</td>
							<td>{d.kode_satuan_waktu}</td>
							<td>{d.biaya}</td>
						</tr>
					)
				})}
			</tbody>
		)
	}

	renderHeadSKP() {
		const {dataPegawai} = this.state
		const {atasan, pegawai} = dataPegawai
		if (dataPegawai && atasan && pegawai) {
			return (
				<div className="table-responsive">
					<Table className="table-bordered">
						<thead>
							<tr>
								<th colSpan="2">I. PEJABAT PENILAI</th>
								<th style={{textAlign : 'center'}}>NO</th>
								<th colSpan="2">II. PEGAWAI NEGERI SIPIL YANG DINILAI</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Nama</td>
								<td>{atasan.nama}</td>
								<td style={{textAlign : 'center'}}>1</td>
								<td>Nama</td>
								<td>{pegawai.nama}</td>
							</tr>
							<tr>
								<td>NIP</td>
								<td>{atasan.nip}</td>
								<td style={{textAlign : 'center'}}>2</td>
								<td>NIP</td>
								<td>{pegawai.nip}</td>
							</tr>
							<tr>
								<td>Pangkat/Gol. Ruang</td>
								<td>{atasan.pangkat}</td>
								<td style={{textAlign : 'center'}}>3</td>
								<td>Pangkat/Gol. Ruang</td>
								<td>{pegawai.pangkat}</td>
							</tr>
							<tr>
								<td>Jabatan</td>
								<td>{atasan.jabatan}</td>
								<td style={{textAlign : 'center'}}>4</td>
								<td>Jabatan</td>
								<td>{pegawai.jabatan}</td>
							</tr>
							<tr>
								<td>Unit Kerja</td>
								<td>{atasan.unit_kerja}</td>
								<td style={{textAlign : 'center'}}>5</td>
								<td>Unit Kerja</td>
								<td>{pegawai.unit_kerja}</td>
							</tr>
						</tbody>
					</Table>
				</div>
			)
		}
	}

	onSelesaiTambah(item) {
		swal('Selesai', 'Target SKP Berhasil Di Tambahkan', 'success')
		this.getInfoSKP()
	}

  render() {
	return (
		<div className="animated fadeIn">
			<Modal
				isOpen={this.state.modalOpen}
				modalTitle="Tambah Target SKP Baru"
				enableTitle={true}
				onClose={() => this.setState({ modalOpen : false})}
				modalBody={() => {
					return (
						<NewTarget
							onFinish={(data) => this.onSelesaiTambah(data)}						
							onClose={() => this.setState({ modalOpen : false })}/>
					)
				}}/>
			<Row>
				<Col xs="12">
					<Card>
						<CardHeader className="bg-primary">
							<strong>Target SKP</strong>
							<br/>
							<small>List Target SKP</small>
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
						<CardBlock className="card-body">
							{this.renderHeadSKP()}

							<div className="table-responsive">
								<Table className="table-striped table-bordered">
									<thead>
										<tr>
											<th rowSpan="2" style={{verticalAlign : 'middle', textAlign : 'center'}}>NO</th>
											<th rowSpan="2" style={{verticalAlign : 'middle', textAlign : 'center'}}>KEGIATAN TUGAS JABATAN</th>
											<th rowSpan="2" style={{verticalAlign : 'middle', textAlign : 'center'}}>AK</th>
											<th colSpan="5" style={{verticalAlign : 'middle', textAlign : 'center'}}>TARGET</th>
										</tr>
										<tr>
											<th style={{verticalAlign : 'middle', textAlign : 'center', fontSize : '11px'}}>KUANT / OUTPUT</th>
											<th style={{verticalAlign : 'middle', textAlign : 'center', fontSize : '11px'}}>KUAL / MUTU</th>
											<th style={{verticalAlign : 'middle', textAlign : 'center', fontSize : '11px'}} colSpan="2">WAKTU</th>
											<th style={{verticalAlign : 'middle', textAlign : 'center', fontSize : '11px'}}>BIAYA</th>
										</tr>
									</thead>

									{this.renderRow()}
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
