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

export default class ReviewSKP extends Component {
	constructor(props) {
		super(props)

		this.state = {
			list_pegawai : [],
			list_review : [],
		};

		this.getBawahan = this.getBawahan.bind(this);
		this.getReview = this.getReview.bind(this);
		this.approveSKP = this.approveSKP.bind(this);
	};

	componentDidMount () {
		this.getBawahan();
	}

	approveSKP (row) {
		swal({
			title: "apakah anda yakin ingin menyetujui skp ini ?",
			icon: "info",
			buttons: true,
			dangerMode: true,
		  })
		  .then((willDelete) => {
			if (willDelete) {
				let URL = data.api+"/skp/approve";
				fetch(URL, {
					method : 'POST',
					headers : {
						'Accept' : 'application/json',
						'Content-Type' : 'application/json'
					},
					body : JSON.stringify({
						id_skp : row.id_skp,
					})
				}).then((text) => text.json()).then((result) => {
					if (result.status == 200) {
						swal("Selamat SKP Sudah di Setujui !", {
							icon: "success",
						});
						this.getReview(row);
					}
				})
			}
		});
	}

	getReview (row) {
		this.setState({
			list_review : [],
		});
		let URL = data.api+"/skp/review/"+row.nip;
		fetch(URL).then((response) => response.json())
			.then((responseData) => {
				let arr = [];
				_.each(responseData.data, (item, i) => {
					arr.push({
						id_skp : item.id_skp,
						tahun : item.tahun,
						nip : item.nip_pegawai,
						nama : item.nama_pegawai,
						tanggal : item.created_at
					});
				});
				this.setState({
					list_review : arr
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
							jabatan : item.nama_jabatan
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
							<th>Tahun</th>
							<th>NIP Pegawai</th>
							<th>Nama Pegawai</th>
							<th>Tanggal Pembuatan</th>
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
								<td>{d.tahun}</td>
								<td>{d.nip}</td>
								<td>{d.nama}</td>
								<td>{d.tanggal}</td>
								<td>
									<div>
										<div>
											<Button className="btn btn-xs btn-success" title="Ajukan" onClick={() => this.approveSKP(d)}>
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
							<strong>SKP Menunggu Persetujuan</strong>
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
