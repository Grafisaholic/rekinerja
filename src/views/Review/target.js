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
import _ from 'underscore';

export default class ReviewTargetSKP extends Component {
	constructor(props) {
		super(props)

		this.state = {
			list_pegawai : [],
			list_review : [],
			pegawai : {},
		};

		this.getBawahan = this.getBawahan.bind(this);
		this.getReview = this.getReview.bind(this);
		this.approveTarget = this.approveTarget.bind(this);
	};

	componentDidMount () {
		this.getBawahan();
	}

	approveTarget (row) {
		const pegawai = this.state.pegawai;
		swal({
			title: "apakah anda yakin ingin menyetujui target ini ?",
			icon: "info",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {
		  	if (willDelete) {
		  		let URL = data.api+"/target/approve";
				fetch(URL, {
					method : 'POST',
					headers : {
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					},
					body : JSON.stringify({
						id_skp : row.id_skp,
						id : row.id,
					})
				}).then((text) => text.json()).then((result) => {
					if (result.status == 200) {
						swal("Selamat Target Sudah di Setujui !", {
							icon: "success",
						});
						this.getReview(pegawai);
					}
				});
		  	}
		  })
	}

	getReview (row) {
		this.setState({
			list_review : [],
		});
		let URL = data.api+"/target/review/"+row.nip+"/"+row.kode_lokasi;
		fetch(URL).then((response) => response.json())
			.then((responseData) => {
				let arr = [];
				_.each(responseData.data, (item, i) => {
					arr.push({
						id : item.id,
						id_skp : item.id_skp,
						kegiatan_tugas_jabatan : item.kegiatan_tugas_jabatan,
						ak : item.ak,
						jumlah : item.jumlah,
						kualitas : item.kualitas,
						waktu : item.waktu +" "+item.kode_satuan_waktu,
						biaya : item.biaya,
					});
				});
				this.setState({
					list_review : arr,
					pegawai : row,
				})
			});
	}

	getBawahan () {
		let URL = data.api+"/info/bawahan";
		fetch(URL).then((response) => response.json())
			.then((responseData) => {
				if (responseData.status == 200 ) {
					let arr = [];
					_.each(responseData.data, (item, i) => {
						arr.push({
							nama : item.nama,
							nip : item.nip,
							jabatan : item.nama_jabatan,
							kode_lokasi : item.kode_lokasi
						});
					});
					this.setState({
						list_pegawai : arr
					});
				}
			})
			.catch((err) => {

			});
	}
	
	renderListPegawai() {
		return (
			<div>
				<table className="table table-striped">
					<tbody>
						{this.state.list_pegawai.map((p, k) => {
							return (
								<tr key={k}>
									<td onClick={() => this.getReview(p)} style={{cursor : 'pointer'}}>
										<a href="javascript:void(0)">
											<div>
												<span>{p.nama}</span>
												<br/>
												<small>{p.jabatan}</small>
											</div>
										</a>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		)
	}

	renderListReview() {
		return (
			<div className="fadeIn table-responsive">
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Kegiatan Tugas Jabatan</th>
							<th>AK</th>
							<th>Kuantitas</th>
							<th>Kualitas</th>
							<th>Waktu</th>
							<th>Biaya</th>
							<th></th>
						</tr>
					</thead>

					{this.renderBodyReview()}
				</table>
			</div>
		)
	}

	renderBodyReview () {
		return (
			<tbody>
				{
					this.state.list_review.map((d, key) => {
						return (
							<tr key={key}>
								<td>{d.kegiatan_tugas_jabatan}</td>
								<td>{d.ak}</td>
								<td>{d.jumlah}</td>
								<td>{d.kualitas}</td>
								<td>{d.waktu}</td>
								<td>{d.biaya}</td>
								<td>
									<div>
										<div>
											<Button className="btn btn-xs btn-success" title="Ajukan" onClick={() => this.approveTarget(d)}>
												<i className="fa fa-rocket"/>
											</Button>
										</div>
									</div>
								</td>
							</tr>
						);
					})
				}
			</tbody>
		);
	}

	render() {
		return (
			<Row className="animated fadeIn">
				<Col md="4">
					<Card>
						<CardHeader className="bg-primary">
							<strong>List Pegawai</strong>
						</CardHeader>
						<CardBlock className="card-body" style={{padding : 0}}>
							{this.renderListPegawai()}
						</CardBlock>
					</Card>
				</Col>

				<Col md="8">
					<Card>
						<CardHeader className="bg-primary">
							<strong>Target Menunggu Persetujuan</strong>
						</CardHeader>
						<CardBlock className="card-body" style={{padding : 0}}>
							{this.renderListReview()}
						</CardBlock>
					</Card>
				</Col>
			</Row>
		)
	}
};
